import {IImageState, IImageAction, IImage} from "./types/images";

const SET_IMAGES = 'images/setImages';

const setImages = (images: IImage) => ({
    type: SET_IMAGES,
    payload: images
});




export const getPetImagesThunk = (petId: number): any => async (dispatch: any) => {
    try {
        const response = await fetch(`/api/pets/${petId}/images`);
        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                throw response;
            }
        dispatch(setImages(data));
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
}




export const uploadMultiplePetImagesThunk = (petId: number, imageFiles: File[]): any => async (dispatch: any) => {
    try {
        const  formData = new FormData();     
        imageFiles.forEach((file) => {
            formData.append('image', file);
        });

        const response = await fetch(`/uploads/images/${petId}`, {
            method: 'POST',
            body: formData,
            headers: undefined
        });

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                throw response;
            }
            dispatch(setImages(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    
    }
};

export const deleteImageThunk = (id: any): any => async (dispatch: any) => {
    try {
        const response = await fetch(`/uploads/images/${id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            dispatch(setImages(id))
            return { success: true };
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
}



  const initialState: IImageState = {
    byId: {},
    // allAdopts: []
  }

function imagesReducer (state = initialState, action: IImageAction)
{

    let newById: { [id: number]: IImage };  
    // let newAllAdopts: IAdopt[] = [];

    let newState: IImageState = {
        byId: { ...state.byId},   
        // allAdopts: [ ...state.allAdopts ]
    };

    switch (action.type)
    {
        case SET_IMAGES:
                const newImage = action.payload;
                newById = newImage.byId;
                // newAllAdopts = newAdopt.allAdopts;
                newState.byId = { ...newById};
                // newState.allAdopts = [ ...newAllAdopts, newAdopt];
            return newState;
        default:
            return state;
    }
}


export default imagesReducer;