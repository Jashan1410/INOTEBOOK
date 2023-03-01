import React, { useContext , useState , useEffect } from 'react';
import { Link, useLocation , useNavigate } from "react-router-dom";
import Notecontext from '../context/Notes/NoteContext';
import Alertcompunent from './Alert';
import axios from "axios";


const Navbar = () => {

    const [showname, setshowname] = useState("there");
    const [session, setsession] = useState("ddemo");
    let location = useLocation();
    const Contextdata = useContext(Notecontext);
    const { SignOut , Alert } = Contextdata;
    let navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem('Token')){
        setsession("LogOut");
        getname();
    }
    else{
        setsession("LogIn")
        setshowname("there")
    }
  }, [ localStorage.getItem('Token') , showname ]);

  const getname = async () => {

    if(localStorage.getItem('Token')){

        const respose = await axios.get(`http://localhost:5000/api/auth/authication` , {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('Token')
            }
        })
       const json = await respose.data;
       var string = json.user.name
       var name = string.charAt(0).toUpperCase() + string.slice(1);
       setshowname(name);
    }

  }


  const hundlebutton = () => {
        if(localStorage.getItem('Token')){
            SignOut();
        }
        else{
            navigate("/Login");
        }
  }


  return (
    <>      <div>
            <nav className="navbar  fixed-top  navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                NoteBook
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className={`nav-link ${ location.pathname==="/" ? "active" : "" }`} aria-current="page" to={"/"}>Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${ location.pathname==="/Notes" ? "active" : "" }`} to={"/Notes"}>Notes</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${ location.pathname==="/About" ? "active" : "" }`} to={"/About"}>About</Link>
                        </li>

                    </ul>

                    <button type="button" className="btn btn-primary" onClick={hundlebutton} >{session}</button>

                </div>
            </div>
        </nav>
        </div>
        <div className="container" style={{"height": "3vw" , "marginTop" : "4rem" , "marginBottom" : "1rem" }}>
        <Alertcompunent alert={Alert}/>
        <h2 className='position-absolute'  style={{"top": "10%" , "right" : "3%" }}>Hi {showname}</h2>
        </div>
    </>
  );
};

export default Navbar;
