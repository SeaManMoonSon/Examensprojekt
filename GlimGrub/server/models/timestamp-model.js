import mongoose from "mongoose";
import dateFormat from "dateformat";

const now = new Date();
const formattedDate = dateFormat(now, "isoDateTime");

const timestampSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    default: formattedDate,
    unique: true
  }
});

const TimestampModel = mongoose.model("Timestamp", timestampSchema);

export default TimestampModel;
