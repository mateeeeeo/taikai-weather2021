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
exports.fetchSoilMoisture = exports.fetchAirQuality = exports.soilMoistureValues = void 0;
var DateFormat_1 = require("./src/helpers/DateFormat");
exports.soilMoistureValues = {};
// fetches soil moisture values from dClimate's api, and stores values no older than a month before today's date, to conserve memory
// export async function fetchSoilMoistureValues() {
//     const locations: Location[] = await fetchLocations();
//     const values: Record<string, number>[] = [];
//     for (let location of locations) {
//         const res = await fetch(`/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/${location.lat_long.lat}_${location.lat_long.long}?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true`);
//         const data: Record<string, number> = (await res.json()).data;
//         const earliestDate = new Date();
//         earliestDate.setMonth(earliestDate.getMonth() - 1);
//         console.log(Object.entries(data).length);
//         const earliestIndex = Object.keys(data).findIndex(date => date === toDClimateFormat(earliestDate));
//         const constrainedDates = Object.entries(data).slice(earliestIndex);
//         values.push(Object.fromEntries(constrainedDates));
//         console.log(Object.fromEntries(constrainedDates));
//     }
//     console.log(values);
// }
// async function fetchLocations(): Promise<Location[]> {
//     return new Promise(async res => {
//         const response = await fetch('locations.json');
//         const data = await response.json();
//         const locations: Location[] = [];
//         for (const [key, value] of Object.entries(data)) {
//             locations.push({ name: key, lat_long: { lat: (value as any).lat, long: (value as any).long } });
//         }
//         console.log(locations);
//         res(locations);
//     });
// }
function fetchAirQuality(city, country, d) {
    return __awaiter(this, void 0, void 0, function () {
        var date1, date2, datestr1, datestr2;
        var _this = this;
        return __generator(this, function (_a) {
            date1 = d, date2 = d;
            date1.setDate(date1.getDate() - 4);
            date2.setDate(date1.getDate() + 4);
            datestr1 = date1.toISOString().replaceAll(':', "%3A").replaceAll('+', "%2B");
            datestr2 = date2.toISOString().replaceAll(':', "%3A").replaceAll('+', "%2B");
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var result, response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4 /*yield*/, fetch("https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=" + datestr1 + "&date_to=" + datestr2 + "&limit=10&page=1&offset=0&sort=desc&radius=1000&country_id=" + country + "&city=" + city + "&order_by=datetime", {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        }
                                    }).then(function (response) {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var sum, values, obj, i, c;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!!response.ok) return [3 /*break*/, 1];
                                                        throw new Error("There isn't any data available for this interval.");
                                                    case 1:
                                                        sum = 0;
                                                        values = 0;
                                                        result = [0, 0];
                                                        return [4 /*yield*/, response.json()];
                                                    case 2:
                                                        obj = _a.sent();
                                                        for (i = 0; i < obj.results.length; ++i) {
                                                            c = obj.results[i];
                                                            if (c.date.utc == d.toISOString())
                                                                result[0] = c.value;
                                                            sum += c.value;
                                                            values++;
                                                        }
                                                        result[1] = sum / values;
                                                        res(result);
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        });
                                    })["catch"](function (err) {
                                        rej(err);
                                    })];
                            case 1:
                                response = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.fetchAirQuality = fetchAirQuality;
function fetchSoilMoisture(latLong, date) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            console.log('soil moisture');
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var response, resJson, data, dClimateDateStr, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                console.log('fetching');
                                return [4 /*yield*/, fetch("https://api.dclimate.net/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/" + latLong.lat + "_" + latLong.long + "?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true", {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        }
                                    })];
                            case 1:
                                response = _a.sent();
                                console.log('fetched');
                                return [4 /*yield*/, response.json()];
                            case 2:
                                resJson = _a.sent();
                                data = resJson.data;
                                console.log('soil moisture');
                                console.log(data);
                                dClimateDateStr = DateFormat_1.toDClimateFormat(date);
                                res(data[dClimateDateStr]);
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                console.log(err_1);
                                rej(err_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.fetchSoilMoisture = fetchSoilMoisture;
