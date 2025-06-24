import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import * as React from 'react';
import {createShelterThunk, getSheltersThunk} from "../redux/shelters";
import {useNavigate} from "react-router-dom";





const CreateShelter: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.session.user);
    


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
        });

       const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
   
       
 


const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoaded(true);

    try {
        const createData = {
            ...formData, 
            userId: user?.id,
            lat: 0,
            lon: 0
        };

       const newShelter = await dispatch(createShelterThunk(createData));
       await dispatch(getSheltersThunk())

        if(newShelter) navigate(`/shelter/${newShelter}`);

         } catch (error: any) {
        console.error('Create failed: ', error);
    } finally {
        
        setIsLoaded(false);
    }
};

if (!user || (user?.role !== 'Admin' && user?.role !== 'KPA Staff')){
    return <h1>You do not have permission to create shelters</h1>;
}
    return (
            <>
                <h1>Add a shelter</h1>

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
                        Address
                        <input
                            type='text'
                            value={formData.address}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, address: e.target.value }))
                            }
                            required
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
                            required
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
                            required
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
                            required
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
                                setFormData((prev) => ({ ...prev, website: e.target.value }))
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

                <button type='submit' disabled={isLoaded}>
                    {isLoaded ? 'Creating Shelter...' : 'Create Shelter'}
                </button>
            </form>
        </>
    );
};


export default CreateShelter;