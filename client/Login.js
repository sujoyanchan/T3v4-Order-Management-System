import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const nav=useNavigate();
    const rUsername=useRef();

    const [username, setUsername ]=useState('');
    const [password, setPassword]=useState('');

    const hUsername=(event)=>{setUsername(event.target.value)};
    const hPassword=(event)=>{setPassword(event.target.value)};

    const login=(event)=>{
        event.preventDefault();
        let data={username,password};
        let url='http://localhost:9000/login';
        axios.post(url, data)
        .then(res =>{
            console.log(res);
            if (res.data.length === 1)
            {
                nav('/home');
                window.location.reload();
                localStorage.setItem('un', username);
            }
            else{
                alert('invalid credentials');
                setUsername('');
                setPassword('');
                rUsername.current.focus();
            }
        })

    }

return(
    <>
    <center>
        <form>
            <h1>Login Page</h1>
            <input type="text" placeholder="enter admin username"
            onChange={hUsername} value={username} ref={rUsername}
            />
            <br/><br/>
            <input type="password" placeholder="enter admin password"
            onChange={hPassword} value={password}
            />
            <br/><br/>
            <button onClick={login} type="button" className="btn">Login</button>
        </form>
    </center>
    </>

);
}