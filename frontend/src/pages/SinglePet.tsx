import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { deletePetImageThunk, deletePetThunk, getPetsThunk, updatePetThunk,	uploadPetImagesThunk} from '../redux/pets';
import * as React from 'react';


const SinglePet: React.FC = () => {

    const params = useParams();
    const id: any = params.id;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const pet: any = useAppSelector((state) => state.pets.byId[id])
    const user = useAppSelector((store) => store.session.user);
    
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hasCred, setHasCred] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [imageErrors, setImageErrors] = useState<string[]>([]);
	

    const [formData, setFormData] = useState({
			name: '',
			species: '',
			breed: '',
			age: '',
			gender: '',
			size: '',
			fee: '',
			status: '',
			description: '',
			shelterId: '',
			expireDate: '',
			lastSeenDate: '',
			lastSeenLocation: '',
			color: '',
			images: [] as File[],
		});

    useEffect(() => {
        if (pet) {
            setFormData({
				name: pet.name || '',
				species: pet.species || '',
				breed: pet.breed || '',
				age: pet.age || '',
				gender: pet.gender || '',
				size: pet.size || '',
				fee: pet.fee || '',
				status: pet.status || '',
				description: pet.description || '',
				shelterId: pet.shelterId || '',
				expireDate: pet.expireDate || '',
				lastSeenDate: pet.lastSeenDate || '',
				lastSeenLocation: pet.lastSeenLocation || '',
				color: pet.color || '',
				images: [],
			});
        }
    }, [pet]);

    

	useEffect(() => {
		const shouldFetch = !pet || Object.keys(pet).length === 0 || isUpdated;

		if (shouldFetch) {
			const getAdopts = async () => {
				setIsLoaded(false); 
				await dispatch(getPetsThunk());
				setIsLoaded(true);
				setIsUpdated(false);
			};
			getAdopts();
		} else {
			setIsLoaded(true);
		}
	}, [dispatch, pet, isUpdated]);

	useEffect(() => {
		if (
			user && 
			user?.role !== 'Public' &&  
			(user.id === pet?.userId ||
				user?.role === 'Admin' ||
				user?.role === 'KPA Staff' ||
				user?.role === 'KPA Volunteer' ||
				user?.shelterId === pet?.shelterId)
		) {
			setHasCred(true);
		} else {
			setHasCred(false);
		}
	}, [user, pet]);

 

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const { images, ...petUpdateData } = formData;

			const updateData = {
				...petUpdateData,
				fee: formData.fee ? Number(formData.fee) : 0,
				shelterId: formData.shelterId ? Number(formData.shelterId) : undefined,
				expireDate: formData.expireDate ? new Date(formData.expireDate) : null,
				lastSeenDate: formData.lastSeenDate
					? new Date(formData.lastSeenDate)
					: null,
			};

			const res = await dispatch(updatePetThunk(pet.id, updateData));

			if (formData.images && formData.images.length > 0) {
				const imageUploadRes = await dispatch(
					uploadPetImagesThunk(pet.id, formData.images),
				);

				if (imageUploadRes && imageUploadRes.errors) {
					setImageErrors(['Failed to upload some images']);
				}
			}

			if (res && !res.errors) {
				setIsEditing(false);
				setIsUpdated(true);
			}
		} catch (error) {
			console.error('Update failed: ', error);
			setImageErrors(['Failed to update pet']);
		}
	};


    const handleCancel = () => {
        if (pet) {
            setFormData({
                name: pet.name || '',
                species: pet.species || '',
                breed: pet.breed || '',
                age: pet.age || '',
                gender: pet.gender || '',
                size: pet.size || '',
                fee: pet.fee || '',
                status: pet.status || '',
                description: pet.description || '',
                shelterId: pet.shelterId || '',
                expireDate: pet.expireDate || '',
                lastSeenDate: pet.lastSeenDate || '',
                lastSeenLocation: pet.lastSeenLocation || '',
                color: pet.color || '',
				images: pet.images || [],
            });
        }
        setIsEditing(false);
    }


	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);

		if (files.length > 10) {
			setImageErrors(['Upload up to 10 images for this pet!']);
			return;
		}

		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
		const maxSize = 5 * 1024 * 1024;
		const errors: string[] = [];

		files.forEach((file, idx) => {
			if (!validTypes.includes(file.type)) {
				errors.push(
					`Image ${idx + 1}: Only JPEG, PNG, and GIF please`,
				);
			}
			if (file.size > maxSize) {
				errors.push(`Image ${idx + 1}: File size must be less than 5MB`);
			}
		});

		if (errors.length > 0) {
			setImageErrors(errors);
			return;
		}

		setFormData((prev) => ({ ...prev, images: files }));
		setImageErrors([]);
	};

	const handleDeleteImage = async (imageId: number) => {
		if (window.confirm('Are you sure you want to delete this image?')) {
			try {
				const res = await dispatch(deletePetImageThunk(imageId));
				if (res && res.success) {
					setIsUpdated(true); 
				}
			} catch (error) {
				console.error('Failed to delete image:', error);
				setImageErrors(['Failed to delete image']);
			}
		}
	};


	const handleDeletePet = async () => {
			if (window.confirm(`Whoa There! Are you sure you want to delete ${pet.name}?`)){
				try {
					await dispatch(deletePetThunk(pet.id));
					navigate('/');
				} catch (error) {
					console.error(`Failed to delete ${pet.name}`, error);
				}
			}
		};
		const eDate = pet.expireDate ? new Date(pet.expireDate).toDateString(): null;

		if (!isLoaded) return <h1>Your pets are on the way!</h1>;
		if (!pet) return <h1>Pet not found!</h1>;
	
    return (
			<div className='page-wrapper'>
				<div className='single-wrapper'>
					<h1>{pet.name} is {pet.status}</h1>
					{pet.expireDate && (
					<h2>{pet.name} is likely to be euthanized on {eDate}</h2>
					)}

					{isEditing && hasCred ? (
						<>
							<form onSubmit={handleUpdate}>
								<label>
									Name
									<input
										type='text'
										value={formData.name}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, name: e.target.value }))
										}
									/>
								</label>
								<label>
									Species
									<input
										type='text'
										value={formData.species}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												species: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Breed
									<input
										type='text'
										value={formData.breed}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												breed: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Age
									<input
										type='text'
										value={formData.age}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, age: e.target.value }))
										}
									/>
								</label>
								<label>
									Gender
									<input
										type='text'
										value={formData.gender}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												gender: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Fee
									<input
										type='text'
										value={formData.fee}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, fee: e.target.value }))
										}
									/>
								</label>
								<label>
									Status
									<input
										type='text'
										value={formData.status}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												status: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Description
									<input
										type='text'
										value={formData.description}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Shelter Id
									<input
										type='text'
										value={formData.shelterId}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												shelterId: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Expire Date
									<input
										type='date'
										value={formData.expireDate}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												expireDate: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Last Seen Date
									<input
										type='date'
										value={formData.lastSeenDate}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												lastSeenDate: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Last Seen Location
									<input
										type='text'
										value={formData.lastSeenLocation}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												lastSeenLocation: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									Color
									<input
										type='text'
										value={formData.color}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												color: e.target.value,
											}))
										}
									/>
								</label>
								<label>
									<input
										type='file'
										multiple
										accept='image/jpeg,image/jpg,image/png,image/gif'
										onChange={handleFileChange}
									/>
								</label>
								{imageErrors.length > 0 && (
									<div style={{ color: 'red' }}>
										<ul>
											{imageErrors.map((err, idx) => (
												<li key={idx}>{err}</li>
											))}
										</ul>
									</div>
								)}

								{pet?.images && pet.images.length > 0 ? (
									<div>
										<h3>
											Due to staffing resources, we cannot guarantee that the
											animal in the photos is the actual animal
										</h3>
										<div className='single-left-column'>
											{pet.images.map((image: any, idx: number) => (
												<div key={image.id || idx}>
													<img src={image.url} alt={`${pet.name} ${idx + 1}`} />
													{image.preview && <p>Preview Image</p>}
													{hasCred && (
														<button onClick={() => handleDeleteImage(image.id)}>
															Delete
														</button>
													)}
												</div>
											))}
										</div>
									</div>
								) : (
									<div>
										<h3>
											Due to staffing resources, we cannot guarantee that the
											animal in the photos is the actual animal
										</h3>
										<p>No images available for {pet.name}</p>
									</div>
								)}
								<button type='submit' disabled={false}>
									Photos: Update {pet.name}
								</button>
								<button type='button' onClick={handleCancel}>
									Cancel
								</button>
							</form>
						</>
					) : (
						<>
							{hasCred && (
								<>
									<p>
										Only logged in users with credentials can see this section.
									</p>
									<button onClick={() => setIsEditing(true)}>
										Edit {pet.name}?
									</button>
									<button onClick={handleDeletePet}>Delete {pet.name}?</button>
								</>
							)}

							{pet?.images && pet.images.length > 0 ? (
								<div>
									<p style={{ fontWeight: 200 }}>
										Disclaimer: Ever since Jodie got hit with a lawn jart in her
										eye last summer at the company barbecue, we cannot guarantee
										that the images are the actual animal.
									</p>
									<div className='single-images-wrapper'>
										{pet.images.map((image: any, idx: number) => (
											<div
												key={image.id || idx}
												style={{ textAlign: 'center' }}>
												<img src={image.url} alt={`${pet.name} ${idx + 1}`} />
												{image.preview}
											</div>
										))}
										<div></div>
									</div>
								</div>
							) : null}

							<p>
								Pet Id: {pet.userId} Shelter Id: {pet?.shelterId} for testing
								purposes only
							</p>
							<div className='info-wrapper'>
								<div className='west-coast-wrapper'></div>
								<h2>
								Meet {pet.name}, a {pet.gender}, {pet.color}, {pet.breed} who
								is {pet.age} old and is a {pet.size} {pet.species}.
								</h2>

								<h2>{pet.description}</h2>
							</div>

							{pet.status === 'available' && (
								<>
									<h2>
										{pet.name} is {pet.status} to adopt for ${pet.fee} at{' '}
										{pet.shelter.name}, located at {pet.shelter.address} in{' '}
										{pet.shelter.city}, {pet.shelter.state}!
									</h2>

									<h2>
										If you're interest in adopting {pet.name}, send an{' '}
										<a href={`mailto:${pet.shelter.email}`}>email</a> or tap{' '}
										<a href={`${pet.shelter.website}`} target='new'>
											here
										</a>{' '}
										to call {pet.shelter.name} today.
									</h2>
								</>
							)}

							{pet.lastSeenDate != null && pet.status === 'missing' && (
								<>
									<h2>
										{pet.name} was last seen at {pet.lastSeenLocation} on{' '}
										{pet.lastSeenDate}
									</h2>
									<h2>
										Contact Kerrville Pets Alive immediately if you see or find{' '}
										{pet.name} at 830.200.0539
									</h2>
								</>
							)}

							{pet?.shelter?.name != null && (
								<>
									<div className='shelter-name-wrapper'>
										<h1>{pet.shelter.name}</h1>
									</div>
									<div className='shelter-grid'>
										<h2>
											Address: {pet.shelter.address}, {pet.shelter.city},{' '}
											{pet.shelter.state} {pet.shelter.zip}
										</h2>

										<h2>
											<a href={`mailto:${pet.shelter.email}`}>Email</a> or visit{' '}
											<a href={`${pet.shelter.website}`}>
												{pet.shelter.website}
											</a>
										</h2>
										<h2>{pet.shelter.description}</h2>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		);
}


export default SinglePet;