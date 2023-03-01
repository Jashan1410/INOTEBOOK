import React,{ useContext , useEffect } from 'react'
import Fetchnote from './Fetchnote';
import Notecontext from '../context/Notes/NoteContext';

export default function NoteItems() {

  const Contextdata = useContext(Notecontext);
  const { Notes, Fetchnotes } = Contextdata;

  useEffect(() => {
    Fetchnotes();
  } , [ Fetchnote ]);

  return (
    <>
      <div className='container my-5 py-3'>
      <h2>Your Notes</h2>
      <div className="container text-center">
      <div className="row row-cols-2 justify-content-between">
            <Fetchnote Notes={Notes}></Fetchnote>
      </div>
      </div>
      </div>
    </>
  )
}
