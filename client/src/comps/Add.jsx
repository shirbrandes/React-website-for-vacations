import React, { useState } from 'react'

export default function Add({addX, setadd, setUpdate, vacation}) {

    const [destination, setdestination] = useState("")
    const [description, setdescription] =  useState("")
    const [img, setimg] =  useState("")
    const [dateFrom, setdateFrom] =  useState("")
    const [dateUntill, setdateUntill] =  useState("")
    const [price, setprice] =  useState("")
    

    const addaVacation = async () => {
        const res = await fetch('http://localhost:1000/admin/addVacation', {
            method: 'post',
            body: JSON.stringify({destination, description, img, dateFrom,dateUntill, price }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.json();
        if (data.msg) {
            //אל תציג את הדיב
            addX()
            setUpdate(update=>!update)
        }
        else
        {
            alert (data.err)
        }
    }


    
    return (
        <div className="addVacationDiv">
        <button onClick={addX} >X</button>
        <input type="text"  placeholder="destination" onChange={e => { setdestination(e.target.value) }} />
        <input type="text"  placeholder="description" onChange={e => { setdescription(e.target.value) }} />
        <input type="text" placeholder="photo" onChange={e => { setimg(e.target.value) }} />
        <input type="date" placeholder="dateFrom" onChange={e => { setdateFrom(e.target.value) }} />
        <input type="date"  placeholder="dateUntill" onChange={e => { setdateUntill(e.target.value) }} />
        <input type="number" placeholder="price" onChange={e => { setprice(e.target.value) }} />
        <button onClick={addaVacation} disabled={[destination, description, img, dateFrom,dateUntill, price].includes("")}> Add new vacation</button>
    </div>
    )
}
