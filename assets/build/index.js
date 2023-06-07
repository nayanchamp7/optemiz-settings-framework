/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/admin/js/components/Body.js":
/*!********************************************!*\
  !*** ./assets/admin/js/components/Body.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Body; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_DashboardContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/DashboardContext */ "./assets/admin/js/context/DashboardContext.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu */ "./assets/admin/js/components/Menu.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sidebar */ "./assets/admin/js/components/Sidebar.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TabContent */ "./assets/admin/js/components/TabContent.js");
/* harmony import */ var _SubmitButtons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SubmitButtons */ "./assets/admin/js/components/SubmitButtons.js");








function Body() {
  const dashboardContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_DashboardContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  const opt_form = dashboardContext.apiData.localData.settings.form;
  let menu_content_items = opt_form.items;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "opt-body opt-dashboard-form",
    onSubmit: dashboardContext.saveData,
    enctype: "multipart/form-data"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-body-left-child"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Menu__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-main-content-area"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-main-contents"
  }, Object.keys(menu_content_items).map(function (menu_item_type, key) {
    let menu_content_item = menu_content_items[menu_item_type];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TabContent__WEBPACK_IMPORTED_MODULE_5__["default"], {
      item: menu_content_item,
      item_type: menu_item_type,
      counter: key,
      key: key
    });
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SubmitButtons__WEBPACK_IMPORTED_MODULE_6__["default"], null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
}

/***/ }),

/***/ "./assets/admin/js/components/Container.js":
/*!*************************************************!*\
  !*** ./assets/admin/js/components/Container.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Container; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_DashboardContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/DashboardContext */ "./assets/admin/js/context/DashboardContext.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Header */ "./assets/admin/js/components/Header.js");
/* harmony import */ var _Body__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Body */ "./assets/admin/js/components/Body.js");








function Container() {
  const [apiData, setApiData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    localData: opt_dashboard_data,
    settingsValue: {}
  });
  const [getAPIData, setGetAPIData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function fetchAPIData() {
      //console.log("very first");
      //console.log(apiData);

      if (getAPIData) {
        //await getData();
      }
    }
    fetchAPIData();
  }, [getAPIData]);
  async function getData() {
    let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    if (!opt_dashboard_data.homeurl) {
      return;
    }
    if (!url) {
      url = opt_dashboard_data.homeurl + "/wp-json/storepress/v1/wpf/patterns";
    }
    await Promise.all([fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
      setApiData(response);
    })]);
    setGetAPIData(false);
  }
  function saveData(event) {
    event.preventDefault();
    let form = document.querySelector('.opt-dashboard-form');

    //console.log(Array.from(form.elements));

    let elements = Array.from(form.elements).filter(tag => ["select", "textarea", "input"].includes(tag.tagName.toLowerCase()));
    elements.forEach(element => {
      //console.log(element.value);
    });

    //let formData = new FormData(form);

    //let data = Array.from(formData);

    //let keys = formData.keys();

    //console.log(formData.entries());
    //console.log(keys);

    // const formDataObj = {};
    // formData.forEach((value, key) => (formDataObj[key] = value));
    // console.log(formDataObj);

    // for (var key of keys) {
    //     // console.log("something");
    // 	console.log(key)

    //     let values = formData.getAll(key);

    //     console.log(values);
    // }

    // formData.set("opt_dashboard_data[opt_frontend]", "five");

    // for (var key of formData.entries()) {
    //     // console.log("something");
    // 	console.log(key[0] + ', ' + key[1])
    // }
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_DashboardContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
    value: {
      apiData,
      saveData
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Body__WEBPACK_IMPORTED_MODULE_5__["default"], null));
}

/***/ }),

/***/ "./assets/admin/js/components/Header.js":
/*!**********************************************!*\
  !*** ./assets/admin/js/components/Header.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Header; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);





function Header() {
  const [apiData, setApiData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  let opt_header = opt_dashboard_data.settings.header;
  console.log(opt_dashboard_data);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "opt-top-bar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-top-left-side"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "logo",
    src: opt_dashboard_data.plugin_url + "/assets/images/xplainer.png",
    alt: ""
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "icon_wrapper",
    src: opt_dashboard_data.plugin_url + "/assets/images/icon_wrapper.png",
    alt: ""
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "top-bar-content"
  }, opt_header.heading, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "opt-topbar-version"
  }, opt_header.version))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-top-right-side"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "top-bar-btn",
    href: opt_header.buttons.upgrade_to_pro.url
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "top-btn-icon",
    src: opt_dashboard_data.plugin_url + "/assets/images/gift.png",
    alt: "upgrade to pro icon"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "opt-top-bar-text"
  }, opt_header.buttons.upgrade_to_pro.text))));
}

/***/ }),

/***/ "./assets/admin/js/components/Menu.js":
/*!********************************************!*\
  !*** ./assets/admin/js/components/Menu.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Menu; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_DashboardContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/DashboardContext */ "./assets/admin/js/context/DashboardContext.js");





function Menu() {
  //const [apiData, setApiData] = useState({});

  const dashboardContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_DashboardContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const opt_form = dashboardContext.apiData.localData.settings.form;

  // console.log(dashboardContext);

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    function menuItems() {
      let menu_sidebar = document.querySelector('.left-sidebar .sidebar-ul');
      let menu_list_items = opt_form.items;
      let counter = 0;
      let menu_list = Object.keys(menu_list_items).map(key => {
        let menu_list_item = menu_list_items[key];
        let menu_item_classes = ['sidebar-li'];
        if (counter == 0) {
          menu_item_classes.push('sidebar-li-active');
        }
        counter++;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
          className: menu_item_classes.join(' '),
          "data-main-menu": key,
          onClick: onClickMenu
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: opt_dashboard_data.plugin_url + "/assets/images/General.png",
          alt: ""
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "opt-sidebar-text"
        }, menu_list_item.menu.label));
      });
      react_dom__WEBPACK_IMPORTED_MODULE_2___default().render(menu_list, menu_sidebar);
    }
    menuItems();
  }, []);
  function onClickMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    var currentItem = event.target.closest('.sidebar-li');
    var leftSidebarTargetValue = currentItem.dataset.mainMenu;

    // var leftSidebarTargetContent = document.querySelector("[data-main-content="+ leftSidebarTargetValue + "]");

    // var leftContentActive = document.querySelector(".opt-main-content-active");

    // leftContentActive.classList.remove("opt-main-content-active");

    // leftSidebarTargetContent.classList.add("opt-main-content-active");

    // // target content first item active
    // var tabActiveItem    = leftSidebarTargetContent.querySelector('.opt-main-content-ul .opt-main-content-li-active');

    // // when active class is available, remove the active class
    // if( tabActiveItem ) {
    //     tabActiveItem.classList.remove('opt-main-content-li-active');
    // }

    // // get the first tab item of the target menu item
    // var targetFirstTab   = leftSidebarTargetContent.querySelector('.opt-main-content-ul .opt-main-content-li:first-child');

    // // add active class to the first tab of the target menu item
    // targetFirstTab.classList.add('opt-main-content-li-active');

    // selector subtab menu list active item
    var mainTabActive = document.querySelector(".sidebar-li-active");

    //remove subtab menu list's active class
    mainTabActive.classList.remove("sidebar-li-active");

    // add active class to the target menu
    currentItem.classList.add('sidebar-li-active');
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "left-sidebar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "left-sidebar-heading"
  }, opt_form.section.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "sidebar-ul"
  }));
}

/***/ }),

/***/ "./assets/admin/js/components/Sidebar.js":
/*!***********************************************!*\
  !*** ./assets/admin/js/components/Sidebar.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Sidebar; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



function Sidebar() {
  const [apiData, setApiData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  let opt_sidebar = opt_dashboard_data.settings.sidebar;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  function sidebarItems() {
    let items = opt_sidebar.items.map(item => {
      let email_subscribe_input = "";
      if (item.type === "subscribe") {
        email_subscribe_input = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
          className: "opt-right-side-bar-input",
          type: "email",
          placeholder: "sample@mail.com"
        });
      }
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "opt-body-right-contents"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "opt-right-side-bar"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "opt-right-side-bar-title"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        className: "opt-right-side-bar-title-img",
        src: opt_dashboard_data.plugin_url + "/assets/images/email.png",
        alt: item.label
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
        className: "opt-right-side-bar-title-heading"
      }, item.label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
        className: "opt-right-side-bar-para"
      }, item.content), email_subscribe_input, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        className: "opt-right-side-bar-btn",
        href: ""
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "opt-right-side-bar-span"
      }, item.buttons[0].button_label))));
    });
    return items;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-body-right-child"
  }, sidebarItems());
}

/***/ }),

/***/ "./assets/admin/js/components/SubmitButtons.js":
/*!*****************************************************!*\
  !*** ./assets/admin/js/components/SubmitButtons.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SubmitButtons; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);




function SubmitButtons(props) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-main-items-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-main-item-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "opt-main-content-bottom-btn",
    type: "submit"
  }, "Save Changes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "opt-main-content-bottom-anchor",
    href: ""
  }, "Reset Settings")));
}

/***/ }),

/***/ "./assets/admin/js/components/TabContent.js":
/*!**************************************************!*\
  !*** ./assets/admin/js/components/TabContent.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TabContent; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_DashboardContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/DashboardContext */ "./assets/admin/js/context/DashboardContext.js");
/* harmony import */ var _TabMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TabMenu */ "./assets/admin/js/components/TabMenu.js");






function TabContent(props) {
  const dashboardContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_DashboardContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  //let tabs = props.menu_item.tabs;

  //const opt_form = dashboardContext.apiData.localData.settings.form;

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  let content_classes = ['opt-main-content'];
  if (props.counter == 0) {
    content_classes.push('opt-main-content-active');
  }
  console.log(props.item);
  let tabs = props.item.tabs;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: content_classes.join(' '),
    "data-main-content": props.item_type
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TabMenu__WEBPACK_IMPORTED_MODULE_4__["default"], {
    menu_item: props.item
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-fields-area"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    "data-content": "init",
    className: "opt-main-items opt-field-active"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-main-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-contents"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "opt-item-heading"
  }, "Enable front-end for roles"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "opt-item-para"
  }, "Select the roles that will have access to the extra options.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "opt-main-input",
    name: "opt_dashboard_data[opt_frontend]",
    type: "text"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-main-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "opt-contents"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "opt-item-heading"
  }, "Enable front-end for roles"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "opt-item-para"
  }, "Select the roles that will have access to the extra options.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "opt-main-input",
    name: "opt_dashboard_data[opt_roles]",
    type: "text"
  })))));
}

/***/ }),

/***/ "./assets/admin/js/components/TabMenu.js":
/*!***********************************************!*\
  !*** ./assets/admin/js/components/TabMenu.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TabMenu; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);





//import DashboardContext from '../context/DashboardContext';

function TabMenu(props) {
  //const dashboardContext = useContext(DashboardContext);
  let tabs = props.menu_item.tabs;

  //const opt_form = dashboardContext.apiData.localData.settings.form;

  console.log(tabs);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {}, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "opt-main-content-ul"
  }, Object.keys(tabs).map(function (tab_item_key, key) {
    let tab_item = tabs[tab_item_key];
    console.log(tab_item.menu.label);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: "opt-main-content-li opt-main-content-li-active",
      "data-list": "init",
      key: key
    }, tab_item.menu.label);
  }));
}

/***/ }),

/***/ "./assets/admin/js/context/DashboardContext.js":
/*!*****************************************************!*\
  !*** ./assets/admin/js/context/DashboardContext.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const DashboardContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
/* harmony default export */ __webpack_exports__["default"] = (DashboardContext);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./assets/admin/js/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Container */ "./assets/admin/js/components/Container.js");




window.addEventListener('DOMContentLoaded', function () {
  let optDashboardContainer = document.querySelector('.opt-main-container');

  // render the DOM
  react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Container__WEBPACK_IMPORTED_MODULE_3__["default"], null), optDashboardContainer);
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map