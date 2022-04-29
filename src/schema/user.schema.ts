import { object , string , ref } from "yup";

export const createUserSchema = object({
    body: object({
        name: string()
            .required('name is required')
            .min(4)
            .max(20 , 'name can not be more then 20 symbols'),
        password: string()
            .required('password is required')
            .min(6 , 'length must be more then 6')
            .max(20 , 'password can not be more then 20 symbols'),
        email: string()
            .required('email is required')
            .email('email is not valid')
    })
})