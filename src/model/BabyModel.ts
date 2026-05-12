import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBaby {
  name: string;
  birthDate: Date;
  userId: Types.ObjectId;
}

export interface IBabyDocument extends IBaby, Document {
  ageInMonths?: number;
}

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
        validator: (value: Date) => value <= new Date(),
        message: "Birth date cannot be in the future",
      },
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

babySchema.virtual("ageInMonths").get(function () {
  const today = new Date();
  const birth = this.birthDate;

  return (
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth())
  );
});

babySchema.index({ userId: 1, createdAt: -1 });

babySchema.statics.findByUser = function (userId: Types.ObjectId) {
  return this.find({ userId });
};

export const BabyModel = mongoose.model<IBabyDocument>(
  "Baby",
  babySchema
);