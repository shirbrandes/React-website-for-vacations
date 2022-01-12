import React, { useState } from 'react'
import SingleVacation from './SingleVacation'

export default function Find({ findX, vacations, setVacation, update, setUpdate }) {

    const [inpsearch, setinpsearch] = useState("")

    const [vacarr, setvacarr] = useState([])



    const findVacation = async () => {
        const res = await fetch(`http://localhost:1000/user/search/${inpsearch}`, {
            method: 'get',
            credentials: 'include'
        })
        const data = await res.json();
        if (data.msg) {
            //אל תציג את הדיב
            setvacarr(data.vacation)
        }
        else {
            alert(data.err)
        }
    }


    return (
        <div className="inputsearch">
            <div className="divbtnFindX">
                <button className='btnFindX' onClick={findX} >X</button>
            </div>
            <input type="text" placeholder="find a vacation" value={inpsearch} onChange={e => setinpsearch(e.target.value)} />
            <div className="findClear">
                <button onClick={findVacation} >Find</button>
                <button onClick={() => setinpsearch("")} >Clear</button>
            </div>



            <div className="findandshow">
                {vacarr.map(v => <SingleVacation vacation={v} vacations={vacations} setVacation={setVacation} update={update} setUpdate={setUpdate} />)}
            </div>

        </div>
    )

}
