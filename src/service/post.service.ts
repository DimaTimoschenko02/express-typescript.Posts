import { Request, Response } from 'express';
import { DocumentDefinition } from 'mongoose';
import Post from '../model/post.model'
import { IPostSchema } from '../model/post.model';
export async function findAll() {
    const posts = await Post.find()
    return posts
}

export async function createPost(post: DocumentDefinition<IPostSchema>): Promise<IPostSchema> {
    try {
        return await Post.create(post)
    } catch (err) {
        throw err
    }
}

export async function deleteById(id: IPostSchema["_id"]){
    
}