const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt-ts")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    email:{
        requied:[true,"Please Provide Email"],
        type:String,
        unique:[true,"email must be unique"],
        validate:{
            validator: function (value) {
                return validator.isEmail(value); 
              },
             message: props => `${props.value} is not a valid email address!`, 
        },
        lowercase:true,
        trim:true
    },
    username:{
        type:String,

    },
    phone:{
        type:String,
        unique:[true,"Phone number already used"],
        match:[/^\+?[0-9]{1,4}?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}$/,"please enter valid number"]
    },
    password:{
        type:String,
        required:[true,"please Enter Password"],
        select:false
    },
    isActive:{
        type:Boolean,
        default:true,
        select:false
    },
    isDataMissing:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    authType:{
        type:String,
        default:"email"
    },
    profile_image:String,
    Password_Reset_Token:{
        type:String,
        select:false
    },
    Password_Reset_Token_Expires_At:Date,
    Verification_token:{
        type:String,
        select:false
    },
    Verification_token_Expires_At:Date
},{toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true})

userSchema.index({email:1},{unique:true})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try{
        const hashed_password = await bcrypt.hash(this.password,12);
        this.password = hashed_password;
        this.confirmpassword = undefined;
        next()
    }catch(err){
        if(process.env.NODE_ENV==="development"){
            console.log(err)
        }
        next()
    }
})
userSchema.methods.CompoarePassword = async function(candidatePassword) {
    try{
        return await bcrypt.compare(candidatePassword,this.password)
    }catch(error){
        if(process.env.NODE_ENV==="development"){
            console.log(err)
        }
    }
}
userSchema.methods.ForgotPassword = function(){
    try {
        const token = crypto.randomBytes(32).toString("hex")
        const HashedToken = crypto.createHash("sha256").update(token).digest("hex");
        this.Password_Reset_Token = HashedToken;
        this.Password_Reset_Token_Expires_At = Date.now()+10*60*1000
        return token;
    } catch (error) {
        console.log(err.message)
    }
}
userSchema.methods.verifyTokenGenerate = function(){
    try {
        const token = crypto.randomBytes(32).toString("hex")
        const HashedToken = crypto.createHash("sha256").update(token).digest("hex");
        this.Verification_token = HashedToken;
        this.Verification_token_Expires_At = Date.now()+10*60*1000
        return token;
    } catch (error) {
        console.log(err.message)
    }
}
const User = mongoose.model("User",userSchema)
module.exports = User