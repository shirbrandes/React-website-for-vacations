import { useEffect, useState } from "react";
import Edit from "./Edit";


export default function SingleVacation({ setUpdate, update, vacation, vacations, setVacation }) {


    const [counter, setcounter] = useState(false)
    const [editt, setEditt] = useState(false)



    useEffect(() => {
        fetch('http://localhost:1000/user/isfollow/' + vacation.id, {
            method: "get",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setcounter(data.following)
            })
    }, [vacations])


    const like = async () => {
        const res = await fetch(`http://localhost:1000/user/follow/` + vacation.id, {
            method: "post",
            credentials: "include"
        })
        const data = await res.json();
        if (data.length) {

            setVacation(data)
        }
        else {
            alert("something wrong")
        }
    }



    const remove = async () => {
        const res = await fetch(`http://localhost:1000/admin/` + vacation.id, {
            method: "delete",
            credentials: "include"
        })
        const data = await res.json();
        if (data.msg) {
            setVacation(vacations.filter(v => v.id != vacation.id))
            setUpdate(!update)
        }
        else {
            alert(data.err)
        }
    }

    const editX = () => {
        setEditt(!editt)
    }


    return (
        <div className="singleVacation">
            <h1>{vacation.destination}</h1>
            <h2>{vacation.description}</h2>
            <h2>price: {vacation.price}$</h2>
            <h2>From: {vacation.dateFrom.split("T")[0].split("-").reverse().join("-")}</h2>
            <h2>To: {vacation.dateUntill.split("T")[0].split("-").reverse().join("-")}</h2>
            {
                localStorage.role == "user" ?
                    <div className="btnlike">
                        <button onClick={like}>{vacation.followers} {counter == true ? "💖" : "🤍"}</button>
                    </div> :
                    <div className="btnEdit">
                        <button onClick={editX} >✍
                        </button>
                        <button onClick={remove}>✖</button>
                    </div>
            }

            {editt == true ?
                <Edit vacation={vacation} setUpdate={setUpdate} setEditt={setEditt} />
                : null
            }

            <img className="imgVac" src={vacation.img} />

        </div>
    )
}
