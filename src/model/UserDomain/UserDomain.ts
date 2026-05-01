import bcrypt  from "bcrypt"

export default class UserDomain {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
  
    constructor(data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string
    }) {
      this.firstName = data.firstName.trim();
      this.lastName = data.lastName.trim();
      this.email = data.email.toLowerCase().trim();
      this.password = data.password;
      this.confirmPassword = data.confirmPassword
  
      this.validate();
    }
  
    /**
     *  Business Rules Validation
     */
    private validate() {
      if (!this.firstName || this.firstName.length < 2) {
        throw new Error("First name must be at least 2 characters");
      }
  
      if (!this.lastName || this.lastName.length < 2) {
        throw new Error("Last name must be at least 2 characters");
      }
  
      if (!this.isValidEmail(this.email)) {
        throw new Error("Invalid email format");
      }
  
      if (!this.password || this.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
    }
  
    /**
     *  Email validation
     */
    private isValidEmail(email: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  

    // hash password 




    public get getFirstName():string
    {
        return this.firstName
    }

    public set setFirstName(value:string)
    {
         this.firstName = value 
    }

    public get getLastName():string
    {
        return this.lastName
    }

    public set setLastName(value:string)
    {
         this.lastName = value 
    }

    public get getEmail():string
    {
        return this.email
    }

    public set setEmail(value:string)
    {
         this.email = value 
    }

    public get getPassword():string
    {
        return this.password
    }

    public set setPassword(value:string)
    {

        const passwordHashed:any =   this.hashPassword(value)
         this.password = passwordHashed 
    }


    public hashPassword(password: string): string {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }
    /**
     *  Prepare data for persistence
     * (without exposing domain logic)
     */

    public fullName()
    {
         return this.lastName + " "  + this.firstName ;
    }
    public toPersistence() {
      return {
        firstName: this.firstName,logoutUserUseCase
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
    }
  }