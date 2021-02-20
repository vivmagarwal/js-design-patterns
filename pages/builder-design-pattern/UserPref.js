class UserPref {
  constructor(
    userId,
    nickname,
    isModerator,
    isAdmin
  ) {
    return new Promise((resolve, reject) => {
      this.nickname = nickname;

      this.userId = userId;

      if (nickname) {
        this._setNickname(nickname);
      }

      if (isModerator) {
        this._isModerator(isModerator);
      }

      if (isAdmin) {
        this._isAdmin(isAdmin);
      }

      resolve(true);
    });
  }

  _setNickname(nickname) {
    console.log(`Nickname set ${nickname}`);
  }

  _isModerator() {
    console.log(`${this.nickname} registered as a Moderator`);
  }

  _isAdmin() {
    console.log(`${this.nickname} is now an Admin`);
  }
}

export { UserPref };