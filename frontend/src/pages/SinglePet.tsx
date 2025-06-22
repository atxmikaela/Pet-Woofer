import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { deletePetThunk, getPetsThunk, updatePetThunk } from "../redux/pets";
import * as React from 'react';
import {thunkAuthenticate} from "../redux/session";
import {deleteImageThunk, uploadMultiplePetImagesThunk} from "../redux/images";



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
	const [images, setImages] = useState<File[]>([]);
	const [imageErrors, setImageErrors] = useState<string[]>([]);
	const [isUploadingImages, setIsUploadingImages] = useState<boolean>(false);


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
    })

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
            });
        }
    }, [pet]);

    

    useEffect(() => {

        if (!pet || Object.keys(pet).length === 0 || !pet.images) {
        const getAdopts = async () => {
             await dispatch(getPetsThunk())
             await dispatch(thunkAuthenticate())
             setIsLoaded(true)
        };
        getAdopts();
    } else {
		if (
			user &&
			(
				user.id === pet?.userId ||
				user?.role === 'Admin' ||
				user?.role === 'KPA Staff' ||
				user?.role === 'KPA Volunteer' ||
				user?.shelterId === pet?.shelterId
			)
		) {
			setHasCred(true);
		}
		setIsLoaded(true);
	}
	}, [dispatch, pet, user])

 

		const handleUpdate = async (e: React.FormEvent) => {
			e.preventDefault();

			const updateData = {
				...formData,
				fee: formData.fee ? Number(formData.fee) : 0,
				shelterId: formData.shelterId ? Number(formData.shelterId) : undefined,
				expireDate: formData.expireDate ? new Date(formData.expireDate) : null,
				lastSeenDate: formData.lastSeenDate
					? new Date(formData.lastSeenDate)
					: null,
			};

			try {
				const res = await dispatch(updatePetThunk(pet.id, updateData));
				setIsEditing(false);
				if (res && !res.errors) {
					setIsEditing(false);
				}
			} catch (error) {
				console.error('Update failed: ', error);
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
            });
        }
        setIsEditing(false);
        
    }

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setImages(files);
		setImageErrors([]);
	};

	const handleImageUpload = async () => {
		if (images.length === 0) return;

		setIsUploadingImages(true);

		try {
			const res = await dispatch(uploadMultiplePetImagesThunk(pet.id, images));

			if (res && res.petImages) {
				const updatedPet = {
					...pet,
					images: [...(pet.images || []), ...res.petImages]
				};
				dispatch(updatePetThunk(pet.id, updatedPet))
			}

			setImages([]);
		} catch (error) {
			setImageErrors(['Failed to upload images']);
		} finally {
			setIsUploadingImages(false);
			setIsEditing(false);
		}
	};

	const handleDeleteImage = async (imageId: number) =>{
		try {
			const res = await dispatch(deleteImageThunk(imageId));

			if (res && res.petImages) {
				const updatedPet = {
					...pet,
					images: [...(pet.images || []), ...res.petImages]
				};
				dispatch(updatePetThunk(pet.id, updatedPet))
				
			}
			setImages([]);
		} catch (error) {
			setImageErrors(['Failed to delete images']);
		} finally {
			dispatch(getPetsThunk())
		
		};
	}

	const handleDeletePet = async () => {
			if (window.confirm(`Whoa There! Are you sure you want to delete ${pet.name}?`)){
				try {
					await dispatch(deletePetThunk(pet.id, pet));
					navigate('/');
				} catch (error) {
					console.error(`Failed to delete ${pet.name}`, error);
				}
			}
		};
	

    if (!isLoaded || !pet) return <h1>Your pets are on the way!</h1>

    return (
			<>
				<h1>Single Pet Page</h1>

				{isEditing && hasCred ?  (
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
										setFormData((prev) => ({ ...prev, breed: e.target.value }))
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
										setFormData((prev) => ({ ...prev, gender: e.target.value }))
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
										setFormData((prev) => ({ ...prev, status: e.target.value }))
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
										setFormData((prev) => ({ ...prev, color: e.target.value }))
									}
								/>
							</label>
							<button type='submit'>Update {pet.name}</button>
							<button type='button' onClick={handleCancel}>
								Cancel
							</button>
							<input
								type='file'
								multiple
								accept='image/jpeg,image/jpg,image/png,image/gif'
								onChange={handleImageChange}
							/>
							<button
								onClick={handleImageUpload}
								disabled={images.length === 0 || isUploadingImages}>
								{isUploadingImages ? 'Uploading . . .' : 'Upload Images'}
							</button>
							{imageErrors.map((error, idx) => (
								<p key={idx}>{error}</p>
							))}
						</form>
					</>
				) : (
					<>
						{pet?.images &&
							pet.images.length > 0 &&
							pet.images.map((image: { id: number; url: string }, idx: number) => (
								<div key={idx}>
									<img 
										src={image.url}
										height='300px'
										alt={pet.name || 'Pet image'}
									/>
									{hasCred && (
										<button onClick={() => handleDeleteImage(image.id)}>
											Delete
										</button>
									)}
								</div>
							))}

						{hasCred && (
							<>
							<p>Only logged in users with credentials can see this section.</p>
							<button onClick={() => setIsEditing(true)}>Edit {pet.name}'s Information</button>
							<button onClick={handleDeletePet}>Delete {pet.name}'s Profile?</button>
							</>
						)}
						<p>Pet Id: {pet.userId} Shelter Id: {pet?.shelterId}</p>
						<h2>Name: {pet.name}</h2>
						<h2>Species: {pet.species}</h2>
						<h2>Breed: {pet.breed}</h2>
						<h2>Age: {pet.age}</h2>
						<h2>Gender: {pet.gender}</h2>
						<h2>Color: {pet.color}</h2>
						<h2>Size: {pet.size}</h2>
						<h2>Adoption Fee: ${pet.fee}</h2>
						<h2>Status: {pet.status}</h2>
						<h2>Description: {pet.description}</h2>

						{pet.expireDate != null && (
							<h2>
								{pet.name} is likely to be euthanized on {pet.expireDate}
							</h2>
						)}

						{pet.lastSeenDate != null && (
							<h2>
								{pet.name} was last seen on {pet.lastSeenDate}
							</h2>
						)}

						{pet.lastSeenLocation != null && (
							<h2>
								{pet.name} was last seen at {pet.lastSeenLocation}
							</h2>
						)}

						{pet?.shelter?.name != null && (
							<>
								<h2>
									You can find {pet.name} at {pet.shelter.name}
								</h2>
								<h2>
									{pet.shelter.address}, {pet.shelter.city}, {pet.shelter.state}{' '}
									{pet.shelter.zip}
								</h2>
								<h2>Phone: {pet.shelter.phone}</h2>
								<h2>
									<a href={`mailto:${pet.shelter.email}`}>Email</a>{' '}
									<a href={`${pet.shelter.website}`} target='new'>
										Website
									</a>
								</h2>
							</>
						)}
					</>
				)}
			</>
		);
}




export default SinglePet;