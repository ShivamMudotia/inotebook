//rafce

import React, { useContext } from "react";
import NoteContext from "../contexts/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className='card my-3'>
        <div className='card-body'>
          <h5 className='card-title'>Tag : {note.tag}</h5>
          <h5 className='card-title'>Title : {note.title}</h5>
        <h5 className='card-text'>Description : {note.description}</h5>
          <div className='d-flex align-items-center'>
            <i className='fa-solid fa-trash-can mx-2' onClick={() => {deleteNote(note._id); props.showAlert("Note Deleted Successfully !", "success");}}></i>
            <i className='fa-solid fa-pen-to-square mx-2' onClick={() => {updateNote(note)}}></i>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Noteitem;
