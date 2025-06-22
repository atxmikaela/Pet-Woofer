import {IPetState, Pets, Pet} from "../redux/types/pets";
import { csrfFetch } from "./csrf";



const SET_PET = 'pets/setPet';
const UPDATE_PET = 'pets/updatePet'
const CREATE_PET = 'pets/createPet'

const setPet = (pets: Pets) => ({
    type: SET_PET,
    payload: pets
});

const updatePet = (pet: Pet) => ({
    type: UPDATE_PET,
    payload: pet
});

const createPet = (pet: Pet) => ({
    type: CREATE_PET,
    payload: pet
})


interface SetPetAction {
    type: typeof SET_PET;
    payload: Pets;
}

interface UpdatePetAction {
    type: typeof UPDATE_PET;
    payload: Pet;
}

interface CreatePetAction {
    type: typeof CREATE_PET;
    payload: Pet;
}

type IPetAction = SetPetAction | UpdatePetAction | CreatePetAction;


export const getPetsThunk = (): any => async (dispatch: any) => {
    try {
        const response = await csrfFetch("/api/pets",);
        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                throw response;
            }
            dispatch(setPet(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
  };

  export const createPetThunk = (petData?: Partial<Pet>): any =>  async ( dispatch : any ) => {
    try {
        const response = await csrfFetch(`/api/pets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData),
        });
        if (response.ok) {
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            dispatch(createPet(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
            return await err;
        }
    };

  export const updatePetThunk = (petId: number, petData?: Partial<Pet>): any =>  async ( dispatch : any ) => {
    try {
        const response = await csrfFetch(`/api/pets/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData),
        });
        if (response.ok) {
            const data = await response.json();
            
            dispatch(updatePet(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
            return await err.json();
        }
    };

    export const deletePetThunk = (petId: number, petData?: Partial<Pet>): any => async (dispatch: any) => {
        try {
            const response = await csrfFetch(`/api/pets/${petId}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
             },
             body: JSON.stringify(petData),
            });

            if(response.ok) {
                const data = await response.json();
                dispatch(setPet(data))
                return { success: true };
            } else {
                throw response;
            }
        } catch (e) {
            const err = e as Response;
            return await err.json();
        }
    }
  

  const initialState: IPetState = {
    byId: {
        
    },

  }

function petsReducer (state = initialState, action: IPetAction): IPetState {

    switch (action.type)
    {
        case SET_PET:
                return {
                    byId: { ...action.payload.byId}
                };


        case UPDATE_PET:
                return {
                    byId: {
                        ...state.byId,
                        [action.payload.id]: action.payload
                    }
                };
        case CREATE_PET:
                return {
                    byId: {
                        ...state.byId,
                        [action.payload.id]: action.payload
                    }
                }
        default:
            return state;
    }
}


export default petsReducer;