const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter  = new FileSync('initialData.json');
const lodashId = require('lodash-id');

const InitialRepository = require('../repos/initial.repository');

db = low(adapter);

const initial_repository = new InitialRepository(db);

db._.mixin(lodashId);

const initial_collection = db
    .defaults({ initial_data: []})
    .write();

const allocation_collection = db
    .defaults({ allocated_data: []})
    .write();

const amount_collection = db
    .defaults({initial_amount: []})
    .write()
const initialAmount = db.get('initial_amount');
if(initialAmount.value().length === 0) {
    initialAmount.push({
        name: 'InitialAmount',
        amount: 0
    }).write()
}

router.post('/set-initial-data', (req, res) => {
    const newPost = initial_repository.insertItem(req.body.all_date, req.body.all_amount);
    res.json(newPost.id);
});

router.post('/set-distributed-data', (req, res) => {
    const newPost = initial_repository.insertDisturbed(
            req.body.initial_id,
            req.body.all_food,
            req.body.all_communal,
            req.body.all_transport,
            req.body.all_other
        );
    res.json(newPost);
})

router.put('/initial-amount', (req, res) => {
    let post = initial_repository.insertInitialAmount(
        req.body.initial_amount
    )
    res.json(post);
})

router.put('/after-distributed-amount', (req, res) => {
    let post = initial_repository.insertAfterAmount(
        req.body.after_amount
    );
    res.json(post);
})

router.get('/get-amount', (req, res) => {
    let post = initial_repository.getInitialAmount();
    res.json(post);
})

module.exports = router;