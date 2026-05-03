export default class BabyDomain {
  private name: string;
  private birthDate: Date;
  private userId: string;

  constructor(data: {
    name: string;
    birthDate: Date;
    userId: string;
  }) {
    this.name = data.name.trim();
    this.birthDate = data.birthDate;
    this.userId = data.userId;

    this.validate();
  }

  private validate() {
    if (!this.name || this.name.length < 2) {
      throw new Error("Baby name must be at least 2 characters");
    }

    if (this.birthDate > new Date()) {
      throw new Error("Birth date cannot be in the future");
    }

    if (!this.userId) {
      throw new Error("UserId is required");
    }
  }

  public toPersistence() {
    return {
      name: this.name,
      birthDate: this.birthDate,
      userId: this.userId,
    };
  }
}