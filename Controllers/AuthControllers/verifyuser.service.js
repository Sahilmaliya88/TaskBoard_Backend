const User = require("../../Models/user.modal")
const Email = require("../../utils/Mail.Service")
const crypto = require("crypto")
module.exports.SendVerficationMail = async(request,response)=>{
    try {
        const user=  await User.findById(request.session.user.id)
        if(user.isVerified){
            throw new Error("user already vefied")
        } 
        const token =  user.verifyTokenGenerate()
        await user.save();
        const url = `${request.protocol}://${request.get("host")}/verify-account/${token}`
        await new Email(user,url).VericationEmail()
        user.Verification_token = undefined;
        user.Verification_token_Expires_At = undefined
        response.status(200).json({
            message:"please Check Mail"
        })
    } catch (error) {
        response.status(400).json({
            message:error.message
        })
    }
}
module.exports.VerifyHandler = async(request,response)=>{
    try {
        const token = request.params.token
        const HashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const verified_user = await User.findOneAndUpdate({$and:[{Verification_token:HashedToken},{Verification_token_Expires_At:{$gt:Date.now()}}]},{isVerified:true},{new:true})
        if(!verified_user){
            throw new Error("Invalid Token")
        }
        verified_user.Verification_token = undefined;
        verified_user.Verification_token_Expires_At = undefined;
        await verified_user.save()
        request.session.user = verified_user
        response.status(200).json({
            message:"user verified successfully",
            user:verified_user
        })
    } catch (error) {
        response.status(400).json({
            message:error.message
        })
    }
}
