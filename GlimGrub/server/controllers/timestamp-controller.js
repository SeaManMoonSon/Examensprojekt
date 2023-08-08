import Timestamp from "../models/timestamp-model.js";

const createTimestamp = async (req, res) => {
    try {
        const newTimestamp = new Timestamp();
        await newTimestamp.save();

        res.status(200).json(newTimestamp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
    // try {
    //     let timestamp = await Timestamp.findOne();

    //     if (!timestamp) {
    //         timestamp = new Timestamp();
    //     }

    //     timestamp.timestamp = new Date();
    //     await timestamp.save();

    //     res.status(200).json(timestamp);
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
// }

export default {createTimestamp};
