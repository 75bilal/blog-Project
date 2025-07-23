const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required :true,
    },
    text:{
        type : String,
        default :""
    },
    mediaUrl :{
        type : String,
        default :'',
    },
    mediaType:{
        type : String,
        default :'',
    }
} , {timestamps : true}
 );

const postModel =mongoose.model("userPost" , postSchema);

module.exports = postModel;