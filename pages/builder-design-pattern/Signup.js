import { User } from "./User.js";
import { UserPref } from "./UserPref.js";

class Signup {
  async create({name, email, age, nickname, photo, isModerator, isAdmin}) {
    const newUser = await new User(name, email, age, photo);
    await new UserPref(newUser, nickname, isModerator, isAdmin);
  }
};

const signupObject = new Signup();

export { signupObject as signup };