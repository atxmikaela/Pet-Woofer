import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { createPetThunk } from "../redux/pets";
import * as React from 'react';
import {thunkAuthenticate} from "../redux/session";
import {useNavigate} from "react-router-dom";
import {uploadMultiplePetImagesThunk} from "../redux/images";


const CreatePet: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.session.user);
    


    const [formData, setFormData] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        color: '',
        size: '',
        fee: '',
        status: '',
        description: '',
        shelterId: '',
        expireDate: '',
        lastSeenDate: '',
        lastSeenLocation: '',
    });

        const [images, setImages] = useState<File[]>([]);
        const [imageErrors, setImageErrors] = useState<string[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
    
        useEffect(() => {
        dispatch(thunkAuthenticate());
        }, [dispatch]);
       
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);


        if(files.length === 0 ) {
            setImageErrors(['At least 1 image is required']);
            return;
        }

        if(files.length > 10) {
            setImageErrors(['Maximum 10 images allowed']);
            return;
        }

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024;
        const errors: string[] = [];

        files.forEach((file, index) => {
            if (!validTypes.includes(file.type)) {
                errors.push(`Image ${index + 1}: Only JPEG, PNG, and GIF files are allowed`);
            }
            if (file.size > maxSize) {
                errors.push(`Image ${index + 1}: File size must be less than 5MB`);
            }
        });

        if (errors.length > 0) {
            setImageErrors(errors);
            return;
        }

        setImages(files);
        setImageErrors([]);
    };



const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
        setImageErrors(['At least 1 image is required']);
        return;
    }

    setIsLoading(true);

    try {
    const createData = {
        ...formData,
        userId: user?.id || undefined,
        fee: formData.fee ? Number(formData.fee) : 0,
        shelterId: formData.shelterId ? Number(formData.shelterId) : undefined,
        expireDate: formData.expireDate ? new Date(formData.expireDate) : null,
        lastSeenDate: formData.lastSeenDate ? new Date(formData.lastSeenDate) : null,
    }

   
    const petRes = await dispatch(createPetThunk(createData));
        
    if (petRes && !petRes.errors && petRes.id) {
        
        const imageUploadRes = await dispatch(uploadMultiplePetImagesThunk(petRes.id, images));

		if (imageUploadRes && !imageUploadRes.errors) {
			navigate(`/pet/${petRes.id}`);
		} else {
			setImageErrors(['Failed to upload your pet images']);
			navigate(`/pet/${petRes.id}`);
		}

      } else {
        console.error('Pet creation failed:', petRes);
		setImageErrors(['Failed to create your pet']);
        
    }
} catch (error: any) {
    console.error('Create failed: ', error);
    setImageErrors([error.message || 'Failed to create pet or upload images']);
} finally {
    setIsLoading(false);
}
};

if (!user || user?.role === 'Public'){
    return <h1>You do not have permission to create pets</h1>;
}

    return (
			<>
				<h1>Add a pet</h1>

				<form onSubmit={handleUpdate}>
					<label>
						Name
						<input
							type='text'
							value={formData.name}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, name: e.target.value }))
							}
                            required
						/>
					</label>
					<label>
						Species
						<input
							type='text'
							value={formData.species}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, species: e.target.value }))
							}
                            required
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
                            required
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
                            required
						/>
					</label>
					<label>
						Size
						<select
							value={formData.size}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, size: e.target.value }))
							}
							required>
							<option value=''>Select Size</option>
							<option value='Small'>Small</option>
							<option value='Medium'>Medium</option>
							<option value='Large'>Large</option>
							<option value='Extra Large'>Extra Large</option>
						</select>
					</label>
					<label>
						Gender
						<select
							value={formData.gender}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, gender: e.target.value }))
							}
                            required
						>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unknown">Unknown</option>
                            </select>
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
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
                            required
                            rows={5}
						/>

					</label>

					<label>
						Shelter Id
						<input
							type='number'
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
						Pet Images 
							<input
							type="file"
						multiple
						accept="image/jpeg,image/jpg,image/png,image/gif"
						onChange={handleImageChange}
						required
						/>
					</label>

                    {images.length > 0 && (
                        <div>
                        <h3>Selected Images ({images.length}/10):</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
						{images.map((image, index) => (
							<div key={index} style={{ textAlign: 'center'}}>
								<img
								src={URL.createObjectURL(image)}
								alt={`Preview ${index +1}`}
								style={{ width: '100px', height: '100px', objectFit: 'cover' }}
/>
                                    <p style={{ fontSize: '12px' }}>{image.name}</p>
                                    {index === 0 && <small>(Preview image)</small>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {imageErrors.length > 0 && (
                    <div style={{ color: 'red' }}>
                        {imageErrors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}

                <button type='submit' disabled={images.length === 0 || isLoading}>
                    {isLoading ? 'Creating Pet...' : 'Create Pet'}
                </button>
            </form>
        </>
    );
};


export default CreatePet;