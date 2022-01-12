import React, { useState } from 'react'
import { useHistory } from 'react-router'

export default function Register() {

    const history = useHistory();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setpassword] = useState("")

    const register = async () => {
        const res = await fetch('http://localhost:1000/user/register', {
            method: 'post',
            body: JSON.stringify({ firstName, lastName, userName, password }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.json();
        console.log(data)
        if (data.msg) {
            history.push("/")
        }
    }


    return (
        <div className="login-register">
            <div className="h1welcome">
                <h1>Welcome Guest</h1>
            </div>
            <input type="text" placeholder="first name" onChange={e => {
                setFirstName(e.target.value)
            }} />
            <input type="text" placeholder="last name" onChange={e => {
                setLastName(e.target.value)
            }} />
            <input type="text" placeholder="username" onChange={e => {
                setUserName(e.target.value)
            }} />
            <input type="password" placeholder="password" onChange={e => {
                setpassword(e.target.value)
            }} />
            <a href="/">Already have an acount?</a>
            <button disabled={[firstName, lastName, userName, password].includes("")} onClick={register}>Register</button>
        </div>
    )
}
