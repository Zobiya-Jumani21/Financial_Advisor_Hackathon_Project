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
exports.getPortfolio = exports.savePortfolio = void 0;
// lib/portfolio.ts
var firebase_1 = require("./firebase");
var firestore_1 = require("firebase/firestore");
function savePortfolio(formData) {
    return __awaiter(this, void 0, void 0, function () {
        var user, portfolioRef;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = firebase_1.auth.currentUser;
                    if (!user)
                        throw new Error("User not logged in");
                    portfolioRef = firestore_1.doc(firebase_1.db, "portfolios", user.uid);
                    return [4 /*yield*/, firestore_1.setDoc(portfolioRef, __assign(__assign({}, formData), { updatedAt: new Date() }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.savePortfolio = savePortfolio;
function getPortfolio() {
    return __awaiter(this, void 0, void 0, function () {
        var user, portfolioRef, snap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = firebase_1.auth.currentUser;
                    if (!user)
                        throw new Error("User not logged in");
                    portfolioRef = firestore_1.doc(firebase_1.db, "portfolios", user.uid);
                    return [4 /*yield*/, firestore_1.getDoc(portfolioRef)];
                case 1:
                    snap = _a.sent();
                    if (snap.exists()) {
                        return [2 /*return*/, snap.data()];
                    }
                    else {
                        return [2 /*return*/, null]; // user has no saved portfolio
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPortfolio = getPortfolio;
