const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Admin-Panel");

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Db connected");
})

module.exports = db