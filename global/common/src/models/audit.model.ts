import {ObjectID, ObjectId} from 'bson';

export class AuditModel {
    public createdLocalDate: Date;
    public modifiedLocalDate: Date;
    public modifiedBy: ObjectId;
    public createdBy: ObjectId;

    constructor() {
        this.createdLocalDate = new Date();
        this.modifiedLocalDate = new Date();
        this.modifiedBy = new ObjectID();
        this.createdBy = new ObjectID();
    }
}
