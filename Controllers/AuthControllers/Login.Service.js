const User  = require("../../Models/user.modal")
module.exports =  LoginHandler = async(request,response) =>{
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email:email}).select("+password");
        if(!user){
            throw new Error("User Not Found")
        }
        if(user.authType!== "email"){
            throw new Error("please login through your provider")
          }
        const IsPasswordValid =await user.CompoarePassword (password)
        if(!IsPasswordValid){
            throw new Error("Enter Valid Password")
        }
        user.password = undefined
        request.session.user = user
        response.status(200).json({
            status:200,
            message:"user LoggedIN",
            user
        })
    }catch(error){
        response.status(401).json({
            status:"401",
            message:error.message
        })
    }
}