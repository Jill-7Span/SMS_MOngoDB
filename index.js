const router = require('./routes');
const env = require("./common/env");
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const path = require("path");
var util = require('util');
var vCard = require('vCard');
var card = new vCard();


// app.post("/test", async (req, res) => {
//     try {
//         const document = path.join(__dirname, "./temp/contacts.vcf")
//         card.readFile(document, function (err, json) {
//             console.log(util.inspect(json));
//         });
//     } catch (error) {
//         console.log('error: ', error);
//     }
// })



app.use('/api', router);

app.use('/', (req, res) => {
    res.status(400).json({ Message: "Invalid Route" });
});



app.listen(env.PORT, () => {

});
