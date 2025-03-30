const User = require("../../Models/user.modal")
module.exports = VerifyUser = async(request,response) => {
    try {
        let user = request.session.user
        if(user){
            response.json({
                status:200,
                user
            })
        }else{
            throw new Error("please Login")
        }
    } catch (error) {
        response.json({
            status:401,
            message:error.message
        })
    }
}