const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter  = new FileSync('transportData.json');
const lodashId = require('lodash-id');

const transportRepository = require('../repos/transport_repository');

db = low(adapter);

const transport_repository = new transportRepository(db);

db._.mixin(lodashId);

const daily_waste_transport_collection = db
    .defaults({daily_waste_transport: []})
    .write();
const transportWaste = db.get('daily_waste_transport');
if(transportWaste.value().length === 0) {
    transportWaste.push({
        name: 'DailyTransportWaste',
        transport_amount: 0,
        daily_waste: 0,
        total_waste: 0,
        remainder: 0,
        date: new Date()
    }).write();
}

router.put('/add-daily-waste-transport-data', (req, res) => {
    let waste = transport_repository.addTransportData(
        req.body.all_transport_amount,
        req.body.all_transport_remainder
    );
    res.json(waste);
})

router.get('/get-distributed-transport-data', (req, res) => {
    let post = transport_repository.getTransportData();
    res.json(post);
})

router.put('/add-daily-waste-transport-data-upd', (req, res) => {
    let post = transport_repository.addUpdateTransportData(
            req.body.all_upd_transport_amount,
            req.body.all_upd_transport_daily_waste,
            req.body.all_upd_transport_total_waste,
            req.body.all_upd_transport_remainder
    );
    res.json(post);
})

module.exports = router;