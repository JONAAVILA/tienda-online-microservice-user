import Joi from "joi";

export const schema = Joi.object({
    uuid:Joi.string()
        .uuid(),
    sellerUser:Joi.string()
        .min(3)
        .max(50),
    seller:Joi.string()
        .min(3)
        .max(50),
    name:Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z .-_]+$')),
    userName:Joi.string()
        .pattern(new RegExp('^[a-zA-Z .-_]+$'))
        .max(30),
    surname:Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z .-_]+$')),
    password: 
        Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')),
    image:
        Joi.string()
        .uri({
            scheme:['https']
        })
        .pattern(new RegExp('^https?:\/\/(www\.)?prueba\.com(/|$)')),
    email:Joi.string()
        .email(),
    address:Joi.string()
        .min(3)
        .max(50)
        .pattern(new RegExp('^[a-zA-Z0-9 .]+$')),
    number:Joi.string()
        .min(1)
        .max(6),
    location:Joi.string()
        .min(3)
        .max(50)
        .pattern(new RegExp('^[a-zA-Z0-9 .]+$')),
    phone:Joi.string()
        .min(10)
        .max(20),
    state:Joi.string()
        .min(3)
        .max(40)
        .pattern(new RegExp('^[a-zA-Z .]+$')),
    country:Joi.string()
        .min(3)
        .max(50)
        .pattern(new RegExp('^[a-zA-Z .]+$')),
    tittle:Joi.string()
        .min(10)
        .max(50),
    description:Joi.string()
        .min(20)
        .max(80),
    code:Joi.string()
        .min(6)
        .max(6)
}).or( 
       'uuid',
       'name',
       'userName',
       'surname',
       'password',
       'image',
       'email',
       'address',
       'number',
       'phone',
       'location',
       'state',
       'country',
       'tittle',
       'description',
       'code'
    )