const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required :true,
        unique : true
    },
    name : {
         type: String,
         required :true,
    },
    password :{
        type: String,
        required :true,
    },
    bio : {
      type :String,
    }
} ,{timestamps:true});


userSchema.pre('save' ,async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
})



userSchema.methods.isPasswordValid = async function(password){
  return await  bcrypt.compare(password , this.password);
}





const userModel = mongoose.model('User' , userSchema);

module.exports = userModel;