import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
import { IResourceModel } from './resource';
import { ITagModel } from './tag';
import { IGroupModel } from './group';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IPackageModel extends mongoose.Document {

    id: string;
    dataset: string;
    license_title?: string;
    metadata_modified: string;
    resources?: IResourceModel[];
    tags?: ITagModel[];
    groups?: string[];
    language?: string;
    methodologie?: string;
    name: string;
    title?: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
   
    id: {
        type: String,
        required: true
    },
    dataset: {
        type: String,
        required: true
    },
    license_title: {
        type: String,
        required: false
    },
    metadata_modified: {
        type: String,
        required: true
    },
    resources: {
        type: [],
        required: false
    },
    tags: {
        type: [],
        required: false
    },
    groups: {
        type: [String],
        required: false
    },
    language: {
        type: String,
        required: false
    },
    methodologie: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },title: {
        type: String,
        required: false
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
