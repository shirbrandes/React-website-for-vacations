import React, { useState } from 'react'
import {useHistory} from 'react-router'


export default function Login() {

    const history = useHistory();


    const [userName, setusername] = useState("")
    const [password, setpassword] = useState("")

    const login = async () => {
        const res = await fetch('http://localhost:1000/user/login', {
            method: 'post',
            body: JSON.stringify({ userName, password }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.json();

        if (data.user) {
            localStorage.userName = data.user.userName;
            localStorage.role = data.user.role;
            history.push('/vacations') 
        }
        else
        {
            alert (data.err)
        }
    }

    return (
        <div className="login-register">
            <div className="h1welcome">
                <h1>Welcome Guest</h1>
            </div>
            <input type="text" placeholder="username" onChange={e => {
                setusername(e.target.value)
            }} />
            <input type="password" placeholder="password" onChange={e => {
                setpassword(e.target.value)
            }} />
            <a href="/register">Don't have an acount yet?</a>
            <button disabled={[userName,password].includes("")} onClick={login}>Login</button>
        </div>
    )
}
