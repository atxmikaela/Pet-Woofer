import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {deleteShelterThunk, getSheltersThunk, updateShelterThunk} from "../redux/shelters";
import {useEffect, useState} from "react";
import * as React from 'react';




const SingleShelter: React.FC = () => {
	const params = useParams();
	const id: any = params.id;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
   const shelter = useAppSelector((state) => (state.shelters as { byId: any }).byId[id]);
	const user = useAppSelector((store) => store.session.user);

	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [hasCred, setHasCred] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	

	

	

	const [formData, setFormData] = useState({
		name: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		phone: '',
		email: '',
		website: '',
		description: '',
		userId: '',
	});

	useEffect(() => {
		if (shelter) {
			setFormData({
				name: shelter.name || '',
				address: shelter.address || '',
				city: shelter.city || '',
				state: shelter.state || '',
				zip: shelter.zip || '',
				phone: shelter.phone || '',
				email: shelter.email || '',
				website: shelter.website || '',
				description: shelter.description || '',
				userId: shelter.userId || '',
			});
		}
	}, [shelter]);

	useEffect(() => {
		if (!shelter || Object.keys(shelter).length === 0 || isUpdated) {
			const getShelt = async () => {
				await dispatch(getSheltersThunk());
				setIsLoaded(true);
				setIsUpdated(false)
			};
			getShelt();
		} else {
			if (
				user &&
				(user.id === shelter?.userId ||
					user?.role === 'Admin' ||
					user?.role === 'KPA Staff')
			) {
				setHasCred(true);
			}
			setIsLoaded(true);
		}
	}, [dispatch, shelter, user]);

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();


		try {
			const res = await dispatch(updateShelterThunk(shelter.id, formData));
			setIsEditing(false);
			if (res && !res.errors) {
				
				setIsEditing(false);
				setIsUpdated(true);
			}
		} catch (error) {
			console.error('Update failed: ', error);
		}
	};

	const handleCancel = () => {
		if (shelter) {
			setFormData({
				name: shelter.name || '',
				address: shelter.address || '',
				city: shelter.city || '',
				state: shelter.state || '',
				zip: shelter.zip || '',
				phone: shelter.phone || '',
				email: shelter.email || '',
				website: shelter.website || '',
				description: shelter.description || '',
				userId: shelter.userId || '',
			});
		}
		setIsEditing(false);
	};

	const handleDeleteShelter = async () => {
		if (
			window.confirm(
				`Whoa There! Are you sure you want to delete ${shelter.name}?`,
			)
		) {
			try {
				await dispatch(deleteShelterThunk(shelter.id));
				navigate('/');
			} catch (error) {
				console.error(`Failed to delete ${shelter.name}`, error);
			}
		}
	};

	if (!isLoaded || !shelter) return <h1>Your shelters are loading!</h1>;

	return (
		<div className='page-wrapper'>
			<div className='shelter-name-wrapper'>
				<h1>{shelter.name}</h1>
			</div>

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
							Address
							<input
								type='text'
								value={formData.address}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, address: e.target.value }))
								}
							/>
						</label>
						<label>
							City
							<input
								type='text'
								value={formData.city}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, city: e.target.value }))
								}
							/>
						</label>
						<label>
							State
							<input
								type='text'
								value={formData.state}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, state: e.target.value }))
								}
							/>
						</label>
						<label>
							Zipcode
							<input
								type='text'
								value={formData.zip}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, zip: e.target.value }))
								}
							/>
						</label>
						<label>
							Phone
							<input
								type='text'
								value={formData.phone}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, phone: e.target.value }))
								}
							/>
						</label>
						<label>
							Email
							<input
								type='text'
								value={formData.email}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, email: e.target.value }))
								}
							/>
						</label>
						<label>
							Website
							<input
								type='text'
								value={formData.website}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										website: e.target.value,
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

						<button type='submit'>Update {shelter.name}</button>
						<button type='button' onClick={handleCancel}>
							Cancel
						</button>
					</form>
				</>
			) : (
				<>
					{hasCred && (
						<>
							<p>Only logged in users with credentials can see this section.</p>
							<button onClick={() => setIsEditing(true)}>
								Edit {shelter.name}'s Information
							</button>
							<button onClick={handleDeleteShelter}>
								Delete {shelter.name}'s Profile?
							</button>
						</>
					)}
					<div className='shelter-grid'>
						<h2>
							Address: {shelter.address}, {shelter.city}, {shelter.state}{' '}
							{shelter.zip}
						</h2>

						<h2>
							<a href='mailto:{shelter.email}'>Email</a> or visit{' '}
							<a href='{shelter.website}'>{shelter.website}</a>
						</h2>
						<h2>{shelter.description}</h2>
					</div>
				</>
			)}
		</div>
	);
}

export default SingleShelter;