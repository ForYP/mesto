export default class UserInfo {
    constructor({ profileName, profileStatus }) {
        this._userName = document.querySelector(profileName);
        this._userStatus = document.querySelector(profileStatus);
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
}