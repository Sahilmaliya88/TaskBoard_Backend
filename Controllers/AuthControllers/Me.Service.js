const User = require("../../Models/user.modal")
module.exports = VerifyUser = async(request,response) => {
    try {
        let user = request.session.user
        if(user){
            response.status(200).json({
                status:200,
                user
            })
        }else{
            throw new Error("please Login")
        }
    } catch (error) {
        response.status(401).json({
            message:error.message
        })
    }
}