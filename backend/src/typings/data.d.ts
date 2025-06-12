

export interface LoginUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
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

export interface WhereValues{
    lat?: any,
    lng?: any,
    price?: any
}
