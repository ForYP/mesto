import PopupWithForm from "./PopupWithForm";
export default class PopupWithAccept extends PopupWithForm {
    open(handleFormSubmit) {
        super.open();
        this._handleFormSubmit = handleFormSubmit;
  }
}