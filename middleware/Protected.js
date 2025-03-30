module.exports.Protected = (request,response,next)=>{
    try{
        if(!request.session.user){
            throw new Error("please Login")
        }
        next()
    }catch(error){
        response.status(401).json({
            message:error.message
        })
    }
}