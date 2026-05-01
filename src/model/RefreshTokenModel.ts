import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRefreshToken {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  revoked: boolean;
}

export interface IRefreshTokenDocument
  extends IRefreshToken,
    Document {}

const refreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // relation
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = mongoose.model<IRefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema
);