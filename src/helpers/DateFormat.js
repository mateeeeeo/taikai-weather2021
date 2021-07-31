"use strict";
exports.__esModule = true;
exports.revformat = exports.inputFormat = exports.format = exports.toDClimateFormat = exports.MONTHS = void 0;
exports.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function toDClimateFormat(date) {
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) + '';
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
    return date.getFullYear() + "-" + month + "-" + day + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":00:00+00:00";
}
exports.toDClimateFormat = toDClimateFormat;
function format(date) {
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    return exports.MONTHS[month] + " " + day + ", " + year;
}
exports.format = format;
function inputFormat(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
}
exports.inputFormat = inputFormat;
function revformat(m, d, y) {
    var m_no;
    switch (m) {
        case ("January"):
            m_no = 1;
            break;
        case ("February"):
            m_no = 2;
            break;
        case ("March"):
            m_no = 3;
            break;
        case ("April"):
            m_no = 4;
            break;
        case ("May"):
            m_no = 5;
            break;
        case ("June"):
            m_no = 6;
            break;
        case ("July"):
            m_no = 7;
            break;
        case ("August"):
            m_no = 8;
            break;
        case ("September"):
            m_no = 9;
            break;
        case ("October"):
            m_no = 10;
            break;
        case ("November"):
            m_no = 11;
            break;
        case ("December"):
            m_no = 12;
            break;
        default:
            m_no = 0;
            break;
    }
    ;
    return new Date(m_no, d, y);
}
exports.revformat = revformat;
