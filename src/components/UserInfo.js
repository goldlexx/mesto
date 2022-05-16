export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return dataUser;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
    this._id = userData._id;
  }

  setUserAvatar(userData) {
    this._avatar.src = userData.avatar || userData.link;
  }
}
