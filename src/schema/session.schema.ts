import { object , string , ref } from "yup";

export const createSessionSchema = object({
    body: object({
        password: string()
            .required('password is required')
            .min(6 , 'length must be more then 6')
            .max(20 , 'password can not be more then 20 symbols'),
        email: string()
            .required('email is required')
            .email('email is not valid')
    })
})