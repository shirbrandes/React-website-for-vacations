const router = require('express').Router()
const {myQuery} = require('../db/config')

router.post('/addVacation', async (req, res)=>{
    try {
        const {destination, description, img, dateFrom,dateUntill, price } = req.body
        if (!destination || !description || !img || !dateFrom || !dateUntill || !price)
        {
            return res.status(400).send({err: "missing some info"})
        }
        const query = `insert into vacations (destination, description, img, dateFrom,dateUntill, price)
         values ("${req.body.destination}","${req.body.description}","${req.body.img}","${req.body.dateFrom}","${req.body.dateUntill}",${req.body.price})` 
        await myQuery(query)
        res.status(201).send({msg: "You add new vacation "})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


router.delete('/:vacationid', async (req,res)=> {
    try {
        const query2 = `delete FROM followers where vacationid=${req.params.vacationid}`
        await myQuery(query2)
        const query =`delete FROM vacations where id=${req.params.vacationid}`
        await myQuery(query)
        res.status(201).send({msg: "The vacation has been removed 🗑"})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


// שינוי\עריכת חופשה לפי vacationid
router.post('/edit/:vacationid', async (req, res)=>{
    try {
        const {destination, description, img, dateFrom,dateUntill, price } = req.body
        if (!destination || !description || !img || !dateFrom || !dateUntill || !price)
        {
            return res.status(400).send({err: "missing some info"})
        }
        const query = `update  vacations set destination="${destination}", description="${description}", img="${img}", dateFrom="${dateFrom}",dateUntill="${dateUntill}", price=${price}
        where id = ${req.params.vacationid}`
        await myQuery(query)
        
        res.status(201).send({msg: "You edit"})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/reports',async (req,res)=>{
    try {
        const query = `SELECT * FROM vacations WHERE followers > 0 `
        const vacations = await myQuery(query)
        if(!vacations.length){
            return res.send({msg:"no available vacations"})
        }else{
            return res.send(vacations)
        }
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})


module.exports=router;

