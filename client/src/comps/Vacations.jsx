import React, { useEffect, useState } from 'react'
import SingleVacation from './SingleVacation'
import { useHistory } from 'react-router'
import Find from './Find';
import Add from './Add';

export default function Vacations() {

    const history = useHistory();

    const [vacation, setVacation] = useState([])

    const [update, setUpdate] = useState(false);
    const [add, setadd] = useState(false)
    
    const [find, setfind] = useState(false)


    useEffect(() => {
        fetch('http://localhost:1000/user/mylist', {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setVacation(data))
    }, [update])

    const logout = async () => {
        const res = await fetch('http://localhost:1000/user/logout', {
            method: 'delete',
            credentials: 'include'
        })
        await res.json();
        localStorage.userName = "";
        localStorage.role = "";
        history.push('/')
    }

    const addX = () => {
        setadd(!add)
    }

    const findX = () => {
        setfind(!find)
    }

    

    return (
        <div>
            <marquee>Fly4You- Cheap flights, excellent service!</marquee>
            <div className="welcomeuser"><h1>Welcome {localStorage.userName}</h1></div>

            <div className="search"><button onClick={findX}>🔍</button></div>

            <div className="logoutbtn" >
                <button onClick={logout} >Logout</button></div>
            <div>
                {localStorage.role == "admin" ?
                    <div className="reportbtn">
                        <button onClick={() => history.push("/reports")} >Report📊</button>
                        <button onClick={addX}>➕</button>
                    </div> : ""}
            </div>
            {vacation.length ? vacation.map(v => <SingleVacation setUpdate={setUpdate} update={update} vacation={v} vacations={vacation} setVacation={setVacation} />) : ""}

            {add == true ? <Add addX={addX} setadd={setadd} setUpdate={setUpdate} vacation={vacation} /> : ""}
            {find == true ? <Find findX={findX} update={update} setUpdate={setUpdate} vacations={vacation} setVacation={setVacation} /> : ""}
        </div>


    )
}
