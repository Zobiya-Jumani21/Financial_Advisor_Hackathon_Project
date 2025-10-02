// "use client"
// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent } from "@/components/ui/card"
// export interface FormData {
//   budget: number
//   riskTolerance: "conservative" | "moderate" | "aggressive"
//   timeHorizon: "short" | "medium" | "long"
// }
// export function BudgetForm() {
//   const router = useRouter()
//   const [formData, setFormData] = useState<FormData>({
//     budget: 0,
//     riskTolerance: "moderate",
//     timeHorizon: "medium",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<Partial<FormData>>({})
//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {}
//     if (!formData.budget || formData.budget <= 0) {
//       newErrors.budget = "Please enter a valid budget amount"
//     } else if (formData.budget < 100) {
//       newErrors.budget = "Minimum investment amount is $100"
//     }
//     if (!formData.riskTolerance) {
//       newErrors.riskTolerance = "Please select your risk tolerance"
//     }
//     if (!formData.timeHorizon) {
//       newErrors.timeHorizon = "Please select your time horizon"
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!validateForm()) {
//       return
//     }
//     setIsLoading(true)
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     // Store form data in localStorage for the results page
//     localStorage.setItem("portfolioData", JSON.stringify(formData))
//     // Navigate to results page
//     router.push("/results")
//   }
//   const formatCurrency = (value: string) => {
//     const numericValue = value.replace(/[^0-9]/g, "")
//     return numericValue ? Number.parseInt(numericValue).toLocaleString() : ""
//   }
//   const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const rawValue = e.target.value.replace(/[^0-9]/g, "")
//     const numericValue = rawValue ? Number.parseInt(rawValue) : 0
//     setFormData({ ...formData, budget: numericValue })
//     if (errors.budget) {
//       setErrors({ ...errors, budget: undefined })
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* Budget Input */}
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="budget" className="text-base font-semibold">
//             Investment Budget
//           </Label>
//           <p className="text-sm text-muted-foreground mt-1">How much would you like to invest?</p>
//         </div>
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
//           <Input
//             id="budget"
//             type="text"
//             placeholder="10,000"
//             value={formatCurrency(formData.budget.toString())}
//             onChange={handleBudgetChange}
//             className={`pl-8 text-lg h-12 ${errors.budget ? "border-destructive" : ""}`}
//           />
//         </div>
//         {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
//       </div>
//       {/* Risk Tolerance */}
//       <div className="space-y-4">
//         <div>
//           <Label className="text-base font-semibold">Risk Tolerance</Label>
//           <p className="text-sm text-muted-foreground mt-1">How comfortable are you with market volatility?</p>
//         </div>
//         <RadioGroup
//           value={formData.riskTolerance}
//           onValueChange={(value: "conservative" | "moderate" | "aggressive") =>
//             setFormData({ ...formData, riskTolerance: value })
//           }
//           className="space-y-3"
//         >
//           <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <RadioGroupItem value="conservative" id="conservative" />
//                 <div className="flex-1">
//                   <Label htmlFor="conservative" className="cursor-pointer font-medium">
//                     Conservative
//                   </Label>
//                   <p className="text-sm text-muted-foreground">Lower risk, steady returns</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-medium text-primary">3-5% annually</div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <RadioGroupItem value="moderate" id="moderate" />
//                 <div className="flex-1">
//                   <Label htmlFor="moderate" className="cursor-pointer font-medium">
//                     Moderate
//                   </Label>
//                   <p className="text-sm text-muted-foreground">Balanced risk and growth</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-medium text-primary">6-8% annually</div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <RadioGroupItem value="aggressive" id="aggressive" />
//                 <div className="flex-1">
//                   <Label htmlFor="aggressive" className="cursor-pointer font-medium">
//                     Aggressive
//                   </Label>
//                   <p className="text-sm text-muted-foreground">Higher risk, higher potential returns</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-medium text-primary">9-12% annually</div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </RadioGroup>
//         {errors.riskTolerance && <p className="text-sm text-destructive">{errors.riskTolerance}</p>}
//       </div>
//       {/* Time Horizon */}
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="timeHorizon" className="text-base font-semibold">
//             Investment Time Horizon
//           </Label>
//           <p className="text-sm text-muted-foreground mt-1">When do you plan to use this money?</p>
//         </div>
//         <Select
//           value={formData.timeHorizon}
//           onValueChange={(value: "short" | "medium" | "long") => setFormData({ ...formData, timeHorizon: value })}
//         >
//           <SelectTrigger className="h-12 text-base">
//             <SelectValue placeholder="Select your time horizon" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="short">
//               <div className="flex flex-col items-start">
//                 <span className="font-medium">Short-term (1-3 years)</span>
//                 <span className="text-sm text-muted-foreground">Emergency fund, near-term goals</span>
//               </div>
//             </SelectItem>
//             <SelectItem value="medium">
//               <div className="flex flex-col items-start">
//                 <span className="font-medium">Medium-term (3-10 years)</span>
//                 <span className="text-sm text-muted-foreground">House down payment, major purchases</span>
//               </div>
//             </SelectItem>
//             <SelectItem value="long">
//               <div className="flex flex-col items-start">
//                 <span className="font-medium">Long-term (10+ years)</span>
//                 <span className="text-sm text-muted-foreground">Retirement, wealth building</span>
//               </div>
//             </SelectItem>
//           </SelectContent>
//         </Select>
//         {errors.timeHorizon && <p className="text-sm text-destructive">{errors.timeHorizon}</p>}
//       </div>
//       {/* Submit Button */}
//       <div className="pt-4">
//         <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
//           {isLoading ? (
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               <span>Analyzing Your Portfolio...</span>
//             </div>
//           ) : (
//             "Get My Investment Recommendations"
//           )}
//         </Button>
//       </div>
//       {/* Additional Info */}
//       <div className="text-center pt-4">
//         <p className="text-sm text-muted-foreground">
//           Your information is secure and will only be used to generate personalized recommendations.
//         </p>
//       </div>
//     </form>
//   )
// }
// "use client"
// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent } from "@/components/ui/card"
// import { auth, db } from "@/lib/firebase"
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"
// export interface FormData {
//   budget: number
//   riskTolerance: "conservative" | "moderate" | "aggressive"
//   timeHorizon: "short" | "medium" | "long"
// }
// export function BudgetForm() {
//   const router = useRouter()
//   const [formData, setFormData] = useState<FormData>({
//     budget: 0,
//     riskTolerance: "moderate",
//     timeHorizon: "medium",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<Partial<FormData>>({})
//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {}
//     if (!formData.budget || formData.budget <= 0) {
//       newErrors.budget = "Please enter a valid budget amount"
//     } else if (formData.budget < 100) {
//       newErrors.budget = "Minimum investment amount is PKR100"
//     }
//     if (!formData.riskTolerance) newErrors.riskTolerance = "Please select your risk tolerance"
//     if (!formData.timeHorizon) newErrors.timeHorizon = "Please select your time horizon"
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!validateForm()) return
//     // setIsLoading(true)
//     // await new Promise((resolve) => setTimeout(resolve, 1000))
//     // localStorage.setItem("portfolioData", JSON.stringify(formData))
//     // router.push("/results")
//   try {
//     const user = auth.currentUser
//     if (!user) {
//       alert("Please log in first")
//       setIsLoading(false)
//       return
//     }
//     // Save to Firestore
//     const ref = collection(db, "users", user.uid, "portfolios")
//     await addDoc(ref, {
//       budget: formData.budget,
//       riskTolerance: formData.riskTolerance,
//       timeHorizon: formData.timeHorizon,
//       createdAt: serverTimestamp(),
//     })
//     // Redirect to results
//     router.push("/results")
//   } catch (err) {
//     console.error("Error saving portfolio:", err)
//     alert("Something went wrong, try again.")
//   } finally {
//     setIsLoading(false)
//   }
// }
//   }
//   const formatCurrency = (value: string) => {
//     const numericValue = value.replace(/[^0-9]/g, "")
//     return numericValue ? Number.parseInt(numericValue).toLocaleString() : ""
//   }
//   const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const rawValue = e.target.value.replace(/[^0-9]/g, "")
//     const numericValue = rawValue ? Number.parseInt(rawValue) : 0
//     setFormData({ ...formData, budget: numericValue })
//     if (errors.budget) setErrors({ ...errors, budget: undefined })
//   }
//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* Budget Input */}
//       <div className="space-y-4">
//         <Label htmlFor="budget" className="text-base font-semibold">Investment Budget</Label>
//         <p className="text-sm text-muted-foreground mt-1">How much would you like to invest?</p>
//         <div className="relative">
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">PK</span>
//           <Input
//             id="budget"
//             type="text"
//             placeholder="10,000"
//             value={formatCurrency(formData.budget.toString())}
//             onChange={handleBudgetChange}
//             className={`pl-8 text-lg h-12 ${errors.budget ? "border-destructive" : ""}`}
//           />
//         </div>
//         {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
//       </div>
//       {/* Risk Tolerance */}
//       <div className="space-y-4">
//         <Label className="text-base font-semibold">Risk Tolerance</Label>
//         <p className="text-sm text-muted-foreground mt-1">How comfortable are you with market volatility?</p>
//         <RadioGroup
//           value={formData.riskTolerance}
//           onValueChange={(value: "conservative" | "moderate" | "aggressive") =>
//             setFormData({ ...formData, riskTolerance: value })
//           }
//           className="space-y-3"
//         >
//           {["conservative", "moderate", "aggressive"].map((level) => (
//             <Card key={level} className="hover:bg-muted/50 transition-colors cursor-pointer">
//               <CardContent className="p-4 flex items-center justify-between">
//                 <RadioGroupItem value={level} id={level} />
//                 <div className="flex-1 ml-2">
//                   <Label htmlFor={level} className="cursor-pointer font-medium capitalize">{level}</Label>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </RadioGroup>
//         {errors.riskTolerance && <p className="text-sm text-destructive">{errors.riskTolerance}</p>}
//       </div>
//       {/* Time Horizon */}
//       <div className="space-y-4">
//         <Label htmlFor="timeHorizon" className="text-base font-semibold">Investment Time Horizon</Label>
//         <p className="text-sm text-muted-foreground mt-1">When do you plan to use this money?</p>
//         <Select
//           value={formData.timeHorizon}
//           onValueChange={(value: "short" | "medium" | "long") => setFormData({ ...formData, timeHorizon: value })}
//         >
//           <SelectTrigger className="h-12 text-base">
//             <SelectValue placeholder="Select your time horizon" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="short">Short-term (1-3 years)</SelectItem>
//             <SelectItem value="medium">Medium-term (3-10 years)</SelectItem>
//             <SelectItem value="long">Long-term (10+ years)</SelectItem>
//           </SelectContent>
//         </Select>
//         {errors.timeHorizon && <p className="text-sm text-destructive">{errors.timeHorizon}</p>}
//       </div>
//       <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
//         {isLoading ? "Analyzing Your Portfolio..." : "Get My Investment Recommendations"}
//       </Button>
//     </form>
//   )
// }
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
exports.BudgetForm = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var radio_group_1 = require("@/components/ui/radio-group");
var select_1 = require("@/components/ui/select");
var card_1 = require("@/components/ui/card");
var firebase_1 = require("@/lib/firebase");
var firestore_1 = require("firebase/firestore");
function BudgetForm() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState({
        budget: 0,
        riskTolerance: "moderate",
        timeHorizon: "medium"
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState({}), errors = _c[0], setErrors = _c[1];
    var validateForm = function () {
        var newErrors = {};
        if (!formData.budget || formData.budget <= 0) {
            newErrors.budget = "Please enter a valid budget amount";
        }
        else if (formData.budget < 100) {
            newErrors.budget = "Minimum investment amount is PKR100";
        }
        if (!formData.riskTolerance)
            newErrors.riskTolerance = "Please select your risk tolerance";
        if (!formData.timeHorizon)
            newErrors.timeHorizon = "Please select your time horizon";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var user, ref, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm())
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    user = firebase_1.auth.currentUser;
                    if (!user) {
                        alert("Please log in first");
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    ref = firestore_1.collection(firebase_1.db, "users", user.uid, "portfolios");
                    return [4 /*yield*/, firestore_1.addDoc(ref, {
                            budget: formData.budget,
                            riskTolerance: formData.riskTolerance,
                            timeHorizon: formData.timeHorizon,
                            createdAt: firestore_1.serverTimestamp()
                        })
                        // Redirect to results page
                    ];
                case 2:
                    _a.sent();
                    // Redirect to results page
                    router.push("/results");
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error saving portfolio:", err_1);
                    alert("Something went wrong, try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var formatCurrency = function (value) {
        var numericValue = value.replace(/[^0-9]/g, "");
        return numericValue ? Number.parseInt(numericValue).toLocaleString() : "";
    };
    var handleBudgetChange = function (e) {
        var rawValue = e.target.value.replace(/[^0-9]/g, "");
        var numericValue = rawValue ? Number.parseInt(rawValue) : 0;
        setFormData(__assign(__assign({}, formData), { budget: numericValue }));
        if (errors.budget)
            setErrors(__assign(__assign({}, errors), { budget: undefined }));
    };
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" },
        React.createElement("div", { className: "space-y-4" },
            React.createElement(label_1.Label, { htmlFor: "budget", className: "text-base font-semibold" }, "Investment Budget"),
            React.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, "How much would you like to invest?"),
            React.createElement("div", { className: "relative" },
                React.createElement("span", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" }, "PK"),
                React.createElement(input_1.Input, { id: "budget", type: "text", placeholder: "10,000", value: formatCurrency(formData.budget.toString()), onChange: handleBudgetChange, className: "pl-8 text-lg h-12 " + (errors.budget ? "border-destructive" : "") })),
            errors.budget && React.createElement("p", { className: "text-sm text-destructive" }, errors.budget)),
        React.createElement("div", { className: "space-y-4" },
            React.createElement(label_1.Label, { className: "text-base font-semibold" }, "Risk Tolerance"),
            React.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, "How comfortable are you with market volatility?"),
            React.createElement(radio_group_1.RadioGroup, { value: formData.riskTolerance, onValueChange: function (value) {
                    return setFormData(__assign(__assign({}, formData), { riskTolerance: value }));
                }, className: "space-y-3" }, ["conservative", "moderate", "aggressive"].map(function (level) { return (React.createElement(card_1.Card, { key: level, className: "hover:bg-muted/50 transition-colors cursor-pointer" },
                React.createElement(card_1.CardContent, { className: "p-4 flex items-center justify-between" },
                    React.createElement(radio_group_1.RadioGroupItem, { value: level, id: level }),
                    React.createElement("div", { className: "flex-1 ml-2" },
                        React.createElement(label_1.Label, { htmlFor: level, className: "cursor-pointer font-medium capitalize" }, level))))); })),
            errors.riskTolerance && React.createElement("p", { className: "text-sm text-destructive" }, errors.riskTolerance)),
        React.createElement("div", { className: "space-y-4" },
            React.createElement(label_1.Label, { htmlFor: "timeHorizon", className: "text-base font-semibold" }, "Investment Time Horizon"),
            React.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, "When do you plan to use this money?"),
            React.createElement(select_1.Select, { value: formData.timeHorizon, onValueChange: function (value) { return setFormData(__assign(__assign({}, formData), { timeHorizon: value })); } },
                React.createElement(select_1.SelectTrigger, { className: "h-12 text-base" },
                    React.createElement(select_1.SelectValue, { placeholder: "Select your time horizon" })),
                React.createElement(select_1.SelectContent, null,
                    React.createElement(select_1.SelectItem, { value: "short" }, "Short-term (1-3 years)"),
                    React.createElement(select_1.SelectItem, { value: "medium" }, "Medium-term (3-10 years)"),
                    React.createElement(select_1.SelectItem, { value: "long" }, "Long-term (10+ years)"))),
            errors.timeHorizon && React.createElement("p", { className: "text-sm text-destructive" }, errors.timeHorizon)),
        React.createElement(button_1.Button, { type: "submit", size: "lg", className: "w-full h-12 text-base font-semibold", disabled: isLoading }, isLoading ? "Analyzing Your Portfolio..." : "Get My Investment Recommendations")));
}
exports.BudgetForm = BudgetForm;
