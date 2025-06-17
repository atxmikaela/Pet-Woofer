

export interface IImage
{
    byId: IImageState;
    id: number,
    petId: number,
    url: string,
    preview: boolean;
}

export interface IImageState
{
    byId: {
        [id: number]: IImage;
    },
}

export interface IImageAction
{
        type: string;
        payload: IImage;
}