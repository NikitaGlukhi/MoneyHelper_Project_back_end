var express = require('express');
var router = express.Router();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('moneyInfo.json');
var lodashId = require('lodash-id');

db = low(adapter);

db._.mixin(lodashId);

var initial_collection = db
    .defaults({ initial_data: [] })
    .get('initial_data');

var allocation_collection = db
    .defaults({ allocated_data: [] })
    .get('allocated_data');

// daily_waste_food
var daily_waste_food_collection = db
    .defaults({daily_waste_food: []})
    .write();
var foodWaste = db.get('daily_waste_food');
if(foodWaste.value().length === 0) {
    foodWaste.push({
        name: 'DailyFoodWaste',
        food_amount: 0,
        daily_waste: 0,
        total_waste: 0,
        remainder: 0,
        date: new Date()
    }).write();
}

// daily_waste_communal
var daily_waste_communal_collection = db
    .defaults({daily_waste_communal: []})
    .write();
var communalWaste = db.get('daily_waste_communal');
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

// daily_waste_transport
var daily_waste_transport_collection = db
    .defaults({daily_waste_transport: []})
    .write();
let transportWaste = db.get('daily_waste_transport');
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


// daily_waste_other
var daily_waste_other_collection = db
    .defaults({daily_waste_other: []})
    .write();
let otherWaste = db.get('daily_waste_other');
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

router.post('/set-initial-data', (req, res) => {
    console.log(req.body);
    let newPost = initial_collection
      .insert({ date: req.body.all_date, amount: req.body.all_amount }).write();
    let post = initial_collection
        .getById(newPost.id)
        .value();
    res.json(newPost.id);
    res.end('OK');
});

router.post('/set-distributed-data', (req, res) => {
    let newPost = allocation_collection
        .insert({
            initial_id: req.body.initial_id,
            food: req.body.all_food,
            communal: req.body.all_communal,
            transport: req.body.all_transport,
            other: req.body.all_other
        }).write();
    let post = allocation_collection
        .getById(newPost.id)
        .value();
    res.json(newPost);
    res.end('OK');
})

//FOOD
router.put('/add-food-daily-waste-data', (req, res) => {
    console.log(req.body);
    let waste = db.get('daily_waste_food').find({name: 'DailyFoodWaste'});
    waste.assign({
        food_amount: req.body.all_food_amount,
        daily_waste: 0,
        total_waste:0,
        remainder: req.body.all_remainder}).write();
    res.json(waste);
    res.end('OK');
})

router.get('/get-distributed-food-data', (req, res) => {
    let post = db.get('daily_waste_food')
        .reverse()
        .take(1)
        .value()
    res.json(post);
    res.end('OK');
})

router.put('/add-daily-waste-food-upd', (req, res) => {
    let post = db.get('daily_waste_food').find({name: 'DailyFoodWaste'});
        post.assign({
            food_amount: req.body.all_upd_food_amount,
            daily_waste: req.body.all_upd_daily_waste,
            total_waste: req.body.all_upd_total_waste,
            remainder: req.body.all_upd_remainder,
            date: new Date()}).write()
    res.json(post);
    res.end('OK');
})



//COMMUNAL
router.put('/add-communal-daily-waste-data', (req, res) => {
    console.log(req.body);
    let waste = db.get('daily_waste_communal').find({name: 'DailyCommunalWaste'});
    waste.assign({
        communal_amount: req.body.all_communal_amount,
        daily_waste: 0,
        total_waste:0,
        remainder: req.body.all_communal_remainder}).write();
    res.json(waste);
    res.end('OK');
})

router.get('/get-distributed-communal-data', (req, res) => {
    let post = db.get('daily_waste_communal')
        .reverse()
        .take(1)
        .value()
    res.json(post);
    res.end('OK');
})

router.put('/add-communal-daily-waste-data-upd', (req, res) => {
    let post = db.get('daily_waste_communal').find({name: 'DailyCommunalWaste'});
    post.assign({
        communal_amount: req.body.all_upd_communal_amount,
        daily_waste: req.body.all_upd_communal_daily_waste,
        total_waste: req.body.all_upd_communal_total_waste,
        remainder: req.body.all_upd_communal_remainder,
        date: new Date()}).write()
    res.json(post);
    res.end('OK');
})

// TRANSPORT
router.put('/add-daily-waste-transport-data', (req, res) => {
    let waste = db.get('daily_waste_transport').find({name: 'DailyTransportWaste'});
    waste.assign({
        transport_amount: req.body.all_transport_amount,
        daily_waste: 0,
        total_waste: 0,
        remainder: req.body.all_transport_remainder
    }).write();
    res.json(waste);
    res.end('OK');
})

router.put('/add-daily-waste-transport-data-upd', (req, res) => {
    console.log(req.body);
    let post = db.get('daily_waste_transport').find({name: 'DailyTransportWaste'});
    post
        .assign({
            transport_amount: req.body.all_upd_transport_amount,
            daily_waste: req.body.all_upd_transport_daily_waste,
            total_waste: req.body.all_upd_transport_total_waste,
            remainder: req.body.all_upd_transport_remainder,
            date: new Date()}).write();
    res.json(post);
    res.end();
})

router.get('/get-distributed-transport-data', (req, res) => {
    let post = db.get('daily_waste_transport')
        .reverse()
        .take(1)
        .value()
    res.json(post);
    res.end('OK');
})

// OTHER
router.put('/add-daily-waste-other-data', (req, res) => {
    let post = db.get('daily_waste_other').find({name: 'DailyOtherWaste'});
    post.assign({
        other_amount: req.body.all_other_amount,
        daily_waste: 0,
        total_waste: 0,
        remainder: req.body.all_other_reminder,
        date: new Date()
    }).write();
    res.json(post);
    res.end('OK');
})

router.put('/add-daily-waste-other-data-upd', (req, res) => {
    let post = db.get('daily_waste_other').find({name: 'DailyOtherWaste'});
    post.assign({
        other_amount: req.body.all_upd_other_amount,
        daily_waste: req.body.all_upd_other_daily_waste,
        total_waste: req.body.all_upd_other_total_waste,
        remainder: req.body.all_upd_other_remainder,
        date: new Date()
    }).write();
    res.json(post);
    res.end('OK');
})

router.get('/get-distributed-other-data', (req, res) => {
    let post = db.get('daily_waste_other')
        .reverse()
        .take(1)
        .value()
    res.json(post);
    res.end('OK');
})

module.exports = router;