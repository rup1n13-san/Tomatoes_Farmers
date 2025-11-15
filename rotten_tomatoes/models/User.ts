import mongoose from "mongoose";
export function generateToken(length = 128) {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return token;
}
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: [true, "name already exist"], trim: true,
                // match: [/^[A-Za-z0-9_]$/, 'Please fill a valid username'],
                minlength: 3, maxLength: 20

        
     },
    email: {
        type: String,
        required: true, unique: [true, "email already exist"],
        trim: true,
       match: [/^[a-z0-9!#$%&'\*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'\*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: "user"
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: { 
        type: String,
        default:generateToken()

     },


},
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User