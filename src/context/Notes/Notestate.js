import React, { useState } from "react";
import NoteContext from "./NoteContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notestate = (props) => {

  const [Alert, setAlert] = useState(null);
  const [Notes, setNotes] = useState({"msg":"","data":[]});
  const host = "http://localhost:5000";
  let navigate = useNavigate();

  // collback funcation for showalert for set masg and type and alert for send prop to alert compunent

        const showalert = (message, type) => {
            setAlert({
            msg: message,
            type: type,
            });
            setTimeout(() => {
            setAlert(null);
            }, 3000);
        };

//  SignOut funcation 

        const SignOut = () => {
          try {       
            localStorage.clear();
            navigate("/Login");
            showalert("SignOut Succesfully","success")
          } catch (error) {
            showalert("error in SignOut","warning")         
          }
        }

//  Login funcation 

      const LoginFn = async (email,password) => {

        try {

        var data = { 
          'email': email,
          'password': password
         };

         const customConfig = {
          headers: {
            'Content-Type': 'application/json',
          }
         };
         const respose = await axios.post(`${host}/api/auth/login`,data, customConfig);
         const json = await respose.data;
         if (json.error === "false") {
            localStorage.setItem('Token', json.token);
            navigate("/");
            showalert("Login Succesfully","success")
         }   
          
        } catch (error) {
          showalert(error.response.data.msg,"danger")
        }
   
      }

//  SignUP funcation 

      const SignUpFn = async (name,email,password) => {

        try{

        var data = { 
          'name': name,
          'email': email,
          'password':password

         };

         const customConfig = {
          headers: {
            'Content-Type': 'application/json',
          }
         };

         
        const respose = await axios.post(`${host}/api/auth/signup`,data, customConfig);
        const json = await respose.data;
        if (json.error === "false") {
          localStorage.setItem('Token', json.token);
          navigate("/");
          showalert("SignUp Succesfully","success")
       }    
          
        } catch (error) {
          showalert(error.response.data.msg,"danger")
        }



      };


  //  callback funcation for add note to note array
  
  const addnote = async (Title, Discripation, Tag) => {

    if ( localStorage.getItem('Token')) {

    try{

      if(Title && Discripation){

        var data = { 
          'title': Title,
          'descripation': Discripation,
          'tag': Tag,
         };

         const customConfig = {
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('Token')
          }
         };

         const respose = await axios.post(`${host}/api/notes/createNotes`, data, customConfig);
         const json = await respose.data;
         showalert(json.msg,"success")

        Fetchnotes();
      }


    } catch (error) {
      showalert(error.response.data.msg,"danger")
    }

    } else{
        showalert("Please Login to Add your note","warning")
      }


};

  //  callback funcation for fetch user notes
  
  const Fetchnotes = async () => {

    try{

    if ( localStorage.getItem('Token')) {

        const respose = await axios.get(`${host}/api/notes/fetchNotes`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('Token')
            }
        })

        const json = await respose.data

        if (json.msg) {
          setNotes({"msg":json.msg,"data":null})
        } else {
          setNotes({"msg":"","data":json})
        }       
      } else{
        setNotes({"msg":"Please Login to view your notes","data":null})
      }

    } catch (error) {
      setNotes({"msg":"ERROR","data":[]})
      showalert(error.response.data.msg,"danger")
    }

  };  
    
    //  callback funcation for delet note to note array

    const Deletnote = async (id) => {

      try{

      const respose = await axios.delete(`${host}/api/notes/deleteNotes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('Token')
            }
          })
          const json = await respose.data;

          showalert(json.msg,"success")

          Fetchnotes();

        } catch (error) {
          showalert(error.response.data.msg,"danger")
        }
    }


    //  callback funcation for Update note to note array

    const UpdateNote = async ( id ,Title, Discripation, Tag) => {

      try{

      let Simplenote = {};

      for (let index = 0; index < Notes.length; index++) {
        const element = Notes[index];
        if (element._id === id) {
            Simplenote = element ;
          }
        }

      const usersName = JSON.stringify({ 
          title : Title ? Title : Simplenote.title ,
          descripation : Discripation ? Discripation : Simplenote.descripation ,
          tag : Tag ? Tag : Simplenote.tag
       });

       const customConfig = {

        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('Token')
        }
       };

       const respose = await axios.put(`${host}/api/notes/updateNotes/${id}`, usersName, customConfig  );

       const json = await respose.data;

       showalert(json.msg,"primary")

        } catch (error) {
          showalert(error.response.data.msg,"danger")
        }
            
};


    
    
    return (
            <NoteContext.Provider
            value={{ Notes, Alert, showalert, addnote ,UpdateNote , Deletnote , Fetchnotes , SignUpFn , LoginFn , SignOut }}>
            {props.children}
            </NoteContext.Provider>
        );
};

export default Notestate;
