const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const upload = require('../services/image-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', UserController.authMiddleware, function(req, res) {
    singleUpload(req, res, function(err) {
        if(err) {
            return res.status(422).send({error: [{title: 'Image Upload Error', detail: err.message}]});
        }
        console.log('my image');
        return res.json({'imageUrl': req.file.location});
    })
})

module.exports = router;