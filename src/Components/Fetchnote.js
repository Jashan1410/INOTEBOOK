import React,{ useContext , useEffect , useState } from 'react'
import { Button, Modal } from 'antd';
import Notecontext from '../context/Notes/NoteContext';

function Fetchnote(props) {

    const [UpdateNoteData, setUpdateNoteData] = useState({Title:"",Discripation:"",Tag:"General",_id:""});
    const Contextdata = useContext(Notecontext);
    const { showalert , Deletnote , UpdateNote , Fetchnotes} = Contextdata;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
  
        const showModal = (id) => {
          setOpen(true);
          setUpdateNoteData({...UpdateNoteData, _id:id, Title:"",Discripation:"",Tag:"General"});
        };
  
        const handleOk = () => {
          setLoading(true);
          Updatedata();
          setTimeout(() => {
            setLoading(false);
            setOpen(false);
          }, 500);
        };
  
        const handleCancel = () => {
          setOpen(false);
        };
  
        useEffect(() => {
          Fetchnotes();
        },[ Fetchnote , loading , open ]);
        
        function delet(id) {
              Deletnote(id);
        }
        function Updatedata() {
          UpdateNote(UpdateNoteData._id, UpdateNoteData.Title , UpdateNoteData.Discripation , UpdateNoteData.Tag);
        }
        function changes(event) {
          setUpdateNoteData({...UpdateNoteData, [event.target.name]:event.target.value});
        }



  return (
    <>

        {/*  modal for update notes data */}

      <Modal open={open} title="Update your Note" onOk={handleOk} onCancel={handleCancel} footer={[ <Button key="back"
      onClick={handleCancel}>
      Return
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
      </Button>,
      <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
          Search on Google
      </Button>,]}>


      <div className='container my-5'>
        <form>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">Title</label>
              <input type="text" className="form-control" value={UpdateNoteData.Title} id="Title" name='Title' aria-describedby="emailHelp" onChange={changes} />
              <div id="emailHelp" className="form-text">We'll never share your Notes with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="Tag" className="form-label">Tag</label>
              <input type="text" placeholder="General" value={UpdateNoteData.Tag} className="form-control" id="Tag" name='Tag' aria-describedby="emailHelp" onChange={changes} />
            </div>
            <div className="mb-3">
              <label htmlFor="Discripation" className="form-label">Discripation</label>
              <input type="text" className="form-control" value={UpdateNoteData.Discripation} id="Discripation" name='Discripation' onChange={changes} />
            </div>
          </form>
      </div>


      </Modal>



    {(props.Notes.msg === "" && props.Notes.data.map((note) =>

        <div className="card my-3 mx-1 col rounded-4" key={note._id} style={{"width": "90vw"}}>
        <div className="card-body">
        <div className='d-flex align-items-center justify-content-between'>
        <h5 className="card-title text-uppercase my-3 text-start fw-bold fs-4">{note.title}</h5>
        <span>
        <i className="fa-solid fa-trash mx-2" onClick={() => delet(note._id)}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => showModal(note._id)}></i>
        </span>
        </div>
        <p className="card-text text-start fs-6 font-monospace">{note.descripation}</p>
        <p className="card-text text-start fs-6 font-monospace">{note.tag}</p>
        <p className="card-text text-start fs-6 fw-lighter">last Update on {note.date}</p>
        </div>
        </div>

   )) ||  
   (
        <div className="container my-5">
        <h2>{props.Notes.msg}</h2>
        </div> 
   ) 
      }
   </>
  )
};

export default Fetchnote
