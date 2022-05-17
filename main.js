(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._data=e,this._form=n,this._buttonElement=this._form.querySelector(this._data.submitButtonSelector),this._inputList=Array.from(this._form.querySelectorAll(this._data.inputSelector))}var n,r;return n=t,(r=[{key:"_showInputError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.add(this._data.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._data.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._data.inputErrorClass),t.classList.remove(this._data.errorClass),t.textContent=""}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._data.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._data.inactiveButtonClass),this._buttonElement.removeAttribute("disabled",!0))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"enableValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a,c){var u=t.name,l=t.link,s=t.likes,f=t._id,p=t.owner;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._title=u,this._image=l,this._likes=s,this._id=f,this._owner=p,this._userId=r,this._cardSelector=n,this._countLike=this._likes.length,this._handleCardClick=o,this._handleDeleteIconClick=i,this._setLike=a,this._removeLike=c}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".elements__item").cloneNode(!0)}},{key:"generateCard",value:function(){var e=this;this._element=this._getTemplate(),this._setEventListeners();var t=this._element.querySelector(".elements__image"),n=this._element.querySelector(".elements__count-like"),r=this._element.querySelector(".elements__like");return t.src=this._image,t.alt=this._title,this._element.querySelector(".elements__title").textContent=this._title,n.textContent=this._likes.length,this._owner._id!==this._userId&&this._element.querySelector(".elements__card-delete").remove(),this._likes.some((function(t){return t._id===e._userId}))&&r.classList.add("elements__like_active"),this._element}},{key:"handleDeleteCard",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".elements__card-delete").addEventListener("click",(function(){e._handleDeleteIconClick(e)})),this._element.querySelector(".elements__like").addEventListener("click",(function(t){t.target.classList.contains("elements__like_active")?(e._removeLike(e._id,t,e._countLike),e._countLike-=1):(e._setLike(e._id,t,e._countLike),e._countLike+=1)})),this._element.querySelector(".elements__image").addEventListener("click",(function(){e._handleCardClick(e._title,e._image)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"rendered",value:function(e){var t=this;e.reverse().forEach((function(e){var n=t._renderer(e);t.addItem(n)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popupSelector.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._popupSelector.classList.remove("popup_opened")}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup__button-close")||t.target===e._popupSelector)&&e.close()}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function h(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t,n=e.popupSelector,r=e.imageUrl,o=e.imageName;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._imageUrl=document.querySelector(r),t._imageName=document.querySelector(o),t}return t=a,(n=[{key:"open",value:function(e,t){this._imageUrl.src=t,this._imageUrl.alt=e,this._imageName.textContent=e,s(d(a.prototype),"open",this).call(this)}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function k(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._popupForm=n._popupSelector.querySelector(".popup__form"),n._handleFormSubmit=t,n._inputList=n._popupForm.querySelectorAll(".popup__input"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValue={},this._inputList.forEach((function(t){e._formValue[t.name]=t.value})),this._formValue}},{key:"setEventListeners",value:function(){var e=this;m(w(a.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}},{key:"close",value:function(){m(w(a.prototype),"close",this).call(this),this._popupForm.reset()}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=L(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function L(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}function C(e,t){return C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C(e,t)}function P(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function I(e){return I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},I(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(r);if(o){var n=I(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return P(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._popupBtnDelete=n._popupSelector.querySelector(".popup__submit-button"),n._handleSubmit=t,n}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;j(I(a.prototype),"setEventListeners",this).call(this),this._popupBtnDelete.addEventListener("click",(function(t){t.preventDefault(),e._handleSubmit(e._id)}))}},{key:"getIdCard",value:function(e){this._id=e._id,this._card=e}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t){var n=t.name,r=t.job,o=t.avatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._job=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,job:this._job.textContent}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._job.textContent=e.about,this._id=e._id}},{key:"setUserAvatar",value:function(e){this._avatar.src=e.avatar||e.link}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t){var n=t.url,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=n,this._headers=r}var t,n;return t=e,(n=[{key:"checkError",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._url,"users/me"),{method:"GET",headers:this._headers}).then((function(t){return e.checkError(t)}))}},{key:"setUserInfo",value:function(e){var t=this;return fetch("".concat(this._url,"users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t.checkError(e)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._url,"cards"),{method:"GET",headers:this._headers}).then((function(t){return e.checkError(t)}))}},{key:"addNewCard",value:function(e){var t=this;return fetch("".concat(this._url,"cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t.checkError(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._url,"cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t.checkError(e)}))}},{key:"setLike",value:function(e){var t=this;return fetch("".concat(this._url,"cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then((function(e){return t.checkError(e)}))}},{key:"removeLike",value:function(e){var t=this;return fetch("".concat(this._url,"cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t.checkError(e)}))}},{key:"loadUserAvatar",value:function(e){var t=this;return fetch("".concat(this._url,"users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t.checkError(e)}))}}])&&x(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();const A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",errorElement:"popup__error"};var B=document.querySelector(".popup__input_type_name"),D=document.querySelector(".popup__input_type_job"),V=document.querySelector(".edit-form"),N=document.querySelector(".add-form"),F=document.querySelector(".edit-avatar"),z=document.querySelector(".profile__edit-button"),J=document.querySelector(".profile__add-button"),G=document.querySelector(".profile__edit-avatar");function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var M=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.querySelector(".".concat(e," .popup__submit-button"));n.textContent=t?"Сохранение...":"Сохранить"},$=function(e,t){ne.open(e,t)},K=function(e){re.open(),re.getIdCard(e)},Q=function(e,t,n){te.setLike(e).then((function(){t.target.classList.add("elements__like_active"),t.target.nextElementSibling.textContent=String(n+1),console.log("Лайк поставлен")})).catch((function(e){console.log("Ошибка при добавлении лайка ".concat(e))}))},W=function(e,t,n){te.removeLike(e).then((function(){t.target.classList.remove("elements__like_active"),t.target.nextElementSibling.textContent=String(n-1),console.log("Лайк убран")})).catch((function(e){console.log("Ошибка при удалении лайка ".concat(e))}))},X=function(e){return new r(e,".card",ie._id,$,K,Q,W).generateCard()},Y=new t(A,V),Z=new t(A,N),ee=new t(A,F);Y.enableValidation(),Z.enableValidation(),ee.enableValidation();var te=new U({url:"https://mesto.nomoreparties.co/v1/cohort-41/",headers:{authorization:"773f7647-9f5b-47ff-aca1-eaec927fb96b","Content-Type":"application/json"}}),ne=new _({popupSelector:".popup_type_zoom-photo",imageUrl:".popup__zoom-photo",imageName:".popup__caption"}),re=new q(".popup_type_confirm-delete",(function(e){te.deleteCard(e).then((function(){re._card.handleDeleteCard(),re.close()})).catch((function(e){return console.error("Ошибка при удалении карточки: ".concat(e))}))})),oe=new S(".popup_type_edit",(function(e){M("popup_type_edit",!0),te.setUserInfo(e).then((function(e){ie.setUserInfo(e),oe.close()})).catch((function(e){alert("Произошла ошибка сохранения данных"),console.log(e)})).finally((function(){M("popup_type_edit",!1)}))})),ie=new T({name:".profile__name",job:".profile__job",avatar:".profile__avatar"}),ae=new S(".popup_type_add",(function(e){M("popup_type_add",!0),te.addNewCard(e).then((function(e){ue.addItem(X(e)),ae.close()})).catch((function(e){console.log("Ошибка добавления карточки ".concat(e))})).finally((function(){M("popup_type_add",!1)}))})),ce=new S(".popup_type_add-avatar",(function(e){M("popup_type_add-avatar",!0),ie.setUserAvatar(e),te.loadUserAvatar(e.link).then((function(){console.log("Загрузка аватара прошла успешно")})).catch((function(e){console.log("Ошибка загрузки аватара ".concat(e))})).finally((function(){M("popup_type_add-avatar",!1)}))})),ue=new i(X,".elements__list");Promise.all([te.getUserInfo(),te.getInitialCards()]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],a=o[1];t=i,ie.setUserInfo(t),ie.setUserAvatar(t),ie.id=t._id,ue.rendered(a)})).catch((function(e){console.log("Ошибка: ".concat(e))})),re.setEventListeners(),ce.setEventListeners(),ne.setEventListeners(),ae.setEventListeners(),oe.setEventListeners(),G.addEventListener("click",(function(){ce.open(),ee.resetValidation()})),J.addEventListener("click",(function(){Z.resetValidation(),ae.open()})),z.addEventListener("click",(function(){var e=ie.getUserInfo();B.value=e.name,D.value=e.job,oe.open(),Y.resetValidation()}))})();