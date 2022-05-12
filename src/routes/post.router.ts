import { Router } from 'express'
import { getAllPosts , createPostHandler , updatePosthandler} from '../controller/post.controller'
import { validateRequest , requireUser } from '../middlware'
import { createPostSchema , updatePostSchema , getPostById } from '../schema/post.schema'
const router = Router()

router.post('/post' ,[requireUser , validateRequest(createPostSchema)], createPostHandler)
router.put('/post/:id' , [requireUser , validateRequest(updatePostSchema)] , updatePosthandler)
router.get('/post/:id' , requireUser , getPostById)
router.get('/post' , requireUser , getAllPosts)
router.delete('/post/:id' , () => {
    console.log('1212')
})

export default router