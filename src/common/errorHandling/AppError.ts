import MongoConfig from '../config/MongoConfig';

export class AppError implements Error {
    public errorCode: Number;
    public errorNameException: string;
    public message: string;
    public errorValues: ErrorValue[];

    public errorDate: Date;
    public messageSystem: string;
    public userName: string;

    name: string;

    constructor(errorNameException: string, message: string, errorValues: ErrorValue[], errorCode: Number, messageSystem: string, userName: string) {
        this.errorNameException = errorNameException;
        this.name = errorNameException;
        this.message = message;
        this.errorValues = errorValues;
        this.errorCode = errorCode;
        this.messageSystem = messageSystem;
        this.errorDate = new Date();
        this.userName = userName;
        this.saveError();
    }

    private saveError(): void {
        MongoConfig.db.collection('error').insertOne(this).then();
    }


}

export class ErrorValue {
    private key: string;
    private value: string;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }
}

export interface ErrorJson {
    code: number;
    name: string;
    message: string;
}

