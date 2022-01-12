const router = require('express').Router()
const { myQuery } = require('../db/config')

router.post('/register', async (req, res) => {

    try {
        const { firstName, lastName, userName, password } = req.body
        if (!firstName || !lastName || !userName || !password) {
            return res.status(400).send("missing some info")
        }
        const query = `select userName from users where userName = "${userName}"`
        const user = await myQuery(query)

        if (user.length)
            return res.status(400).send({ err: "This username is already taken. Please choose another" })

        await myQuery(`insert into users(firstName,lastName,userName,password) values ("${firstName}","${lastName}","${userName}","${password}") `)
        res.status(201).send({ msg: "You signed up" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body
        if (!userName || !password) {
            return res.status(400).send({ err: "missing some info" })
        }
        const query = `SELECT * FROM users where userName="${userName}" and password = "${password}"`
        const someuser = await myQuery(query)
        if (!someuser.length) {
            return res.status(400).send({ err: "wrong user name or password" })
        }
        req.session.userName = someuser[0].userName
        req.session.password = someuser[0].password
        req.session.userid = someuser[0].id
        req.session.role = someuser[0].role

        res.send({ msg: "You log in. Welcome 😀", user: someuser[0] })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// בדיקה האם המשתמש עוקב ברענון
router.get('/isfollow/:vacationid', async (req, res) => {
    try {
        const userid = req.session.userid;
        const vacationid = req.params.vacationid;

        const query = `SELECT * FROM followers WHERE userid = ${userid} AND vacationid = ${vacationid}`;
        const followed = await myQuery(query);

        if(followed.length) {
            return res.send({following : true});
        }
        else {
            return res.send({following : false});
        }
     
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})


//הוספת עוקב לחופשה או הסרת עוקב מחופשה
router.post('/follow/:vacationid', async (req, res) => {
    try {
        const userid = req.session.userid;
        const vacationid = req.params.vacationid;

         const query = `SELECT * FROM followers WHERE userid=${userid} AND vacationid=${vacationid}`;
         const followed = await myQuery(query);

         if(followed.length) {
            const query1 = `UPDATE vacations SET followers = followers - 1 WHERE id = ${vacationid}`;
            await myQuery(query1);
            const query2 = `DELETE FROM followers WHERE userid = ${userid} AND vacationid = ${vacationid}`;
            await myQuery(query2)
         }
         else {
            const query1= `UPDATE vacations SET followers = followers + 1 WHERE id = ${vacationid}`
            await myQuery(query1);
            const query2 = `INSERT INTO followers(userid,vacationid) VALUES (${userid},${vacationid})`;
            await myQuery(query2);
         }

        const query1 = `SELECT * FROM followers INNER JOIN vacations ON followers.vacationId = vacations.id WHERE followers.userId = ${userid}`;
        const followedVac = await myQuery(query1);

        const query2 = `SELECT * FROM vacations`;
        const allVacations = await myQuery(query2);

        if (followedVac.length) {
            const followedId = followedVac.map(vac => { return vac.id });

            const notFollowed = allVacations.filter(vac => !followedId.includes(vac.id));

            const sorted = [...followedVac, ...notFollowed];
            return res.send(sorted);
        }
        else {
            return res.send(allVacations);
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ err })
    }
})


router.get('/mylist', async (req, res) => {
    try {

        const userId = req.session.userid;

        const query1 = `SELECT * FROM followers INNER JOIN vacations ON followers.vacationId = vacations.id WHERE followers.userId = ${userId}`;
        const followed = await myQuery(query1);

        const query2 = `SELECT * FROM vacations`;
        const allVacations = await myQuery(query2);

        if (followed.length) {
            const followedId = followed.map(vacation => { return vacation.id });

            const notFollowed = allVacations.filter(vacation => !followedId.includes(vacation.id));

            const sorted = [...followed, ...notFollowed];
            return res.send(sorted);
        }
        else {
            return res.send(allVacations);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
// חיפוש חופשה
router.get('/search/:destination', async (req, res) => {
    try {
        const destination = req.params.destination;
        const vacation = await myQuery(`select * from vacations where destination like "%${destination}%"`)
        if (!vacation.length)
            return res.status(201).send({ err: "destination not found" })
        else {
            return res.status(200).send({msg:"destination found",vacation})
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete('/logout', (req, res) => {
    req.session.destroy()
    res.send({ msg: "You logged out 👋" })
})

module.exports = router;

