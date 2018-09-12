class communalRepository {
    constructor(db) {
        this.communal_collection = db
            .get('daily_waste_communal')
    }

    addCommunalData(all_communal_amount, all_communal_remainder) {
        return this.communal_collection.find({name: 'DailyCommunalWaste'})
            .assign({
                communal_amount: all_communal_amount,
                daily_waste: 0,
                total_waste:0,
                remainder: all_communal_remainder
            }).write();
    }

    getCommunalData() {
        return this.communal_collection
            .reverse()
            .take(1)
            .value();
    }

    addUpdateCommunalData(
        all_upd_communal_amount,
        all_upd_communal_daily_waste,
        all_upd_communal_total_waste,
        all_upd_communal_remainder
    ) {
        return this.communal_collection.find({name: 'DailyCommunalWaste'})
            .assign({
                communal_amount: all_upd_communal_amount,
                daily_waste: all_upd_communal_daily_waste,
                total_waste: all_upd_communal_total_waste,
                remainder: all_upd_communal_remainder,
                date: new Date()
            }).write();
    }
}

module.exports = communalRepository;