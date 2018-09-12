class InitialRepository {

    constructor(db) {
        this.initial_data = db
            .get('initial_data');

        this.allocated_data = db
            .get('allocated_data');

        this.initial_amount = db
            .get('initial_amount');
    }

    insertItem(all_date, all_amount) {
         return this.initial_data
             .insert({date: all_date, amount: all_amount})
             .write();
    }

    insertDisturbed(initial_id, all_food, all_communal, all_transport, all_other) {
        return this.allocated_data
            .insert({
              initial_id: initial_id,
              food: all_food,
              communal: all_communal,
              transport: all_transport,
              other: all_other})
            .write();
    }

    insertInitialAmount(initial_amount) {
        return this.initial_amount.find({name: 'InitialAmount'})
            .assign({
                amount: initial_amount
            }).write();
    }

    insertAfterAmount(after_amount) {
        return this.initial_amount.find({name: 'InitialAmount'})
            .assign({
                amount: after_amount
            }).write();
    }

    getInitialAmount() {
        return this.initial_amount
            .reverse()
            .take(1)
            .value();
    }
}

module.exports = InitialRepository;