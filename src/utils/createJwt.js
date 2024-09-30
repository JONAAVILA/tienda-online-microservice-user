import jwt from 'jsonwebtoken';

const { SECRET_KEY, DOMAIN } = process.env;

const createJwt = (email)=>{
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

export default createJwt