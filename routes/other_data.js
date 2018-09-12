const express = require('express');
const router = express.Router();
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter  = new FileSync('otherData.json');
const lodashId = require('lodash-id');
const otherRepository = require('../repos/other_repository');

db = low(adapter);

const other_repository = new otherRepository(db);

db._.mixin(lodashId);

const daily_waste_other_collection = db
    .defaults({daily_waste_other: []})
    .write();
const otherWaste = db.get('daily_waste_other');
if(otherWaste.value().length === 0) {
    otherWaste.push({
        name: 'DailyOtherWaste',
        other_amount: 0,
        daily_waste: 0,
        total_waste: 0,
        remainder: 0,
        date: new Date()
    }).write();
}

router.put('/add-daily-waste-other-data', (req, res) => {
    let post = other_repository.addOtherData(req.body.all_other_amount, req.body.all_other_reminder)
    res.json(post);
})

router.put('/add-daily-waste-other-data-upd', (req, res) => {
    let post = other_repository.addUpdateOtherData(
        req.body.all_upd_other_amount,
        req.body.all_upd_other_daily_waste,
        req.body.all_upd_other_total_waste,
        req.body.all_upd_other_remainder
    );
    res.json(post);
})

router.get('/get-distributed-other-data', (req, res) => {
    let post = other_repository.getOtherData();
    res.json(post);
})

module.exports = router;