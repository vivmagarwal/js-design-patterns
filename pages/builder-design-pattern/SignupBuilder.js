import { signup } from "./Signup.js";

class SignupBuilder {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  setNickName(name) {
    this.nickname = name;
    return this;
  }

  setPhoto(photo) {
    this.photo = photo;
    return this;
  }

  setModerator() {
    this.isModerator = true;
    return this;
  }

  setAdmin() {
    this.isAdmin = true;
    return this;
  }

  create() {
    return signup.create(this);
  }
}

export { SignupBuilder };