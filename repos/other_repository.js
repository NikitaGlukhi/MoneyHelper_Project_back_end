class otherRepository {
    constructor(db) {
        this.other_collection = db
            .get('daily_waste_other');
    }

    addOtherData(all_other_amount, all_other_reminder) {
        return this.other_collection.find({name: 'DailyOtherWaste'})
            .assign({
                other_amount: all_other_amount,
                daily_waste: 0,
                total_waste: 0,
                remainder: all_other_reminder,
                date: new Date()
            }).write();
    }

    getOtherData() {
        return this.other_collection
            .reverse()
            .take(1)
            .value();
    }

    addUpdateOtherData(
        all_upd_other_amount,
        all_upd_other_daily_waste,
        all_upd_other_total_waste,
        all_upd_other_remainder
    ) {
        return this.other_collection.find({name: 'DailyOtherWaste'})
            .assign({
                other_amount: all_upd_other_amount,
                daily_waste: all_upd_other_daily_waste,
                total_waste: all_upd_other_total_waste,
                remainder: all_upd_other_remainder
            }).write();
    }
}

module.exports = otherRepository;