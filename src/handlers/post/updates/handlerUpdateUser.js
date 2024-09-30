import { models } from "../../../db.js";
import { schema } from "../../../utils/schema.js";
const User = models.User

const handlerUpdateUsers = async (
    uuid,
    name,
    userName,
    surname,
    image,
    email,
    passwordHashed,
    address,
    state,
    country
) => {

    const { error } = await schema.validate({
        uuid:uuid,
        name:name,
        userName:userName,
        surname:surname,
        image:image,
        email:email,
        password:passwordHashed,
        address:address,
        state:state,
        country:country
    })

    if (error) throw new Error('Parameters are missing or wrong');

    try {
        const response = await User.create({
            id: uuid,
            name: name,
            userName:userName,
            surname: surname,
            image: image,
            email: email,
            password: passwordHashed,
            address: address,
            state: state,
            country: country
        });
        if (response){
            return `User ${response.name} created`
        }
        return `Error, user not created`;
    } catch (error) {
        throw new Error('Error creating user')
    }
};

export default handlerUpdateUsers;
