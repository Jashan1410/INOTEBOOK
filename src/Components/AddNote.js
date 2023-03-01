import React, { useState , useContext } from 'react'
import Notecontext from '../context/Notes/NoteContext';

const AddNote = () => {

  const Contextdata = useContext(Notecontext);
  const { addnote } = Contextdata;


  const [newnote, setnewnote] = useState({Title:"",Discripation:"",Tag:"General"});

  const handlesubmit = async (event) => {
     event.preventDefault();
     await addnote(newnote.Title,newnote.Discripation,newnote.Tag);
     setnewnote({Title:"",Discripation:"",Tag:"General"});
  }

    const changes = (event) => {
          setnewnote({...newnote, [event.target.name]:event.target.value});
    }

    return (
      <>

      <div className='container my-5'>
        <h2>Add your Notes</h2>
        <form>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">Title</label>
              <input type="text" className="form-control" value={newnote.Title} id="Title" name='Title' aria-describedby="emailHelp" onChange={changes} minLength='5' required />
              <div id="emailHelp" className="form-text">We'll never share your Notes with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="Tag" className="form-label">Tag</label>
              <input type="text" value={newnote.Tag} className="form-control" id="Tag" name='Tag' aria-describedby="emailHelp" onChange={changes}  />
            </div>
            <div className="mb-3">
              <label htmlFor="Discripation" className="form-label">Discripation</label>
              <input type="text" className="form-control" value={newnote.Discripation} id="Discripation" name='Discripation' onChange={changes} minLength='5' required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handlesubmit} >Submit</button>
          </form>
      </div>

      </>
    )
  
}

export default AddNote;