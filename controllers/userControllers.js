const mongoose = require('mongoose')
const modelUser = require('../models/User')
const { createToken } = require('../security/authAccess')
const bcrypt = require ('bcryptjs')
const { sign, verify } = require ('jsonwebtoken')

const createUser = async (req, res) => {
    const newUser = new modelUser(req.body)
    await newUser.save() //SAVES THE NEWLY REGISTERED USER ON THE DATABASE
    const payload = {...newUser._doc}
        await delete payload.password
        await sign(payload, process.env.JWT_KEY,{}, async (err, token)=>{
           await err ? res.json({error:'UNAUTHORIZED'}) : await res.cookie('access_token', token).send()
        })
}

//HANDLES USER LOGIN
const loginUser =  async (req, res) => {
    const {email, password} = req.body
    const loginUser = await modelUser.findOne({ email }).exec()

    if(loginUser && password === loginUser.password){
        const payload = {...loginUser._doc}
        await delete payload.password
        await sign(payload, process.env.JWT_KEY,{}, async (err, token)=>{
           await err ? res.json({error:'UNAUTHORIZED'}) : await res.cookie('access_token', token).send()
        })   
    }
    else res.json({error:'INVALID EMAIL OR PASSWORD'})
}

//CHECKS IF USER IS LOGGED IN
const loginStatus = async (req, res)=>{
    const token = await req.cookies.access_token
    
    token ? await verify (token,process.env.JWT_KEY,(err,user)=>{
        err ? res.send(null) : res.send(user)
    }) : res.send(null)
}

const addTargets = async (req, res)=>{
    const targetSetter = await modelUser.findById(req.params.id)
    await targetSetter?.targets?.push(req.body)
    await targetSetter.save()
}
const getTargetPage = async (req, res)=>{
    const targetSetter = await modelUser.findById(req.params.id)
    res.send(targetSetter)
}

const getDashboard = async(req, res)=>{
    const displayData = await modelUser.findById(req.params.id)
    res.send(displayData)
}
const addScores = async (req, res)=>{
    const {id, kpi} = req.params
    const scoredUser = await modelUser.findById(id)
    await scoredUser?.actuals?.push(req.body)
    await scoredUser.save()
}
const getScores = async (req, res)=>{
    const {id, target, kpi} = req.params
    const scoredUser = await modelUser.findById(id)
    const filteredScores = scoredUser.actuals?.filter(score=>score.kpi === kpi)
    res.send(filteredScores)
 }

module.exports = { createUser , loginUser, loginStatus, addTargets, getTargetPage, getDashboard, addScores, getScores}
