import { IPetState,	IPetById, Pet, type IActionCreator } from '../redux/types/pets';
import { csrfFetch } from './csrf';

const GET_PETS = 'pets/setPet';
const UPDATE_PET = 'pets/updatePet';
const CREATE_PET = 'pets/createPet';
const DELETE_PET = 'pets/deletePet';

const getPets = (pets: { byId: IPetById }) => ({
	type: GET_PETS,
	payload: pets,
});

const createPet = (pet: Pet) => ({
	type: CREATE_PET,
	payload: pet,
});

const updatePet = (pet: Pet) => ({
	type: UPDATE_PET,
	payload: pet,
});

    export const getPetsThunk = (): any => async (dispatch: any) => {
        try {
            const response = await csrfFetch('/api/pets');
            if (response.ok) {
                const data = await response.json();
                if (data.errors) {
                    throw response;
                }
                dispatch(getPets(data));
            } else {
                throw response;
            }
        } catch (e) {
            const err = e as Response;
            return await err.json();
        }
    };

    export const createPetThunk = (petData: any): any => async (dispatch: any) => {
            try {
                const {images, ...petFields} = petData;

                const response = await csrfFetch(`/api/pets`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(petFields),
                });

                if (response.ok) {
                    const newPet = await response.json();

                    if (images && images.length > 0) {
                        const formData = new FormData();

                        for (let i = 0; i < images.length; i++) {
                            formData.append('image', images[i]);
                        }

                        const options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'multipart/form-data' },
                            body: formData,
                        };

                        const imageResponse = await csrfFetch(
                            `/api/pets/images/${newPet.id}`,
                            options,
                        );

                        if (imageResponse.ok) {
                            const imageData = await imageResponse.json();
                            console.log('Images uploaded:', imageData);
                        }
                    }

                    dispatch(createPet(newPet));
                    return newPet;
                } else {
                    throw response;
                }
            } catch (e) {
                const err = e as Response;
                return await err.json();
            }
        };

    export const updatePetThunk = (petId: number, petData: any): any =>	async (dispatch: any) => {
            try {
                const {images, ...petFields} = petData;

                const response = await csrfFetch(`/api/pets/${petId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(petFields),
                });

                if (response.ok) {
                    const updatedPet = await response.json();

                    if (images && images.length > 0) {
                        const formData = new FormData();

                        for (let i = 0; i < images.length; i++) {
                            formData.append('image', images[i]);
                        }

                        const options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'multipart/form-data' },
                            body: formData,
                        };

                        const imageResponse = await csrfFetch(
                            `/api/pets/images/${petId}`,
                            options,
                        );

                        if (imageResponse.ok) {
                            const imageData = await imageResponse.json();
                            console.log('Images uploaded:', imageData);
                        }
                    }

                    dispatch(updatePet(updatedPet));
                    return updatedPet;
                } else {
                    throw response;
                }
            } catch (e) {
                const err = e as Response;
                return await err.json();
            }
        };

    export const deletePetThunk = (petId: number): any => async (dispatch: any) => {
            try {
                const response = await csrfFetch(`/api/pets/${petId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    dispatch(getPetsThunk());
                    return {success: true};
                } else {
                    throw response;
                }
            } catch (e) {
                const err = e as Response;
                return await err.json();
            }
        };

    export const uploadPetImagesThunk = (petId: number, imageFiles: File[]): any => async (dispatch: any) => {
            try {
                const formData = new FormData();
                imageFiles.forEach((file) => {
                    formData.append('image', file);
                });

                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'multipart/form-data'},
                    body: formData,
                };

                const response = await csrfFetch(`/api/pets/images/${petId}`, options);

                if (response.ok) {
                    const data = await response.json();
                    if (data.errors) {
                        throw response;
                    }
                    dispatch(getPetsThunk());
                    return data;
                } else {
                    throw response;
                }
            } catch (e) {
                const err = e as Response;
                return await err.json();
            }
        };

export const deletePetImageThunk = (imageId: number): any => async () => {
		try {
			const response = await csrfFetch(`/api/pets/images/${imageId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				return {success: true};
			} else {
				throw response;
			}
		} catch (e) {
			const err = e as Response;
			return await err.json();
		}
	};

const initialState: IPetState = {
	byId: {},
};

function petsReducer(state = initialState, action: IActionCreator) {
	let newState: IPetState;

	switch (action.type) {
		case GET_PETS:
			state = action.payload;
			newState = { ...state };
			return newState;

		case CREATE_PET:
			const newPet = action.payload;
			const newPetId = newPet.id;
			newState = { ...state, byId: { ...state.byId }};
			newState.byId[newPetId] = newPet;
			return newState;

		case UPDATE_PET:
			const updatedPet = action.payload;
			const updatedPetId = updatedPet.id;
			newState = { ...state, byId: { ...state.byId }};
			newState.byId[updatedPetId] = updatedPet;
			return newState;

		case DELETE_PET:
			const petIdToDelete = action.payload;
			newState = { ...state, byId: { ...state.byId }};
			delete newState.byId[petIdToDelete];
			return newState;

		default:
			return state;
	}
}

export default petsReducer;
