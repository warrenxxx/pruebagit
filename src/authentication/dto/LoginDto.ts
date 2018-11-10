export const LoginDtoRules: any = {
    user: {
        presence: true,
        length: {
            minimum: 6,
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 6
        }
    }
};

export interface LoginDto {
    user: string;
    password: string;
}
