import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IPackageModel extends mongoose.Document {

    id: string;
    metadata_modified: string;
    resources: string[];
    language: string;
    methodologie: string;
    name: string;
    title: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
   
    id: {
        type: String,
        required: true
    },
    metadata_modified: {
        type: String,
        required: true
    },
    resources: {
        type: [String],
        required: true
    },
    language: {
        type: String,
        required: true
    },
    methodologie: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }

}).pre('save' , function(next) {
    if (this._doc) {
        let doc = <IPackageModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let PackageSchema = mongoose.model<IPackageModel>("package", schema, "packages", true);

export class PackageRepository extends RepositoryBase<IPackageModel> {
    constructor() {
        super(PackageSchema);
    }
}
