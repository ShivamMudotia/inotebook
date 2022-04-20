//rafce

import React, { useContext, useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Note Added Successfully !", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container my-2'>
        <h3>Add a note</h3>
      </div>

      <div className='container my-2 '>
        <form className='container my-2'>
          <div className='mb-2'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input type='text' className='form-control' value={note.title} id='title' name='title' aria-describedby='emailHelp' onChange={onChange} minLength={5} required/>
          </div>
          <div className='mb-2'>
            <label htmlFor='description ' className='form-label'>
              Description
            </label>
            <input type='text' className='form-control' value={note.description} id='description' name='description' onChange={onChange} minLength={5} required />
          </div>
          <div className='mb-2'>
            <label htmlFor='tag ' className='form-label'>
              Tag
            </label>
            <input type='text' className='form-control' value={note.tag} id='tag' name='tag' onChange={onChange} />
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5} type='submit' className='btn btn-primary' onClick={handleSubmit}>
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;
