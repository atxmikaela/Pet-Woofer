import {IImageState, IImageAction, IImage} from "./types/images";
import { csrfFetch } from "./csrf";

const SET_IMAGES = 'images/setImages';

const setImages = (images: IImage) => ({
    type: SET_IMAGES,
    payload: images
});


// export const getImageThunk = (): any => async ( dispatch: any ) => {
//     try {
//         const response = await csrfFetch( "/api/images", );
//         if (response.ok) {
//             const data = await response.json();
//             if (data.errors) {
//                 throw response;
//             }
//             dispatch(setImage(data));
//         } else {
//             throw response;
//         }
//     } catch (e) {
//         const err = e as Response;
//         return await err.json();
//     }
//   };


export const getImageThunk = (post: any): any => async (dispatch: any) =>
{
    try
    {
        const response = await csrfFetch( "/api/images/new", {
            method: "POST",
            body: post,
            headers: undefined
        });

        if (response.ok)
        {
            const {resPost} = await response.json();
            if (resPost.errors)
            {
                throw response;
            }
            dispatch(setImages(resPost));
        } else
        {
            throw response;
        }
    } catch (e)
    {
        const err = e as Response;
        return await err.json();
    }
};


export const getPetImagesThunk = (petId: number): any => async (dispatch: any) => {
    try {
        const response = await csrfFetch(`/api/pets/${petId}/images`);
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


export const uploadPetImagesThunk = (petId: number, imageFile: File): any => async (dispatch: any) => {
    try {
        const  formData = new FormData();
        formData.append('image', imageFile);

        const response = await csrfFetch(`/api/pets/${petId}/images`, {
            method: 'POST',
            body: formData,
            headers: undefined
        });

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                throw response;
            }
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    
    }
};


export const uploadMultiplePetImagesThunk = (petId: number, imageFiles: FileList): any => async (dispatch: any) => {
    try {
        const  formData = new FormData();
        for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', 'imageFile[i]');
        }
        const response = await csrfFetch(`/api/pets/${petId}/images`, {
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