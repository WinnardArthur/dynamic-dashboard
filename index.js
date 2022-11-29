const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Port = process.env.PORT || 5000;
const app = express()

const Stats = require("./models/Stats");

require('dotenv').config();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true     
}).then(() => console.log('Database Connected'))
    .catch(err => console.log('An error occured: ', err))


app.get("/api/:id", async (req, res) => {
    let type = req.params.id;

    try {
        const data = await Stats.aggregate([
            {$group: {
                _id: { name: `$${type}` },
                total: { $sum: parseInt(1) } 
            }},
            {$sort: {"_id.name": 1}}
        ])

    
        res.json({data})
    } catch (error) {
        console.log('An error occured', error)
    }
})


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirnamen + "/client/build"))
    
    app.get("*", (req, res) => {
        res.sendFile(__dirname + "/client/build/index.html")
    })
} else {
    app.get("/", (req, res) => {
        res.send("API Running successfully")
    })
}


app.listen(Port, () => {
    console.log(`Server running on port ${Port}`)
})
