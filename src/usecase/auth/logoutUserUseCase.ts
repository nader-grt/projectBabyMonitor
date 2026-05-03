import RepoUser from "../../repo/repoUser/RepoUser";

export default class LogoutUserUseCase {

  private _repo: RepoUser;

  constructor(repo: RepoUser) {
    this._repo = repo;
  }

  async execute(refreshToken: string): Promise<any> {
    try {

      if (!refreshToken) {
        throw new Error("No refresh token provided");
      }

   
      await this._repo.revokeRefreshToken(refreshToken);

      return {
        message: "Logout successful",
      };

    } catch (error: any) {
      console.error("LogoutUseCase ERROR:", error.message);
      throw error;
    }
  }
}