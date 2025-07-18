const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
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

const Data =mongoose.model("userData" , dataSchema);

module.exports = Data;