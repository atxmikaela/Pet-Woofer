

export interface LoginUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    role: string,
    shelterId: number,
    isHost: boolean
}

export interface PaginationValues{
    limit?: number,
    offset?: number
}

export interface GoodShelter {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    lat: number,
    lon: number,
    phone: string,
    email: string,
    website: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
}

export interface GoodAdopt {
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
    shelterId: number,
    userId: number,
    createdAt: string,
    updatedAt: string,
}


