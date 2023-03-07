"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import { Issuer } from "openid-client";
var promises_1 = __importDefault(require("node:fs/promises"));
var fp_1 = __importDefault(require("lodash/fp"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var config_1 = __importDefault(require("../config"));
var usersJsonPath = "../data/users.json";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
var asyncInterval = function (callback, intervalTime, timeout) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var startTime = process.hrtime();
                var interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var answer;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback()];
                            case 1:
                                answer = _a.sent();
                                if (!answer.error) {
                                    clearInterval(interval);
                                    resolve(answer);
                                }
                                else if (process.hrtime(startTime) >= timeout || fp_1["default"].contains(answer.error, ["authorization_declined", "bad_verification_code", "expired_token"])) {
                                    clearInterval(interval);
                                    console.error("Login failed, reason: ".concat(answer.error));
                                    reject(answer);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, intervalTime);
            })];
    });
}); };
function pollUserLogin(deviceAuthorizationResult) {
    var interval = deviceAuthorizationResult.interval, expires_in = deviceAuthorizationResult.expires_in, device_code = deviceAuthorizationResult.device_code;
    var pollReq = function () {
        var body = {
            grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            tenant: config_1["default"].tenant_id,
            client_id: config_1["default"].client_id,
            device_code: device_code
        };
        return (0, node_fetch_1["default"])("https://login.microsoftonline.com/".concat(config_1["default"].tenant_id, "/oauth2/v2.0/token"), {
            method: "post",
            body: new URLSearchParams(body).toString(),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (res) { return res.json(); });
    };
    return asyncInterval(pollReq, interval * 1000, expires_in * 1000);
}
function displayMessageToUser(deviceAuthPromise) {
    return deviceAuthPromise.then(function (res) {
        var message = res.message;
        console.log(message);
        return res;
    });
}
function requestDeviceAuthorization() {
    var body = {
        client_id: config_1["default"].client_id,
        scope: "openid offline_access"
    };
    return (0, node_fetch_1["default"])("https://login.microsoftonline.com/".concat(config_1["default"].tenant_id, "/oauth2/v2.0/devicecode"), {
        method: "post",
        body: new URLSearchParams(body).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function (res) { return res.json(); });
}
// function tokenRefresh(refreshToken: String): Promise<object> {
// }
function login(userName) {
    return __awaiter(this, void 0, void 0, function () {
        var usersJson, isUserAlreadyLoggedIn, userAccessInformation, isAccessTokenExpired, res, loginRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("login");
                    return [4 /*yield*/, getUsers()];
                case 1:
                    usersJson = _a.sent();
                    isUserAlreadyLoggedIn = fp_1["default"].compose(fp_1["default"].contains(userName), fp_1["default"].keys)(usersJson);
                    if (!isUserAlreadyLoggedIn) return [3 /*break*/, 2];
                    userAccessInformation = usersJson[userName.toString()];
                    isAccessTokenExpired = Math.floor((Date.now() - userAccessInformation.creation_time) / 1000) > userAccessInformation.expires_in;
                    if (isAccessTokenExpired) {
                    }
                    else {
                        return [2 /*return*/, Promise.resolve(userAccessInformation.access_token)];
                    }
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, displayMessageToUser(requestDeviceAuthorization())];
                case 3:
                    res = _a.sent();
                    console.log(res);
                    return [4 /*yield*/, pollUserLogin(res)];
                case 4:
                    loginRes = _a.sent();
                    console.log(loginRes);
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = login;
function addUserLogin(userName, login) {
    return __awaiter(this, void 0, void 0, function () {
        var usersJson, updatedUsersJson;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getUsers()];
                case 1:
                    usersJson = _b.sent();
                    updatedUsersJson = __assign(__assign({}, usersJson), (_a = {}, _a[userName.toString()] = login, _a));
                    return [2 /*return*/, writeUsers(updatedUsersJson)];
            }
        });
    });
}
function writeUsers(users) {
    return promises_1["default"].writeFile(usersJsonPath, JSON.stringify(users));
}
function getUsers() {
    return promises_1["default"].readFile(usersJsonPath, { encoding: 'utf8' }).then(function (buf) { return JSON.parse(buf); })["catch"](function (err) { return console.log(err); });
}
// login("test")
