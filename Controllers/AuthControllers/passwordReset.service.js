const User = require("../../Models/user.modal");
const Email = require("../../utils/Mail.Service")
const crypto = require("crypto");
module.exports.ForgotPasswordHandler = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("can't not find any account on this email");
    }
    if(user.authType!== "email"){
      throw new Error("please login through your provider")
    }
    const token = user.ForgotPassword();
    await user.save();
    const url = `${request.protocol}://${request.get("host")}/reset-password/${token}`
    await new Email(user,url).ResetEmail()
    response.status(200).json({
      message: "token generated",
      token,
    });
  } catch (error) {
    response.status(401).json({
      message: error.message,
    });
    console.log(error)
  }
};

module.exports.ResetPasswordHandler = async (request, response) => {
  try {
    const token = request.params.token;
    const {password} = request.body;
    const HashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ Password_Reset_Token: HashedToken });
    if (!user) {
      throw new Error("Invalid Token");
    }
    if(user.Password_Reset_Token_Expires_At < Date.now()){
        throw new Error("token expired");
    }
    user.password = password;
    user.Password_Reset_Token = undefined;
    user.Password_Reset_Token_Expires_At = undefined;
    await user.save();
    user.password = undefined
    request.session.user = user
    response.status(200).json({
        message:"password changed successfully",
        user:user
    })
  } catch (error) {
    response.status(401).json({
      message: error.message,
    });
  }
};
