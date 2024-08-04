import React, { useContext, useState } from "react";
import notecontext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
const Notes = () => {
    const context=useContext(notecontext);
  const {notes,setNotes}=context;
  return (
    <div className="row my-3">
        <h2> Your notes</h2>
        {
          notes.map((note)=>{
            return <Noteitem note={note}/>;
          })
        }
      </div>
  )
}

export default Notes