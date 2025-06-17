import {IPetState, Pets, IPetAction} from "../redux/types/pets";
import { csrfFetch } from "./csrf";



const SET_PET = 'pets/setPet';

const setPet = (pets: Pets) => ({
    type: SET_PET,
    payload: pets
});


export const getPetsThunk = (): any => async ( dispatch: any ) => {
    try {
        const response = await csrfFetch( "/api/pets", );
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

  const initialState: IPetState = {
    byId: {},

  }

function petsReducer (state = initialState, action: IPetAction)
{

    let newById: IPetState;  
    // let newAllPets: IPet[] = [];

    let newState: IPetState = {
        byId: { ...state.byId},   
        // allPets: [ ...state.allPets]
    };

    switch (action.type)
    {
        case SET_PET:
                const newPet = action.payload;
                newById = newPet.byId;
                // newAllPets = newPet.allPets;
                newState.byId = { ...newById};
                // newState.allPets = [ ...newAllPets, newPet];
            return newState;
        default:
            return state;
    }
}


export default petsReducer;