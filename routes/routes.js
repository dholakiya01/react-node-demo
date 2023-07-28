const express = require('express')
const router = (express.Router())
const bcrypt = require('bcrypt')
const { postnew, putuser, profileget, validationEmail, LoginApi, joindata, ProfilePut, feedback, feedbackget, listuser, profilepost } = require('../function/function')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken = require('../auth/auth');


//Join
router.get('/get', verifyToken, async (req, res) => {
    try {
        const users = await joindata()
        res.json(users)
    }
    catch (err) {
        res.json(err)
    }
})
router.get('/list/get', async (req, res) => {
    try {
        const users = await joindata()
        res.json(users)
    }
    catch (err) {
        res.json(err)
    }
})


//Login api
router.post('/post/login', async (req, res) => {
    try {
        const { name, password } = req.body
        const data = await LoginApi(name, password)
        console.log(name)
        res.status(201).json(data)
    }
    catch (err) {
        res.status(401).json({ status: false, err: err.message })
    }
})

//Register api
router.post('/post', async (req, res) => {
    try {
        const { name, email, password } = req.body

        let emailvalidation = await validationEmail(email)
        console.log(emailvalidation)

        const hashpassword = await bcrypt.hash(password, 10);

        if (emailvalidation) {
            const user = await postnew(name, email, hashpassword)
            res.status(201).json({ status: true, message: "Registration success", user: user })
        } else {
            res.status(201).json({ status: false, message: "something went wrong/email alrady exists." });
        }

    } catch (err) {
        res.status(500).json({ status: false, err: err.message })
    }
})


router.put('/put', async (req, res) => {
    try {
        const { id, name, email, password } = req.body

        const hashpassword = await bcrypt.hash(password, 15)
        console.log(hashpassword)
        const user = await putuser(id, name, email, hashpassword)
        res.json({ user: user, status: 'data update' })
    }
    catch (err) {
        res.json({ err: err.message })
    }
})


//profile get

router.put('/profile/put', async (req, res) => {
    try {
        const { id, name, email, hobbies } = req.body

        const user = await ProfilePut(id, name, email, hobbies)
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.get('/profile/get', async (req, res) => {
    try {
        const user = await profileget()
        res.json(user)
    }
    catch (err) {
        res.json(err)
    }
})
router.post('/profile/post', async (req, res) => {
    try {
        const { hobbies } = req.body
        const user = await profilepost(hobbies)
        res.json(user)
    }
    catch (err) {
        res.json(err)
    }
})

//feedback

router.get("/feedback/get", async (req, res) => {
    try {
        const user = await feedbackget()
        res.json(user)

    } catch (Err) {
        console.log(Err)
        res.status(500).json({ Err: Err.message })
    }
})
router.post('/feedback/post', async (req, res) => {
    try {
        const { name, email, message } = req.body
        const user = await feedback(name, email, message)
        res.json(user)

    } catch (Err) {
        console.log(Err)
        res.status(500).json({ Err: Err.message })
    }
})

//List data
router.post('/user/list', async (req, res) => {
    try {
        const { page, limit, searchterm } = req.body
        const user = await listuser(page, limit, searchterm)
        res.json(user)

    } catch (err) {
        res.json(err)
    }
})
module.exports = router 