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

      const user = await this._repo.FindUserByEmail(dto.email);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const payload = {
        userId: user._id,
        email: user.email,
    
      };

      const accessToken = generateAccessToken(payload);

      const refreshToken = generateRefreshToken(payload);

      await this._repo.saveRefreshToken({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

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