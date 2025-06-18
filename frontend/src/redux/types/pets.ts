


export interface Pet
{
    id: number,
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
    shelter?: any,
    images?: any[],
    expireDate?: Date | null,
    lastSeenDate?: Date | null,
    lastSeenLocation?: Date | null,
    color: string
}

export interface IPetState
{
    byId: {
        [id: number]: Pet;
    },
}

export interface Pets
    {
        byId: { [id: number]: Pet };
    }

export interface IPetAction {
    type: string;
    payload: Pets;
}