const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
            unique: true,
            trim: true,
        },
        name:{
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
        },

        password:{
            type: String,
            required: true,
            max:1024,
            minlength:6
        },
        profilePicture:{
            type:String,
            default:"./images/profil/pardefault.png"
        },
        coverPicture:{
            type:String,
            default:""
        },
        bio:{
            type:String,
            max:1000
        },
        followers:{
            type:[String]

        },
        following:{
            type:[String]
        },
        twists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]

    },
        {
            timestamps:true,
        }
    
)


userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Lors du login on vérifie si le mot de passe est le bon.
userSchema.statics.login = async function(pseudo, password){
    const user = await this.findOne({pseudo});
    if (user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;