import { Request, Response } from 'express'
import { findAll , createPost} from '../service/post.service'

export async function getAllPosts(req: Request, res: Response) {
	const posts = await findAll()
	res.json({ posts })
}

export async function updatePost(req: Request, res: Response) {

}
export async function createPostHandler(req: Request, res: Response) {
	try {
		const user = await createPost(req.body)
	} catch (err) {
		throw err
	}
}

export async function updatePosthandler(){
	
}