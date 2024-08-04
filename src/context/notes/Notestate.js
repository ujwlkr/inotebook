
import { useState } from "react";
import notecontext from "./notecontext";
const Notestate=(props)=>{
    const notesInitial=[
        {
          "_id": "6512c95bdf3bbcc6f5e9fccb",
          "user": "650f4b82a7336c47763b4fe1",
          "title": "Updted note",
          "description": "Please wake up early updated",
          "tag": "personal",
          "date": "2023-09-26T12:06:51.308Z",
          "__v": 0
        },
        {
          "_id": "6512c9f1df3bbcc6f5e9fccf",
          "user": "650f4b82a7336c47763b4fe1",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-09-26T12:09:21.765Z",
          "__v": 0
        }
      ]
      const[notes,setNotes]=useState(notesInitial)
    return(
        <notecontext.Provider value={{notes,setNotes}}> {/*We can also do {state,update} basically ek object h*/}
            {props.children}
        </notecontext.Provider>
    )
}
export default Notestate