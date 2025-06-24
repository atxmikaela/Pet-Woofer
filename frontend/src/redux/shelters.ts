import { csrfFetch } from './csrf';
import { IShelter, IShelterState, IShelterById, IActionCreator } from '../redux/types/shelters';

const GET_SHELTERS = 'shelters/getShelters';
const CREATE_SHELTER = 'shelters/createShelter';
const UPDATE_SHELTER = 'shelters/updateShelter';
const DELETE_SHELTER = 'shelters/deleteShelter';

const getShelters = (shelters: { byId: IShelterById }) => ({
	type: GET_SHELTERS,
	payload: shelters,
});

const createShelter = (shelter: IShelter) => ({
	type: CREATE_SHELTER,
	payload: shelter,
});

const updateShelter = (shelter: IShelter) => ({
	type: UPDATE_SHELTER,
	payload: shelter,
});

const deleteShelter = (shelterId: number) => ({
	type: DELETE_SHELTER,
	payload: shelterId,
});

export const getSheltersThunk = (): any => async (dispatch: any) => {
	try {
		const response = await csrfFetch('/api/shelters');
		if (response.ok) {
			const data = await response.json();
			if (data.errors) {
				throw response;
			}
			dispatch(getShelters(data));
		} else {
			throw response;
		}
	} catch (e) {
		
		return Response
	}
};

export const createShelterThunk = (newShelterForm: any): any => async (dispatch: any) => {
		try {
			const response = await csrfFetch('/api/shelters', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newShelterForm),
			});
			if (response.ok) {
				const data = await response.json();
				if (data.errors) {
					throw response;
				}
				dispatch(createShelter(data));
				return data.id;
			} else {
				throw response;
			}
		} catch (e) {
			const err = e as Response;
			return await err.json();
		}
	};

    export const updateShelterThunk = (shelterId: number, updatedShelterData: any): any => async (dispatch: any) => {
				try {
					const response = await csrfFetch(`/api/shelters/${shelterId}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updatedShelterData),
					});
					if (response.ok) {
						const data = await response.json();
						if (data.errors) {
							throw response;
						}
						dispatch(updateShelter(data));
					} else {
						throw response;
					}
				} catch (e) {
					const err = e as Response;
					return await err.json();
				}
			};

    export const deleteShelterThunk = (shelterId: number): any => async (dispatch: any) => {
                    try {
						const response = await csrfFetch(`/api/shelters/${shelterId}`, {
								method: 'DELETE',
								headers: { 'Content-Type': 'application/json' }
						});
                        if (response.ok) {
                            const data = await response.json();
                            if (data.errors) {
                                throw response;
                            }
                            dispatch(deleteShelter(data.id));
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

};

function shelterReducer(state = initialState, action: IActionCreator) {
	let newState: IShelterState;

	
	switch (action.type) {
		case GET_SHELTERS:
			state = action.payload
			newState = { ...state };
			return newState;

		case CREATE_SHELTER:
			const newShelter = action.payload;
			const newShelterId = newShelter.id;
			newState = { ...state, byId: { ...state.byId } };
			newState.byId[newShelterId] = newShelter;
			return newState;
		case UPDATE_SHELTER:
			const updatedShelter = action.payload;
			const updatedShelterId = updatedShelter.id;

			newState = { ...state, byId: { ...state.byId } };
			newState.byId[updatedShelterId] = updatedShelter;
			return newState;
		

		case DELETE_SHELTER:
			const shelterIdToDelete = action.payload;

			newState = { ...state, byId: { ...state.byId } };
			delete newState.byId[shelterIdToDelete];
			return newState;
		default:
			return state;
	}
}

export default shelterReducer;
