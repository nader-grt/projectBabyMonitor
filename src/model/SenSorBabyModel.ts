import mongoose, { Schema } from "mongoose";



/**
 * 
 temp  t ,  capteure 1
        freques cardial  capteure 2 
         
        capteur  3  give us three information in same temps 
        temp envirment
        humdity envir
        press envirment

          

        ai  plus camera 
        postion  enum back aside or   enum  string 
        crying boolean 
 */
const SenSorBabySchema = new Schema({
  babyId: {
    type: Schema.Types.ObjectId,
    ref: "Baby",
    required: true,
  },
  environmentTemperature: Number,
  pressure: Number,
  babyTemperature: Number,
  humidity: Number,
  heartRate: Number,
  isCrying: Boolean,
  position: String,

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const SenSorBabyModel = mongoose.model(
  "SenSorBaby",
  SenSorBabySchema
);


/**
 const SenSorBabySchema = new Schema({
  babyId: {
    type: Schema.Types.ObjectId,
    ref: "Baby",
    required: true,
  },

  // ENV
  environmentTemperature: Number,
  humidity: Number,
  pressure: Number,
  environmentGas: Boolean,

  // VITALS
  babyTemperature: Number,
  heartRate: Number,

  // AI
  isCrying: Boolean,
  position: {
    type: String,
    enum: ["back", "stomach", "side"],
  },

  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

//  Performance index
SenSorBabySchema.index({ babyId: 1, timestamp: -1 });
 */