import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
import { IPackageModel } from './package';
import { ITagModel } from './tag';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IGroupModel extends mongoose.Document {
    ids: string[];
    packages: IPackageModel[];
    tags: ITagModel[];
    description: string;
    title: string;
    name: string;
    image_display_url: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
    ids: {
        type: [String],
        required: true
    },
    packages: {
        type: [],
        required: false
    },
    tags: {
        type: [],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    image_display_url: {
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
        let doc = <IGroupModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let GroupSchema = mongoose.model<IGroupModel>("group", schema, "groups", true);

export class GroupRepository extends RepositoryBase<IGroupModel> {
    constructor() {
        super(GroupSchema);
    }
}
