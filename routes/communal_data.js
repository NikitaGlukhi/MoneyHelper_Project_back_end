const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter  = new FileSync('communalData.json');
const lodashId = require('lodash-id');

const communalRepository = require('../repos/communal_repository');

db = low(adapter);

const communal_repository = new communalRepository(db);

db._.mixin(lodashId);

const daily_waste_communal_collection = db
    .defaults({daily_waste_communal: []})
    .write();
const communalWaste = db.get('daily_waste_communal');
if(communalWaste.value().length === 0) {
    communalWaste.push({
        name: 'DailyCommunalWaste',
        communal_amount: 0,
        daily_waste: 0,
        total_waste: 0,
        remainder: 0,
        date: new Date()
    }).write();
}

router.put('/add-communal-daily-waste-data', (req, res) => {
    const waste = communal_repository.addCommunalData(
        req.body.all_communal_amount,
        req.body.all_communal_remainder
    );
    res.json(waste);
})

router.get('/get-distributed-communal-data', (req, res) => {
    const post = communal_repository.getCommunalData();
    res.json(post);
})

router.put('/add-communal-daily-waste-data-upd', (req, res) => {
    const post = communal_repository.addUpdateCommunalData(
        req.body.all_upd_communal_amount,
        req.body.all_upd_communal_daily_waste,
        req.body.all_upd_communal_total_waste,
        req.body.all_upd_communal_remainder,
        );
    res.json(post);
})

module.exports = router;