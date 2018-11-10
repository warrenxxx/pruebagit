export interface RegisterDto {
    userName: string;
    password: string;
    email: string;

    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
}

export const RegisterDtoRules: any = {
    userName: {
        presence: true,
        length: {minimum: 6}
    },
    password: {
        presence: true,
        length: {minimum: 6}
    },
    email: {
        presence: true,
        length: {minimum: 6}
    },
    firstName: {
        presence: true,
        length: {minimum: 6}
    },
    lastName: {
        presence: true,
        length: {minimum: 6}
    },
    birthDate: {
        presence: true,
        length: {minimum: 6}
    },
    gender: {
        presence: true,
        length: {minimum: 6}
    }
};

