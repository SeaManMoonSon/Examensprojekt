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

// Function to create a default timestamp in the timestamps collection to prevent
// crash on admin page before a timestamp gets manually made.
async function createDefaultTimestamp() {
  try {
    const count = await TimestampModel.countDocuments({}).exec();

    if (count === 0) {
      await TimestampModel.create({ timestamp: 0 });
      console.log("Default timestamp document created");
    }
  } catch (error) {
    console.log("Error creating default timestamp", error);
  }
}
createDefaultTimestamp(); 

export default TimestampModel;  
