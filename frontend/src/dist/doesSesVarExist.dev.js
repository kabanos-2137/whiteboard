"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactClientSession = require("react-client-session");

var doesSesVarExist = function doesSesVarExist(sesVar) {
  if (_reactClientSession.ReactSession.get(sesVar) != undefined) {
    return true;
  } else {
    return false;
  }
};

var _default = doesSesVarExist;
exports["default"] = _default;