const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const servicesController = require('./controller/servicesController')
const adminController = require('./controller/adminController')
const app = express();
const multer = require('multer' )

const upload = multer({ dest: 'uploads/' })
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

mongoose.connect('mongodb://127.0.0.1:27017/test');


const db = mongoose.connection;

db.on('error', (err) => {
    console.error('DB Connection Error:', err);
});

db.once('open', () => {
    console.log('DB Connected.');
});

app.get('/hello', (req, res) => {
    return res.send('Hello');
});

app.post('/api/services', upload.single('image'), servicesController.addServices)
app.get('/api/services', servicesController.getServices)
app.get('/api/slider', servicesController.getSlider)

app.get('/admin/admins', adminController.getAdmins)
app.post('/admin/login', adminController.loginAdmin)



app.listen(5000, () => {
    console.log(`Backend Running At Port 5000`);
});
