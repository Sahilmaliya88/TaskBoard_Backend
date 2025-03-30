const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt-ts")
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
        unique:[true,"username Already used"]
    },
    phone:{
        type:String,
        unique:[true,"Phone number already used"],
        required:[true,"Please Provide Mobile Number"],
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
    profile_image:String,
    Password_Reset_Token:String,
    Password_Reset_Token_Expires_At:Date,
    Verification_Url:String,
    Verification_Url_Expires_At:Date
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
const User = mongoose.model("User",userSchema)
module.exports = User