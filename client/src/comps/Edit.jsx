import React, { useState } from 'react'

export default function Edit({vacation, setUpdate, setEditt}) {

    const [destination, setdestination] = useState(vacation.destination)
    const [description, setdescription] = useState(vacation.description)
    const [img, setimg] = useState(vacation.img)
    const [dateFrom, setdateFrom] = useState(new Date(vacation.dateFrom).toLocaleDateString('en-IL').split("/").reverse().join("-"))
    const [dateUntill, setdateUntill] = useState(new Date(vacation.dateUntill).toLocaleDateString('en-IL').split("/").reverse().join("-"))
    const [price, setprice] = useState(vacation.price)



    const saveContinue = async () => {
        const res = await fetch('http://localhost:1000/admin/edit/'+vacation.id, {
            method: 'post',
            body: JSON.stringify({destination, description, img, dateFrom,dateUntill, price }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include' 
        })
        const data = await res.json(); 
        if (data.msg) {
            setEditt(false);
            setUpdate(update=>!update);
        }
        else
        {
            alert (data.err)
        }
    }

    return (
        <div className="editdiv">
            <button className="editxbtn" onClick={()=>setEditt(false)}>X</button>
            <input type="text" value={destination} placeholder="destination" onChange={e => { setdestination(e.target.value) }} />
            <input type="text" value={description} placeholder="description" onChange={e => { setdescription(e.target.value) }} />
            <input type="text" value={img} placeholder="photo" onChange={e => { setimg(e.target.value) }} />
            <input type="date" value={dateFrom} placeholder="dateFrom" onChange={e => { setdateFrom(e.target.value) }} />
            <input type="date" value={dateUntill} placeholder="dateUntill" onChange={e => { setdateUntill(e.target.value) }} />
            <input type="number" value={price} placeholder="price" onChange={e => { setprice(e.target.value) }} />
            <button  disabled={[destination, description, img, dateFrom,dateUntill, price].includes("")} onClick={saveContinue} >Save and Continue</button>
        </div>
    )
}
