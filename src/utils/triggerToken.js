import crypto from 'node:crypto';

function token (){
    return crypto.randomInt(100000,999999).toString()
}

export default token;