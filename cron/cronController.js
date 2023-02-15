const test = require("./test");
const cron = require("node-cron");
const express = require("express");
const sms = require("../sms/smsController");

exports.cronSchedular = (req, res) => {
    const { sec, min, hrs, day, month, dow, message } = req.body;

    const newJob = cron.schedule(`${sec} */${min} */${hrs} */${day} */${month} */${dow}`, () => {
        console.log("---------------------");
        test.sms(message);
         
        sms.test(req,res)
    });
};


