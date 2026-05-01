import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Interface (Business shape)
 */
export interface IBaby {
  name: string;
  birthDate: Date;
  parentId: Types.ObjectId;
}

/**
 * Document (MongoDB Document)
 */
export interface IBabyDocument extends IBaby, Document {
  ageInMonths?: number; // virtual
}

/**
 * Schema
 */
const babySchema = new Schema<IBabyDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value <= new Date(); // can't be future date
        },
        message: "Birth date cannot be in the future",
      },
    },

    parentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, //  important for performance
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



/**
 *  Virtual Field (Computed)
 * Example: Age in months
 */
babySchema.virtual("ageInMonths").get(function () {
  const today = new Date();
  const birth = this.birthDate;

  const months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());

  return months;
});



/**
 *  Indexes (for scaling)
 */
babySchema.index({ parentId: 1, createdAt: -1 });



/**
 *  Static Methods (optional but powerful)
 */
babySchema.statics.findByParent = function (parentId: Types.ObjectId) {
  return this.find({ parentId });
};



/**
 * Model
 */
export const BabyModel = mongoose.model<IBabyDocument>(
  "Baby",
  babySchema
);