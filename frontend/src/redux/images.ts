import {IImageState, IImageAction, IImage} from "./types/images";
import { csrfFetch } from "./csrf";

const SET_IMAGE = 'images/setImage';

const setImage = (images: IImage) => ({
    type: SET_IMAGE,
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


export const setImageThunk = (post: any): any => async (dispatch: any) =>
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
            dispatch(setImage(resPost));
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

  const initialState: IImageState = {
    byId: {},
    // allAdopts: []
  }

function imagesReducer (state = initialState, action: IImageAction)
{

    let newById: IImageState;  
    // let newAllAdopts: IAdopt[] = [];

    let newState: IImageState = {
        byId: { ...state.byId},   
        // allAdopts: [ ...state.allAdopts ]
    };

    switch (action.type)
    {
        case SET_IMAGE:
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