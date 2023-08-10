import Timestamp from "../models/timestamp-model.js";
import dateFormat from "dateformat";

// Get timestamp
const getTimestamp = async (req, res) => {
    const timestamp = await Timestamp.find({});

    res.status(200).json(timestamp);
}

// Create timestamp
const createTimestamp = async (req, res) => {
    try {
        let timestamp = await Timestamp.findOne();

        if (!timestamp) {
            timestamp = new Timestamp();
        }

        const formattedTimestamp = dateFormat(new Date(), "isoDateTime");
        timestamp.timestamp = formattedTimestamp;

        await timestamp.save();

        res.status(200).json(timestamp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default { getTimestamp, createTimestamp };
