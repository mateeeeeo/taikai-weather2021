"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetchForecastsForLocationJSON2 = exports.fetchForecastsForLocationJSON1 = exports.locations = void 0;
var fs = require("fs");
// export async function fetchForecastsForLocationJSON(interval: number, lname: string, indate: Date): Promise<Forecast | undefined> {
//   return new Promise(async (res, rej) => {
//     try {
//       let result: Forecast | undefined = undefined;
//       // we format our date so it fits our json requirements
//       const response = await fetch(path,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         });
//       const obj = await response.json();
//       for (let i = 0; i < obj.forecasts.length; ++i) {
//         let f = obj.forecasts[i];
//         if ((Math.abs(indate.getDate() - f.d) % 30) <= interval && lname.toLowerCase() == f.city.toLowerCase()) { // checking if name and date fit
//           let info: WeatherInfo = {
//             temp: f.temp, pressure: f.pressure, rain_chance: f.rain_chance,
//             humidity: f.humidity, condition: f.cond, wind: [f.wind_direction, f.wind_velocity]
//           }
//           result = { date: indate, weather_info: info };
//         }
//       }
//       res(result);
//     } catch (err) {
//       rej(err);
//     }
//   });
// }
function fetchForecastsForLocationJSON1(lname, date) {
    return __awaiter(this, void 0, void 0, function () {
        var fpath;
        var _this = this;
        return __generator(this, function (_a) {
            fpath = "forecasts/";
            if (date.getDate() <= 10)
                fpath += "0";
            fpath += date.getDate().toString();
            if (date.getMonth() <= 10)
                fpath += "0";
            fpath += ((date.getMonth() + 1).toString() + date.getFullYear().toString() + ".json");
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        result = undefined;
                        // we format our date so it fits our json requirements
                        fetch(fpath, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }).then(function (response) {
                            return __awaiter(this, void 0, void 0, function () {
                                var obj, i, c, info;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!response.ok) return [3 /*break*/, 2];
                                            return [4 /*yield*/, response.json()];
                                        case 1:
                                            obj = _a.sent();
                                            for (i = 0; i < obj.cities.length; ++i) {
                                                c = obj.cities[i];
                                                if (lname.toLowerCase() === c.name.toLowerCase()) { // checking if names match
                                                    info = {
                                                        temp: c.temp,
                                                        pressure: c.pressure,
                                                        rain_chance: c.rain_chance,
                                                        humidity: c.humidity,
                                                        condition: c.cond,
                                                        wind_direction: c.wind_direction,
                                                        wind_vel: c.wind_vel
                                                    };
                                                    result = { date: date, weather_info: info };
                                                }
                                            }
                                            res(result);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            });
                        })["catch"](function (err) {
                            rej(err);
                        });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.fetchForecastsForLocationJSON1 = fetchForecastsForLocationJSON1;
function fetchForecastsForLocationJSON2(lname, date) {
    return __awaiter(this, void 0, void 0, function () {
        var fpath;
        var _this = this;
        return __generator(this, function (_a) {
            fpath = "forecasts/";
            if (date.getDate() <= 10)
                fpath += "0";
            fpath += date.getDate().toString();
            if (date.getMonth() <= 10)
                fpath += "0";
            fpath += ((date.getMonth() + 1).toString() + date.getFullYear().toString() + ".json");
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var result, data, obj, i, c, info, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, fs.promises.readFile(fpath, { encoding: 'utf-8' })];
                            case 2:
                                data = _a.sent();
                                console.log(data);
                                if (data) {
                                    obj = JSON.parse(data);
                                    for (i = 0; i < obj.cities.length; ++i) {
                                        c = obj.cities[i];
                                        if (lname.toLowerCase() === c.name.toLowerCase()) { // checking if names match
                                            info = {
                                                temp: c.temp,
                                                pressure: c.pressure,
                                                rain_chance: c.rain_chance,
                                                humidity: c.humidity,
                                                condition: c.cond,
                                                wind_direction: c.wind_direction,
                                                wind_vel: c.wind_vel
                                            };
                                            result = { date: date, weather_info: info };
                                        }
                                    }
                                }
                                res(result);
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                rej(err_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.fetchForecastsForLocationJSON2 = fetchForecastsForLocationJSON2;