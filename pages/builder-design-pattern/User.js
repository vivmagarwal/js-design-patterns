import { makeid } from "./makeId.js";

class User {
  constructor(name, email, age, photo) {
    return new Promise((resolve, reject) => {
      this.name = name;
      this.email = email;
      this.age = age;
      this.photo = photo;
      resolve(this._doSignup());
    });
  }

  _setPhoto() {
    console.log(`${this.photo} uploaded for ${this.name}`);
  }

  _doSignup() {
    console.log(`${this.name} signed up as a new user.`);

    if (this.photo) {
      this._setPhoto();
    }

    return makeid(5);
  }
}

export { User };