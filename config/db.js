const mongoose = require('mongoose');


module.exports = function connectToDB() {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.w35as.mongodb.net/epamShop?retryWrites=true&w=majority", {useNewUrlParser: true}, error => {
        if (error) {
            console.log('Unable to connect to database');
            throw error;
        } else {
            console.log('Connected to MongoDB!');
        }
    });
}
