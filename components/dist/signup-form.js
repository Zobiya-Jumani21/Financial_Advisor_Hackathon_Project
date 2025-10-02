"use client";
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
exports.SignupForm = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var checkbox_1 = require("@/components/ui/checkbox");
var auth_1 = require("firebase/auth");
var firebase_1 = require("@/lib/firebase");
//writes user data into Firestore.
var firestore_1 = require("firebase/firestore");
function SignupForm() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState({}), errors = _c[0], setErrors = _c[1];
    var validateForm = function () {
        var newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain uppercase, lowercase, and number";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var userCredential, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm())
                        return [2 /*return*/];
                    setIsLoading(true);
                    setErrors({});
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, auth_1.createUserWithEmailAndPassword(firebase_1.auth, //creat auth user
                        formData.email, formData.password)];
                case 2:
                    userCredential = _a.sent();
                    user = userCredential.user;
                    // ✅ Update profile with name
                    return [4 /*yield*/, auth_1.updateProfile(user, {
                            displayName: formData.firstName + " " + formData.lastName
                        })
                        // ✅ Save user to Firestore we created docunment
                    ];
                case 3:
                    // ✅ Update profile with name
                    _a.sent();
                    // ✅ Save user to Firestore we created docunment
                    return [4 /*yield*/, firestore_1.setDoc(firestore_1.doc(firebase_1.db, "users", user.uid), {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            createdAt: firestore_1.serverTimestamp()
                        })];
                case 4:
                    // ✅ Save user to Firestore we created docunment
                    _a.sent();
                    console.log("Signup + Firestore success:", user.email);
                    // Save locally (optional)
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("userEmail", user.email || "");
                    // Redirect
                    router.push("/");
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error("Signup failed:", error_1.message);
                    setErrors({ email: error_1.message });
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (field, value) {
        var _a, _b;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[field] = value, _a)));
        if (errors[field]) {
            setErrors(__assign(__assign({}, errors), (_b = {}, _b[field] = undefined, _b)));
        }
    };
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement("div", { className: "grid grid-cols-2 gap-4" },
            React.createElement("div", { className: "space-y-2" },
                React.createElement(label_1.Label, { htmlFor: "firstName" }, "First Name"),
                React.createElement(input_1.Input, { id: "firstName", type: "text", placeholder: "Umar", value: formData.firstName, onChange: function (e) { return handleInputChange("firstName", e.target.value); }, className: errors.firstName ? "border-destructive" : "" }),
                errors.firstName && React.createElement("p", { className: "text-sm text-destructive" }, errors.firstName)),
            React.createElement("div", { className: "space-y-2" },
                React.createElement(label_1.Label, { htmlFor: "lastName" }, "Last Name"),
                React.createElement(input_1.Input, { id: "lastName", type: "text", placeholder: "Jahangir", value: formData.lastName, onChange: function (e) { return handleInputChange("lastName", e.target.value); }, className: errors.lastName ? "border-destructive" : "" }),
                errors.lastName && React.createElement("p", { className: "text-sm text-destructive" }, errors.lastName))),
        React.createElement("div", { className: "space-y-2" },
            React.createElement(label_1.Label, { htmlFor: "email" }, "Email Address"),
            React.createElement(input_1.Input, { id: "email", type: "email", placeholder: "umarjahangir@example.com", value: formData.email, onChange: function (e) { return handleInputChange("email", e.target.value); }, className: errors.email ? "border-destructive" : "" }),
            errors.email && React.createElement("p", { className: "text-sm text-destructive" }, errors.email)),
        React.createElement("div", { className: "space-y-2" },
            React.createElement(label_1.Label, { htmlFor: "password" }, "Password"),
            React.createElement(input_1.Input, { id: "password", type: "password", placeholder: "Create a strong password", value: formData.password, onChange: function (e) { return handleInputChange("password", e.target.value); }, className: errors.password ? "border-destructive" : "" }),
            errors.password && React.createElement("p", { className: "text-sm text-destructive" }, errors.password),
            React.createElement("p", { className: "text-xs text-muted-foreground" }, "Must contain at least 8 characters with uppercase, lowercase, and number")),
        React.createElement("div", { className: "space-y-2" },
            React.createElement(label_1.Label, { htmlFor: "confirmPassword" }, "Confirm Password"),
            React.createElement(input_1.Input, { id: "confirmPassword", type: "password", placeholder: "Confirm your password", value: formData.confirmPassword, onChange: function (e) { return handleInputChange("confirmPassword", e.target.value); }, className: errors.confirmPassword ? "border-destructive" : "" }),
            errors.confirmPassword && React.createElement("p", { className: "text-sm text-destructive" }, errors.confirmPassword)),
        React.createElement("div", { className: "space-y-2" },
            React.createElement("div", { className: "flex items-start space-x-2" },
                React.createElement(checkbox_1.Checkbox, { id: "agreeToTerms", checked: formData.agreeToTerms, onCheckedChange: function (checked) { return handleInputChange("agreeToTerms", checked); }, className: "mt-1" }),
                React.createElement(label_1.Label, { htmlFor: "agreeToTerms", className: "text-sm leading-relaxed" },
                    "I agree to the",
                    " ",
                    React.createElement(button_1.Button, { variant: "link", className: "p-0 h-auto text-sm" }, "Terms of Service"),
                    " and",
                    " ",
                    React.createElement(button_1.Button, { variant: "link", className: "p-0 h-auto text-sm" }, "Privacy Policy"))),
            errors.agreeToTerms && React.createElement("p", { className: "text-sm text-destructive" }, errors.agreeToTerms)),
        React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? (React.createElement("div", { className: "flex items-center space-x-2" },
            React.createElement("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
            React.createElement("span", null, "Creating account..."))) : ("Create Account"))));
}
exports.SignupForm = SignupForm;
