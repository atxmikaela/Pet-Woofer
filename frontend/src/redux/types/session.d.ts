
export interface SessionInitialState {
    user: null | IUser;
}

export interface IUser {
    id: number;
    email: string;
    phone: string;
}

export interface ISignUpUser{
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}


export interface ICredentials {
    credential?: string;
    email?: string;
    phone: string;
    password: string;

}
