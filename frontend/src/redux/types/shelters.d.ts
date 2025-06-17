import { Pet } from './pets';

export interface IShelter {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lon: number;
    phone: string;
    email: string;
    website: string;
    description: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    pets: { [id: number]: Pet };
}

export interface IShelterState
{
    byId: {
        [id: number]: IShelter;
    },
}

export interface IShelters {
    byId: { [id: number]: IShelter };
}

export interface IShelterAction {
    type: string;
    payload: IShelters;
}