"use strict";
exports.__esModule = true;
exports.WeatherCondition = exports.WindDirection = exports.Severity = exports.WeatherType = void 0;
var WeatherType;
(function (WeatherType) {
    WeatherType[WeatherType["sunny"] = 0] = "sunny";
    WeatherType[WeatherType["clear"] = 1] = "clear";
    WeatherType[WeatherType["cloudy"] = 2] = "cloudy";
    WeatherType[WeatherType["rain"] = 3] = "rain";
    WeatherType[WeatherType["heavyRain"] = 4] = "heavyRain";
    WeatherType[WeatherType["storm"] = 5] = "storm";
})(WeatherType = exports.WeatherType || (exports.WeatherType = {}));
var Severity;
(function (Severity) {
    Severity[Severity["great"] = 0] = "great";
    Severity[Severity["good"] = 1] = "good";
    Severity[Severity["ok"] = 2] = "ok";
    Severity[Severity["severe"] = 3] = "severe";
    Severity[Severity["verySevere"] = 4] = "verySevere";
})(Severity = exports.Severity || (exports.Severity = {}));
var WindDirection;
(function (WindDirection) {
    WindDirection[WindDirection["N"] = 0] = "N";
    WindDirection[WindDirection["NE"] = 1] = "NE";
    WindDirection[WindDirection["E"] = 2] = "E";
    WindDirection[WindDirection["SE"] = 3] = "SE";
    WindDirection[WindDirection["S"] = 4] = "S";
    WindDirection[WindDirection["SW"] = 5] = "SW";
    WindDirection[WindDirection["W"] = 6] = "W";
    WindDirection[WindDirection["NW"] = 7] = "NW";
    WindDirection[WindDirection["Unknown"] = 8] = "Unknown";
})(WindDirection = exports.WindDirection || (exports.WindDirection = {}));
var WeatherCondition;
(function (WeatherCondition) {
    WeatherCondition[WeatherCondition["Sunny"] = 0] = "Sunny";
    WeatherCondition[WeatherCondition["Clear"] = 1] = "Clear";
    WeatherCondition[WeatherCondition["Partly Cloudy"] = 2] = "Partly Cloudy";
    WeatherCondition[WeatherCondition["Cloudy"] = 3] = "Cloudy";
    WeatherCondition[WeatherCondition["Foggy"] = 4] = "Foggy";
})(WeatherCondition = exports.WeatherCondition || (exports.WeatherCondition = {}));
