const User = require("../../Models/user.modal")
module.exports = userUpdateHandler = async(request,response) =>{
    try {
        const {body} = request;
        if(!request.session.user){
            throw new Error("please login")
        }
        const updatedBody = {}
        for(let field in body){
            if(field !== "email"){
                updatedBody[field] = body[field]
            }
        }
        const updated_user = await User.findByIdAndUpdate(request.session.user.id,updatedBody,{new:true})
        request.session.user = updated_user
        response.status(200).json({
            message:"user updated successfully",
            user:updated_user
        })
    } catch (error) {
        response.status(401).json({
            message:error.message
        })
    }
}