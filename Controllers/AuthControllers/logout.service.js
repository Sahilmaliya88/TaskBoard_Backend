
module.exports = logoutHandler = async(request,response)=>{
    try{
        request.session.destroy((err)=>{
            if(err){
                throw err
            }
            response.clearCookie("connect.sid")
            response.status(200).json({
                status:200,
                message:"user loggedout successfully"
            })
        })
    }catch(err){
        response.status(500).json({
            status:400,
            message:err.message
        })
    }
}