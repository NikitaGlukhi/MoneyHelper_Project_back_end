const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter  = new FileSync('foodData.json');
const lodashId = require('lodash-id');

const foodRepository = require('../repos/food_repository');

db = low(adapter);

const food_repository = new foodRepository(db);

db._.mixin(lodashId);


const daily_waste_food_collection = db
    .defaults({daily_waste_food: []})
    .write();
const foodWaste = db.get('daily_waste_food');
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

router.put('/add-food-daily-waste-data', (req, res) => {
    console.log(req.body);
    let waste = food_repository.addFoodData(req.body.all_food_amount, req.body.all_remainder);
    res.json(waste);
})

router.get('/get-distributed-food-data', (req, res) => {
    let post = food_repository.getFoodData();
    res.json(post);
})


router.put('/add-daily-waste-food-upd', (req, res) => {
    let post = food_repository.addUpdateFoodData(
        req.body.all_upd_food_amount,
        req.body.all_upd_daily_waste,
        req.body.all_upd_total_waste,
        req.body.all_upd_remainder
    );
    res.json(post);
})

module.exports = router;
