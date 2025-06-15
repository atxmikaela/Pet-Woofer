

export interface IAdopt {
    name: string,
    species: string,
    breed: string,
    age: string,
    gender: string,
    size: string,
    fee: number,
    status: string,
    description: string,
    userId: number,
    shelterId: number,
}

export interface IAdoptState {
    byId: {
        [id: number]: Adopt;
    },
    allAdopts: Adopt[];
}

export interface IAdoptAction {
    type: GET_ALL_ADOPTS,
    payload: adopts
} 

