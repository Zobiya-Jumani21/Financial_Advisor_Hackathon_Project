'use client';
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
exports.Header = void 0;
var link_1 = require("next/link");
var react_1 = require("react");
var auth_1 = require("firebase/auth");
var firebase_1 = require("@/lib/firebase");
var firestore_1 = require("firebase/firestore");
function Header() {
    var _this = this;
    var _a = react_1.useState(false), dropdownOpen = _a[0], setDropdownOpen = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    react_1.useEffect(function () {
        var unsubscribe = auth_1.onAuthStateChanged(firebase_1.auth, function (firebaseUser) { return __awaiter(_this, void 0, void 0, function () {
            var docRef, docSnap, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!firebaseUser) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        docRef = firestore_1.doc(firebase_1.db, "users", firebaseUser.uid);
                        return [4 /*yield*/, firestore_1.getDoc(docRef)];
                    case 2:
                        docSnap = _a.sent();
                        if (docSnap.exists()) {
                            data = docSnap.data();
                            setUser({
                                name: ((data.firstName || "") + " " + (data.lastName || "")).trim()
                            });
                        }
                        else {
                            setUser({ name: firebaseUser.email || "User" });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Error fetching user profile:", err_1);
                        setUser({ name: firebaseUser.email || "User" });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        setUser(null);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        return function () { return unsubscribe(); };
    }, []);
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.signOut(firebase_1.auth)];
                case 1:
                    _a.sent();
                    setUser(null);
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("header", { className: "border-b bg-card/50 backdrop-blur-sm sticky top-0 z-60" },
        React.createElement("div", { className: "container mx-auto px-4 py-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2" },
                    React.createElement("div", { className: "w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center" },
                        React.createElement("span", { className: "text-white font-bold text-lg" }, "F")),
                    React.createElement("span", { className: "text-xl font-bold text-foreground" }, "FinSmart")),
                React.createElement("nav", { className: "hidden md:flex items-center space-x-6" },
                    React.createElement(link_1["default"], { href: "/", className: "text-muted-foreground hover:text-foreground transition-colors" }, "Home"),
                    React.createElement(link_1["default"], { href: "/results", className: "text-muted-foreground hover:text-foreground transition-colors" }, "Portfolio"),
                    React.createElement(link_1["default"], { href: "/Investment-info", className: "text-muted-foreground hover:text-foreground transition-colors" }, "About Investments"),
                    user ? (React.createElement(React.Fragment, null,
                        React.createElement("button", { onClick: function () { return setDropdownOpen(!dropdownOpen); }, className: "flex items-center space-x-2 rounded-md hover:bg-muted px-3 py-1 transition" },
                            React.createElement("span", { className: "text-sm text-foreground font-medium" }, user.name)),
                        dropdownOpen && (React.createElement("div", { className: "absolute right-4 mt-12 w-40 bg-card border border-border rounded shadow-lg animate-fade-in z-50" },
                            React.createElement(link_1["default"], { href: "/results", className: "block px-4 py-2 text-sm text-foreground hover:bg-muted transition" }, "Portfolio"),
                            React.createElement("button", { onClick: handleLogout, className: "w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/20 transition" }, "Logout"))))) : (React.createElement(link_1["default"], { href: "/login", className: "text-muted-foreground hover:text-foreground transition-colors" }, "Login")))))));
}
exports.Header = Header;
