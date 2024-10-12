import jwt from 'jsonwebtoken';

const { SECRET_KEY, DOMAIN } = process.env;

export const emailJwt = (email)=>{
    const payload = {
        email:email,
        // aud:DOMAIN
    }

    const token = jwt.sign(
        payload,
        SECRET_KEY,
        {
            expiresIn:'6m'
        }
    )
    return token
}

export const userRefrestJwt = (id,name,surname)=>{
    const payload = {
        id:id,
        name:name,
        surname:surname
    }

    const token = jwt.sign(
        payload,
        SECRET_KEY,
        {
            expiresIn:'7d'
        }
    )
    return token
}

export const userLoginJwt = (id,name,surname)=>{
    const payload = {
        id:id,
        name:name,
        surname:surname
    }

    const token = jwt.sign(
        payload,
        SECRET_KEY, 
        {
            expiresIn:'1d'
        }
    )
    return token
}
