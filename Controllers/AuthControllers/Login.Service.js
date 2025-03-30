const User  = require("../../Models/user.modal")
module.exports =  LoginHandler = async(request,response) =>{
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email:email}).select("+password");
        if(!User){
            throw new Error("User Not Found")
        }
        const IsPasswordValid = user.CompoarePassword (password)
        if(!IsPasswordValid){
            throw new Error("Enter Valid Password")
        }
        user.password = undefined
        request.session.user = user
        response.json({
            status:200,
            message:"user LoggedIN",
            user
        })
    }catch(error){
        response.json({
            status:"401",
            message:error.message
        })
    }
}