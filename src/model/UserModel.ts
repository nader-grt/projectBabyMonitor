import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface
 * 
 /**
 * 
 {
   fullName
    "email":"islemmonastir@gmail.com",
    "password": "123456789",



  
    "nameBaby":"",
    "BirthDayBaby"
}
 */

export interface IUser {

 fullName:string ;
  email: string;

  password: string;



}

/**
 * Document
 */
export interface IUserDocument extends IUser, Document {}

/**
 * Schema
 */
const userSchema = new Schema<IUserDocument>(
  {
    fullName: { type: String, required: true, trim: true },

 

  

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

 

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, //  hide password
    },

  
  },
  { timestamps: true }
);

/**
 * Model
 */
export const UserModel = mongoose.model<IUserDocument>(
  "User",
  userSchema
);