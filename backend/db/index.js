const config = require('../config');
const { MongoClient } = require("mongodb");

const options = { useUnifiedTopology: true };
var db;

MongoClient.connect(config.MONGO_URL, options, async (err, client) => {
    if (!err) {
        console.log('Connection established to MongoDB.');

        db = await client.db(); // ou db = await client.db('myproject');
    } else {
        console.log('Not possible to stablish the connection to MongoDB.');
    }
})

module.exports = {
    
    register: (data, handler) => {
        db.collection('users').insertOne(data, (err, result) => {
            handler(err, result);
        })
    },

    signIn: (data, handler) => {
        db.collection('users').findOne({email: data.email, password: data.password}, (err, result) => {
            handler(err, result);
        })
        // handler(null, data)
    },

}