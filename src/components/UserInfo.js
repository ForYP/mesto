export default class UserInfo {
    constructor({ profileName, profileStatus, avatarLink}) {
        this._userName = document.querySelector(profileName);
        this._userStatus = document.querySelector(profileStatus);
        this._avatar = document.querySelector(avatarLink);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            status: this._userStatus.textContent,
        };
    }

    setUserInfo({name, status}) {
        this._userName.textContent = name;
        this._userStatus.textContent = status;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar.link;
      }
}