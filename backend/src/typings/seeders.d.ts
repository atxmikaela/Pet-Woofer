
export interface OptionsInterface {
    schema?: string;
    tableName?: string;
}


export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
    shelterId: number;
    hashedPassword: string;
}

export interface Shelter {
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
    userId: number,
}

export interface Pet {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    hashedPassword: string;
}
