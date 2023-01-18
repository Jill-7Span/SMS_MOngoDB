const router = require('./routes');
const env = require("./common/env");
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

app.use('/', (req, res) => {
    res.status(400).json({ Message: "Invalid Route" });
});


app.listen(env.PORT, () => {

});
