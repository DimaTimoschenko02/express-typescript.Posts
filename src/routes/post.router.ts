import { Router } from 'express'
import { validateRequest } from '../middlware'
import { requireUser } from '../middlware'
const router = Router()

// router.post('/post' ,[requireUser , validateRequest(createPostSchema)], createPost)
// router.put('/post/:id' , [requireUser , validateRequest(updatePostSchema)] , updatePost)
// router.get('/post/:id' , requireUser , getPostById)
// router.get('/post' , requireUser , getAllPosts)
router.delete('/post/:id' , () => {
    console.log('1212')
})

export default router