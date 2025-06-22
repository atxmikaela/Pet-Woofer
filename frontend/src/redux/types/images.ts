

export interface IImage {
    id: number | string,
    petId: number,
    url: string,
    preview: boolean;
}

export interface IImageState {
    byId: {
        [id: number]: IImage;
    },
}

export interface Images {
    byId: { [id: number]: IImage };
}

export interface IImageAction
{
        type: string;
        payload: Images;
}