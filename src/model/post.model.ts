import { object } from 'yup';
import mongoose from 'mongoose'

import { IUserDocument } from './user.model'
import { nanoid } from 'nanoid';

export interface IPostSchema extends mongoose.Document {
	title: string,
	content: string,
	user: IUserDocument["_id"]
	createdAt: Date
	updatedAt: Date
}
const PostSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
		unique: true,
		default: () => nanoid(12),
	},
	title: {
		required: true,
		type: String
	},
	content: String,
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}
},
	{
		timestamps: true,
	}
)

const Post = mongoose.model<IPostSchema>('Post', PostSchema)
export default Post