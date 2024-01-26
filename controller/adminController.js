const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')

module.exports.getAdmins = async (req, res) => {
    const _data = await adminModel.find({})
    if(_data){
        return res.send({ code: 200, message: 'successful', data: _data })
    } else {
        return res.send({ code: 500, message: 'Service error'})
    }
}

module.exports.addAdmins = async (req, res) => {

    const { userName, password, type, status, date } = req.body

    const _res = await adminModel.create({ userName, password, type, status, date })
    if(_res){
        return res.send({ code: 200, message: 'successful'})
    } else {
        return res.send({ code: 500, message: 'Service error'})
    }
}

module.exports.loginAdmin = async(req, res) => {
    const {userName, password} = req.body
    const userExists = await adminModel.findOne({ userName : userName })

    if(userExists) {
        if (userExists.password !== password) {
            return res.send({ code: 400, message: 'Username or Password wrong'})
        }
            console.log(userExists, 34)
            const token = jwt.sign(userExists.toObject(), 'PRIV_123')

            return res.send({ 
                code: 200, 
                message: 'Login success', 
                token: token, 
                type : userExists.type 
            })
    } else {
        return res.send({ code: 500, message: 'Service error'})
    }
}

