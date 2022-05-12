import { Request, Response } from 'express';
import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from "mongoose";
import Post, { IPostSchema } from '../model/post.model';

export async function findAll() {
	const posts = await Post.find()
	return posts
}

export async function createPost(post: DocumentDefinition<IPostSchema>): Promise<IPostSchema> {
	try {
		return Post.create(post)
	} catch (err) {
		throw err
	}
}

export async function deletePostById(_id: IPostSchema["_id"]) {
	return await Post.findByIdAndDelete(_id)
}
export async function findPost(
	query: FilterQuery<IPostSchema>,
	options: QueryOptions = { lean: true }
) {
	return Post.findOne(query, {}, options)
}

export async function updatePost(query: FilterQuery<IPostSchema>,
	update: UpdateQuery<IPostSchema>,
	options: QueryOptions) {

		return await Post.findOneAndUpdate(query , update , options)
}