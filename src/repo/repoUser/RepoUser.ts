import { UserModel } from "../../model/UserModel";
import { BabyModel } from "../../model/BabyModel";
import IRepoUser from "./IRepoUser";
import bcrypt from "bcrypt";
import { RefreshTokenModel } from "../../model/RefreshTokenModel";

export default class RepoUser extends IRepoUser {

  // -------------------------
  // REGISTER USER + BABY
  // -------------------------
  public async RegisterUser(dataUser: any): Promise<any> {
    try {
      const { fullName, email, password, baby } = dataUser;

      // 1. Create user
      const user = await UserModel.create({
        fullName,
        email,
        password,
      });

      // 2. Create baby linked to user
      let babyCreated = null;

      if (baby) {
        babyCreated = await BabyModel.create({
          name: baby.name,
          birthDate: baby.birthDate,
          userId: user._id,
        });
      }

      // 3. Return clean response
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        baby: babyCreated
          ? {
              id: babyCreated._id,
              name: babyCreated.name,
              birthDate: babyCreated.birthDate,
            }
          : null,
      };

    } catch (error: any) {
      console.error("RegisterUser ERROR:", error.message);
      throw error;
    }
  }

  // -------------------------
  // GET ALL USERS
  // -------------------------
  public async GetAll(): Promise<any> {
    try {
      const users = await UserModel.find()
        .select("-password")
        .lean();

      return users;
    } catch (error: any) {
      console.error("GetAll ERROR:", error.message);
      throw error;
    }
  }

  // -------------------------
  // LOGIN USER
  // -------------------------
  public async LoginUser(data: any): Promise<any> {
    try {
      const { email, password } = data;

      // 1. Find user (include password)
      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // 2. Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // 3. Return clean user
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      };

    } catch (error: any) {
      console.error("LoginUser ERROR:", error.message);
      throw error;
    }
  }


  public async FindUserByEmail(email: string): Promise<any> {
    try {
      const user = await UserModel
        .findOne({ email })
        .select("+password"); //  FIX HERE
  
      return user;
    } catch (error: any) {
      console.error("FindUserByEmail ERROR:", error.message);
      throw error;
    }
  }

  public async saveRefreshToken(data: {
    userId: string;
    token: string;
    expiresAt: Date;
  }): Promise<any> {
    try {
  
      const refreshToken = await RefreshTokenModel.create({
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
        revoked: false,
      });
  
      return refreshToken;
  
    } catch (error: any) {
      console.error("saveRefreshToken ERROR:", error.message);
      throw error;
    }
  }



  public async revokeRefreshToken(token: string): Promise<void> {
    try {
  
      await RefreshTokenModel.updateOne(
        { token },
        { $set: { revoked: true } }
      );
  
    } catch (error: any) {
      console.error("revokeRefreshToken ERROR:", error.message);
      throw error;
    }
  }
}