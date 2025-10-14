import mongoose from "mongoose";

//create a schema
//modeal based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}//createAt update
);

const Note = mongoose.model("Note", noteSchema);

export default Note