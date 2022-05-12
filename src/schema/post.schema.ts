
import { object , string , ref } from "yup";

const payload = {
    body: object({
        title: string().required().max(20),
        content: string().required().max(1000)
    })
}

export const createPostSchema = object({
    ...payload
})

export const updatePostSchema = object({
    params: object({
        postId: string().required()
    }),
    ...payload
})

// export const deletePostSchema = object({
//     params: object({
//         postId: string().required()
//     })
// })

// export const getPostSchhemaById = object({
//     params: object({
//         postId: string().required()
//     })
// })
