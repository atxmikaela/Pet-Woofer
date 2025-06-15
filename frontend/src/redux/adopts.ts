import {IAdoptState, IAdoptAction, IAdopt} from "./types/adopt";
import { csrfFetch } from "./csrf";

const SET_ADOPT = 'adopts/setAdopt';

const setAdopt = (adopts: IAdopt) => ({
    type: SET_ADOPT,
    payload: adopts
});


export const getAdoptsThunk = (): any => async ( dispatch: any ) => {
    try {
        const response = await csrfFetch( "/api/adopts", );
        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                throw response;
            }
            dispatch(setAdopt(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
  };

  const initialState: IAdoptState = {
    byId: {},
    allAdopts: []
  }

function adoptsReducer ( state = initialState, action: IAdoptAction )
{

    let newById: IAdoptState;  
    let newAllAdopts: IAdopt[] = [];

    let newState: IAdoptState = {
        byId: { ...state.byId },   
        allAdopts: [ ...state.allAdopts ]
    };

    switch ( action.type )
    {
        case SET_ADOPT:
                const newAdopt = action.payload;
                newById = newAdopt.byId;
                newAllAdopts = newAdopt.allAdopts;
                newState.byId = { ...newById };
                newState.allAdopts = [ ...newAllAdopts, newAdopt];
            return newState;
        default:
            return state;
    }
}


export default adoptsReducer;