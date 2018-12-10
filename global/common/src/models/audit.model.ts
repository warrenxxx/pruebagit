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
    public static newAuditStatic(_id: string): AuditModel {
        const audit = new AuditModel();
        audit.newAudit(_id);
        return audit;
    }

    public newAudit(_id: string): void {
        this.modifiedBy = new ObjectId(_id);
        this.createdBy = new ObjectId(_id);
        this.modifiedLocalDate = new Date();
        this.createdLocalDate = new Date();
    }

    public actAudit(_id: string): void {
        this.modifiedBy = new ObjectId(_id);
        this.modifiedLocalDate = new Date();
    }
}
