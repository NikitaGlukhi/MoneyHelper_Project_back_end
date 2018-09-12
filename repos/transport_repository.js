class transportRepository {

    constructor(db) {
        this.transport_collection = db
            .get('daily_waste_transport')
    }

    addTransportData(all_transport_amount, all_transport_remainder) {
        return this.transport_collection.find({name: 'DailyTransportWaste'})
            .assign({
                transport_amount: all_transport_amount,
                daily_waste: 0,
                total_waste: 0,
                remainder: all_transport_remainder
            }).write();
    }

    getTransportData() {
        return this.transport_collection
            .reverse()
            .take(1)
            .value();
    }

    addUpdateTransportData(
        all_upd_transport_amount,
        all_upd_transport_daily_waste,
        all_upd_transport_total_waste,
        all_upd_transport_remainder
    ) {
        return this.transport_collection.find({name: 'DailyTransportWaste'})
            .assign({
                transport_amount: all_upd_transport_amount,
                daily_waste: all_upd_transport_daily_waste,
                total_waste: all_upd_transport_total_waste,
                remainder: all_upd_transport_remainder,
                date: new Date()
            }).write();
    }

}

module.exports = transportRepository;