import { Request, Response } from 'express'
import { get } from 'lodash'
import { findAll , createPost , findPost , updatePost , deletePostById} from '../service/post.service'
import Post from '../model/post.model'

export async function getAllPosts(req: Request, res: Response) {
	const posts = await findAll()
	res.json({ posts })
}

export async function updatePostHandler(req: Request, res: Response) {
	try{
		const postId = get(req , "params.postId")	
		const userId = get(req , "user._id")
		const update = req.body
		const post = await Post.findById(postId)
		if(!post){
			return res.status(404).json({message: "not found"})
		}
		if(post.user !== userId){
			//TODO:
			return res.status(401).json({message: "error"})
		}
		const updatedPost = await updatePost( {postId} , update , {new: true})
		res.status(201).json({updatedPost})
	}catch(err){
		throw err
	}
}
export async function createPostHandler(req: Request, res: Response) {
	try {
		const userId = get(req, 'user._id')
		const body = req.body
		const post = await createPost({...body , user:userId})
		res.status(201).json({post})
	} catch (err) {
		throw err
	}
}

export async function deletePostHandler(req: Request, res: Response){
	try{
		const postId = get(req, "params.PostId")
		await deletePostById(postId)
		res.json({message:'ok'})
	}catch(err){
		throw err
	}
	
}

export async function getPostHandler(req: Request, res: Response){
	const postId = get(req , "params.postId")
	const post = await findPost({postId})
	if(!post){
		return res.status(404).json({message: "not found"})
	}
	res.json({post})
}