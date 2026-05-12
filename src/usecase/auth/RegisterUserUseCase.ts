import generateAccessToken from "../../middleware/generateAccessToken";
import generateRefreshToken from "../../middleware/generateRefreshToken";
import UserDomain from "../../model/UserDomain/UserDomain";
import RepoUser from "../../repo/repoUser/RepoUser";

interface IBaby {
  name: string;
  birthDate: Date;
}

export default interface IUserInfoDTO {
  fullName: string;
  email: string;
  password: string;
  baby: IBaby;
}

export default class RegisterUserUseCase {

  private _repo: RepoUser;

  constructor(repo: RepoUser) {
    this._repo = repo;
  }

  // -------------------------
  // MAIN EXECUTION
  // -------------------------
  async execute(dto: IUserInfoDTO): Promise<any> {
    try {

      const existingUser = await this._repo.FindUserByEmail(dto.email);

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const userDomain = new UserDomain({
        fullName: dto.fullName,
        email: dto.email,
        password: dto.password,
      });

      //  Prepare persistence object
      const userPersistence = userDomain.toPersistence();

      const result = await this._repo.RegisterUser({
        ...userPersistence,
        baby: dto.baby,
      });

      // . Generate token
      const payload = {
        userId: result.id,
        email: result.email,
      };

      const accessToken = generateAccessToken(payload);

      const refreshToken = await generateRefreshToken(
    payload
      );

     
      return {
        user: result,
        accessToken,
        refreshToken
      };

    } catch (error: any) {
      console.error("RegisterUserUseCase ERROR:", error.message);
      throw error;
    }
  }
}