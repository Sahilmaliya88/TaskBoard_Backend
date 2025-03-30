const User = require("../../Models/user.modal")
module.exports = RegisterHandler = async(request,response) =>{
    try {
        const {body} = request;
        const new_user = await User.create({...body,isDataMissing:false});
        if(!new_user){
            throw new Error("fail to create user")
        }
        new_user.password = undefined;
        request.session.user = new_user
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