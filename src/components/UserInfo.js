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
            avatar: this._avatar.src
        };
    }

    setUserInfo({name, status, avatar, myId}) {
        this._myId = myId;
        this._userName.textContent = name;
        this._userStatus.textContent = status;
        if (avatar) {
            this._avatar.src = avatar
        }
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
      }
}