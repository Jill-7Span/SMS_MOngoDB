const test = require("./test");
const cron = require("node-cron");
const express = require("express");

exports.cronSchedular = (req,res) => {
    const { sec, min, hrs, day, month, dow } = req.body;
    // const sec = "5";
    // const min = "";
    // const hrs = "";
    // const day = "";
    // const month = "";
    // const dow = "";
    cron.schedule(`*/${sec} */${min} */${hrs} */${day} */${month} */${dow}`, () => {
        console.log("---------------------");
        test.test("hello");
        res.send("hello");

    });
}