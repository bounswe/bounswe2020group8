/* eslint-disable prefer-spread */
const mongoose = require("mongoose");

exports.isNull = function (variable) {
  return !(typeof variable !== "undefined" && variable !== null);
};

exports.isNullOrEmpty = function (variable) {
  return !(typeof variable !== "undefined" && variable !== null && variable !== "");
};

exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.isArraysEqual = function (a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length != b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

exports.isObjectIdArraysEqual = function (a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length != b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i].toString() !== b[i].toString()) {
      return false;
    }
  }
  return true;
};

exports.deepDeleteFields = function (obj, field) {
  if (!obj || typeof obj !== "object") {
    console.log(obj);
    throw new TypeError("Provide a valid object");
  }
  if (Array.isArray(field)) {
    field.forEach((f) => {
      if (!exports.isNull(obj[f])) {
        delete obj[f];
      }
    });
  } else if (!exports.isNull(obj[field])) {
    delete obj[field];
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && !exports.isNull(obj[key])) {
      exports.deepDeleteFields(obj[key], field);
    }
  });
};

exports.calculateAvg = function (array = [], objField) {
  let avg = array.reduce((total, item) => total + item[objField], 0);
  return avg / array.length;
};

exports.calculateStandardDeviation = function (array = [], objField, avg) {
  let standardDeviation = array.reduce((total, item) => {
    let deviation = item[objField] - avg;
    let deviationSquared = deviation * deviation;
    return total + deviationSquared;
  }, 0);
  return Math.sqrt(standardDeviation / array.length);
};

exports.deleteNullFieldsFromObj = function (obj) {
  for (let key in obj) {
    if (exports.isNull(obj[key])) {
      delete obj[key];
    }
  }
  return obj;
};

Number.prototype.toFixedNumber = function (x, base) {
  // eslint-disable-next-line no-restricted-properties
  const pow = Math.pow(base || 10, x);
  return +(Math.round(this * pow) / pow);
};

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toObjectId = function () {
  return mongoose.Schema.Types.ObjectId(this);
};

String.prototype.firstCharUpperCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.firstCharLowerCase = function () {
  return this.charAt(0).toLowerCase() + this.slice(1);
};

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.substractDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

Date.prototype.addHours = function (hours) {
  let date = new Date(this.valueOf());
  date.setHours(date.getHours() + hours);
  return date;
};

Array.prototype.remove = function (from, to) {
  let rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
