import {IShelterState, IShelter, IShelterAction, IShelters} from "../redux/types/shelters";
import { csrfFetch } from "./csrf";



const SET_SHELTER = 'shelters/setShelter';

const setShelter = (shelters: IShelters) => ({
    type: SET_SHELTER,
    payload: shelters
});


export const getSheltersThunk = (): any => async ( dispatch: any ) => {
    try {
        const response = await csrfFetch( "/api/shelters", );
        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                throw response;
            }
            dispatch(setShelter(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
  };

  const initialState: IShelterState = {
    byId: {},

  }

function sheltersReducer (state = initialState, action: IShelterAction) {

    let newById: { [id: number]: IShelter };  
    // let newAllShelters: IShelter[] = [];

    let newState: IShelterState = {
        byId: { ...state.byId},   
        // allShelters: [ ...state.allShelters]
    };

    switch (action.type){
        case SET_SHELTER:
                const newShelter = action.payload;
                newById = newShelter.byId;
                // newAllShelters = newShelter.allShelters;
                newState.byId = { ...newById};
                // newState.allShelters = [ ...newAllShelters, newShelter];
            return newState;
        default:
            return state;
    }
}


export default sheltersReducer;