import mongoose from "mongoose";

const bookSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publishYear:{
            type:Number,
            requried:true,
        },

    },
    {
        timestamps:true,
    }
);
export const Book=mongoose.model('cat',bookSchema);