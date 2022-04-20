// rafce

import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  
  const context = useContext(NoteContext);
  const {notes, getNotes , editNote } = context;
  
  let navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Note Updated Successfully !", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button type='button' className='btn btn-primary d-none' ref={ref} data-bs-toggle='modal' data-bs-target='#exampleModal'>
        Launch demo modal
      </button>
      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModal' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModal'>
                Edit Note
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form className='container my-3'>
                <div className='mb-3'>
                  <label htmlFor='etitle' className='form-label'>Title</label>
                  <input type='text' className='form-control' id='etitle' name='etitle' value={note.etitle} aria-describedby='emailHelp' 
                  onChange={onChange} minLength={5} required/>
                </div>
                <div className='mb-3'>
                  <label htmlFor='edescription ' className='form-label'>Description</label>
                  <input type='text' className='form-control' id='edescription' name='edescription' value={note.edescription} 
                  onChange={onChange} minLength={5} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='etag ' className='form-label'>Tag</label>
                  <input type='text' className='form-control' id='etag' name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button ref={refClose} type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type='button' className='btn btn-primary' onClick={handleSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-2'>
        <h3>Your Exisitng Notes !</h3>
        <div className="container mx-2">
        {notes.length===0 && 'No existing notes to diplay! Please add some using above "Add Note" Section'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
