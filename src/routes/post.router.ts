import { Router } from 'express'
import {
    getAllPosts,
    createPostHandler,
    updatePostHandler,
    getPostHandler,
    deletePostHandler
} from '../controller/post.controller'
import { validateRequest, requireUser } from '../middlware'
import { createPostSchema, updatePostSchema } from '../schema/post.schema'
const router = Router()

router.post('/post', [requireUser, validateRequest(createPostSchema)], createPostHandler)
router.put('/post/:id', [requireUser, validateRequest(updatePostSchema)], updatePostHandler)
router.get('/post/:id', requireUser, getPostHandler)
router.delete('/post/:id', requireUser, deletePostHandler)
router.get('/posts', getAllPosts)

export default router