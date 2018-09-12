class foodRepository {

    constructor(db) {
        this.food_collection = db
            .get('daily_waste_food');
    }

    addFoodData(all_food_amount, all_remainder) {
        return this.food_collection.find({name: 'DailyFoodWaste'})
            .assign({
                food_amount: all_food_amount,
                daily_waste: 0,
                total_waste:0,
                remainder: all_remainder
            }).write();
    }

    getFoodData() {
        return this.food_collection
            .reverse()
            .take(1)
            .value();
    }

    addUpdateFoodData(
        all_upd_food_amount,
        all_upd_daily_waste,
        all_upd_total_waste,
        all_upd_remainder
    ) {
        return this.food_collection.find({name: 'DailyFoodWaste'})
            .assign({
                food_amount: all_upd_food_amount,
                daily_waste: all_upd_daily_waste,
                total_waste: all_upd_total_waste,
                remainder: all_upd_remainder,
                date: new Date()
            }).write();
    }
}

module.exports = foodRepository;