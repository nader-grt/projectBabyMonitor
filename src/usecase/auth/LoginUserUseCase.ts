import RepoUser from "../../repo/repoUser/RepoUser";
import bcrypt from "bcrypt";
import generateAccessToken from "../../middleware/generateAccessToken";
import generateRefreshToken from "../../middleware/generateRefreshToken";

export default interface IUserLoginDTO {
  email: string;
  password: string;
}

export default class LoginUserUseCase {

  private _repo: RepoUser;

  constructor(repo: RepoUser) {
    this._repo = repo;
  }

  async execute(dto: IUserLoginDTO): Promise<any> {
    try {

      // 1. Find user
      const user = await this._repo.FindUserByEmail(dto.email);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // 2. Compare password
      const isMatch = await bcrypt.compare(dto.password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // 3. Payload
      const payload = {
        userId: user._id,
        email: user.email,
    
      };

      // 4. Access Token (short life)
      const accessToken = generateAccessToken(payload);

      // 5. Refresh Token (long life)
      const refreshToken = generateRefreshToken(payload);

      // 6. Save refresh token in DB
      await this._repo.saveRefreshToken({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      // 7. Return clean response
      return {
        user: {
          id: user._id,
          email: user.email,
         
        },
        accessToken,
        refreshToken,
      };

    } catch (error: any) {
      console.error("LoginUserUseCase ERROR:", error.message);
      throw error;
    }
  }
}