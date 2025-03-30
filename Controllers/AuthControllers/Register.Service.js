const User = require("../../Models/user.modal")
export const RegisterHandler = async(request,response) =>{
    try {
        const {body} = request;
        const new_user = await User.create(body);
        if(!new_user){
            throw new Error("fail to create user")
        }
        response.json({
            status:200,
            user:new_user
        })
    } catch (error) {
        response.json({
            status:400,
            message:error.message
        })
    }
}