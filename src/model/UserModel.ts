import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface
 * 
 /**
 * 
 {
    "firstName":"islem",
  "lastName":"",
    "email":"islemmonastir@gmail.com",
    "password": "123456789",



  
    "nameBaby":"",
    "BirthDayBaby"
}
 */

export interface IUser {
  firstName: string;
  lastName: string;
 
  email: string;

  password: string;
  confirmPassword:string;
  nameBaby:string;
  BirthDayBaby:Date

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
    firstName: { type: String, required: true, trim: true },

    lastName: { type: String, required: true, trim: true },

  

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
    confirmPassword: {
        type: String,
        required: true,
        minlength: 6,
        select: false, //  hide password
      },
      nameBaby: {
        type: String,
        required: true,
        minlength: 3,
   //  hide password
      },
      BirthDayBaby: {
        type: Date,
        required: true,
     
        //  hide password
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