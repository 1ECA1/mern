import Note from "../models/Note.js";

export async function getAllNotes (req, res)  {
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}

export async function getAllNoteById (req, res) {
    try{
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotesById controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}

export async function createNote(req, res) {
    try{
        const {title,content} = req.body
        const note = new Note({title, content})

        const saveNote = await note.save()
        res.status(201).json(saveNote)
    }catch (error) {
        console.error("Error in creating note controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}



export async function updateNote (req, res) {
    try{
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } //to return the updated note
        );

        if (!updateNote) return res.status(404).json({ message: "Note not found"});
        res.status(201).json({message: "note updated successfully"});
    }catch (error) {
        console.error("Error in updateNote controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}


export async function deleteNote(req, res) {
    try {
        const { title, content } = req.body;
        const deleteNote = await Note.findByIdAndDelete(
            req.params.id,
                 { title, content },
            { new: true } //to return the delete note
        );
    
    if (!deleteNote) return res.status(404).json({ message: "Note not found"});
        res.status(200).json({message: "note deleted successfully"});
    }catch (error) {
        console.error("Error in updateNote controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}

