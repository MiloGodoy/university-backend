const serviceModel = require('../models/servicesModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports.getServices = async (req, res) => {
    const _data = await serviceModel.find({})
    if(_data){
        return res.send({ code: 200, message: 'successful', data: _data })
    } else {
        return res.send({ code: 500, message: 'Service error'})
    }
}

module.exports.addServices = async(req, res) => {
    console.log(req.file, req.body, 16)

    if(!req.headers.authorization || req.headers.authorization === null) {
        return res.send({ code: 403, message: 'No Token'})
    } else {0

        try {
            const userDetail = await jwt.verify(req.headers.authorization, 'PRIV_123');
            
            if (!userDetail || !userDetail.type) {
                return res.send({ code: 403, message: 'Invalid Token Structure' });
            }
    
            console.log(userDetail.type, 19);
    
            if(userDetail.type !== 'SUBADMIN' && userDetail.type !== 'ADMIN') {
                return res.send ({ code: 403, message: 'Unauthorized.' });
            }
    
            if(userDetail.iat - new Date().getTime() > 3.6e+6) {
                return res.send({ code: 403, message: 'Token Expired'})
            }
    
            const title = req.body.title;
            const description = req.body.description;
            const imageUrl = req.file.path
    
            if(!title || !description || !imageUrl) {
                return res.send({ code: 400, message: 'Bad Request' });
            }
    
            const newService = new serviceModel({ title: title, description: description , imageUrl : imageUrl });
    
            const success = await newService.save();
    
            if(success) {
                return res.send({ code: 200, message: 'success' });
            } else {
                return res.send({ code: 500, message: 'Service error' });
            }
        } catch (error) {
            return res.send({ code: 500, message: 'Error verifying token' });
        }
    }
    
}


module.exports.getSlider = (req, res) => {
    
    const url1 = 'https://www.sudamericana.edu.py/wp-content/uploads/2024/01/universidad-sudamericana-cumpli-tus-suenos-desk.png'
    const url2 = 'https://www.sudamericana.edu.py/wp-content/uploads/2024/01/universidad-sudamericana-atencion-profesional-1-desk-jpg.webp'
    const url3 = 'https://www.sudamericana.edu.py/wp-content/uploads/2024/01/universidad-sudamericana-extension-sudamericana-mesa-de-trabajo-1-desk-2048x613.webp'
    const url4 = 'https://www.sudamericana.edu.py/wp-content/uploads/2024/01/universidad-sudamericana-beeteller-desk.png'
    
    const arr = [url1, url2, url3, url4]
    return res.send({ code: 200, message: 'success', data: arr })
}