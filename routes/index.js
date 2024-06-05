const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage();

router.get('/register', (req, res) => {
    res.send('register');
});

module.exports = router;