import bcrypt from "bcrypt";

export default class UserDomain {
  private fullName: string;
  private email: string;
  private password: string;

  constructor(data: {
    fullName: string;
    email: string;
    password: string;
  }) {
    this.fullName = data.fullName.trim();
    this.email = data.email.toLowerCase().trim();
    this.password = data.password;

    this.validate();
    this.password = this.hashPassword(this.password);
  }

  // -------------------------
  // Validation
  // -------------------------
  private validate(): void {
    if (!this.fullName || this.fullName.length < 3) {
      throw new Error("Full name must be at least 3 characters");
    }

    if (!this.isValidEmail(this.email)) {
      throw new Error("Invalid email format");
    }

    if (!this.password || this.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // -------------------------
  // Security
  // -------------------------
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  // -------------------------
  // Getters (read-only outside)
  // -------------------------

  public get getFullName(): string {
    return this.fullName;
  }

  public set setFullName(value:string) {
     this.fullName = value;
  }


  public get getPassword(): string {
    return this.password;
  }

  public set setPassword(value:string) {

   const passwordHashed :any = this.hashPassword(value)
     this.fullName = passwordHashed;
  }

  public getEmail(): string {
    return this.email;
  }

  // never expose password getter in real systems

  // -------------------------
  // Persistence
  // -------------------------
  public toPersistence() {
    return {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    };
  }
}