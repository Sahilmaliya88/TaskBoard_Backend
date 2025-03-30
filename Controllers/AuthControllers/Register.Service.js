const User = require("../../Models/user.modal")
const Email = require("../../utils/Mail.Service")
module.exports = RegisterHandler = async(request,response) =>{
    try {
        const {body} = request;
        const new_user = await User.create({...body,isDataMissing:false});
        if(!new_user){
            throw new Error("fail to create user")
        }  new_user.password = undefined;
        new_user.Verification_token = undefined;
        new_user.Verification_token_Expires_At = undefined
        request.session.user = new_user
        const token =  new_user.verifyTokenGenerate()
        await new_user.save();
        const url = `${request.protocol}://${request.get("host")}/verify-account/${token}`
        await new Email(new_user,url).VericationEmail()
        new_user.password = undefined;
        new_user.Verification_token = undefined;
        new_user.Verification_token_Expires_At = undefined
        response.json({
            status:200,
            message:"please verify email",
            user:new_user
        })
    } catch (error) {
        response.json({
            status:400,
            message:error.message
        })
    }
}