// "use client" //runs in the browser, not the server.
// //useEffects. runs code after the page loads (like “get my data”).
// //useState → remembers information like portfolio and loading state.
// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Header } from "@/components/header2"
// import { Footer } from "@/components/footer"
// import { PortfolioChart } from "@/components/portfolio-chart"
// import { InvestmentCard } from "@/components/investment-card"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// //a function that creates your portfolio suggestions.
// import { generateInvestmentRecommendations, type PortfolioRecommendation } from "@/lib/investment-engine"
// import type { FormData } from "@/components/budget-form"
// export default function ResultsPage() {
//   const router = useRouter()
//   const [portfolio, setPortfolio] = useState<PortfolioRecommendation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   useEffect(() => {
//     // Get form data from localStorage
//     const storedData = localStorage.getItem("portfolioData")
//     if (!storedData) {
//       // Redirect to home if no data found
//       router.push("/")
//       return
//     }
//     try {
//       const formData: FormData = JSON.parse(storedData)
//       const recommendations = generateInvestmentRecommendations(formData)
//       setPortfolio(recommendations)
//     } catch (error) {
//       console.error("Error generating recommendations:", error)
//       router.push("/")
//     } finally {
//       setIsLoading(false)
//     }
//   }, [router])
// //Sends the user back to the start to change their input.
//   const handleRecalculate = () => {
//     router.push("/")
//   }
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your portfolio recommendations...</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     )
//   }
//   if (!portfolio) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-4">No Portfolio Data Found</h2>
//             <p className="text-muted-foreground mb-6">Please complete the form to get your recommendations.</p>
//             <Button onClick={() => router.push("/")}>Get Started</Button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     )
//   }
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
//                 Your Personalized
//                 <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                   {" "}
//                   Investment Portfolio
//                 </span>
//               </h1>
//               <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">{portfolio.summary}</p>
//             </div>
//             {/* Portfolio Overview */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//               <Card className="text-center">
//                 <CardContent className="p-6">
//                   <div className="text-3xl font-bold text-primary mb-2">PKR{portfolio.totalAmount.toLocaleString()}</div>
//                   <p className="text-muted-foreground">Total Investment</p>
//                 </CardContent>
//               </Card>
//               <Card className="text-center">
//                 <CardContent className="p-6">
//                   <div className="text-3xl font-bold text-secondary mb-2">{portfolio.expectedAnnualReturn}</div>
//                   <p className="text-muted-foreground">Expected Annual Return</p>
//                 </CardContent>
//               </Card>
//               <Card className="text-center">
//                 <CardContent className="p-6">
//                   <Badge variant="secondary" className="text-base px-3 py-1">
//                     {portfolio.riskProfile}
//                   </Badge>
//                   <p className="text-muted-foreground mt-2">Risk Profile</p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section>
//         {/* Portfolio Visualization */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold text-balance mb-4">Portfolio Allocation</h2>
//                 <p className="text-muted-foreground text-balance">
//                   Here's how your investment will be distributed across different asset classes.
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <PortfolioChart recommendations={portfolio.recommendations} />
//                 </div>
//                 <div className="space-y-4">
//                   {portfolio.recommendations.map((recommendation) => (
//                     <div key={recommendation.id} className="flex items-center justify-between p-4 rounded-lg border">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-2xl">{recommendation.icon}</span>
//                         <div>
//                           <div className="font-semibold">{recommendation.name}</div>
//                           <div className="text-sm text-muted-foreground">Expected: {recommendation.expectedReturn}</div>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-bold text-lg">{recommendation.percentage}%</div>
//                         <div className="text-sm text-muted-foreground">${recommendation.amount.toLocaleString()}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Detailed Recommendations */}
//         <section className="py-16 bg-muted/30">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl font-bold text-balance mb-4">Investment Breakdown</h2>
//                 <p className="text-muted-foreground text-balance">
//                   Detailed analysis of each recommended investment category.
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {portfolio.recommendations.map((recommendation) => (
//                   <InvestmentCard key={recommendation.id} recommendation={recommendation} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Action Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4 text-center">
//             <div className="max-w-2xl mx-auto">
//               <h2 className="text-3xl font-bold text-balance mb-4">Ready to Adjust Your Portfolio?</h2>
//               <p className="text-muted-foreground text-balance mb-8">
//                 Want to try different parameters or update your investment amount? You can recalculate your portfolio
//                 anytime.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button size="lg" onClick={handleRecalculate} className="text-base">
//                   Recalculate Portfolio
//                 </Button>
//                 <Button size="lg" variant="outline" className="text-base bg-transparent" disabled>
//                   Download Report (Coming Soon)
//                 </Button>
//               </div>
//               {/* <p className="text-sm text-muted-foreground mt-6">
//                 <strong className="text-destructive">Important:</strong> This is a demo application. Always consult with
//                 a qualified financial advisor before making investment decisions.
//               </p> */}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var header2_1 = require("@/components/header2");
var footer_1 = require("@/components/footer");
var portfolio_chart_1 = require("@/components/portfolio-chart");
var investment_card_1 = require("@/components/investment-card");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var investment_engine_1 = require("@/lib/investment-engine");
function ResultsPage() {
    var router = navigation_1.useRouter();
    // portfolio = stores the investment recommendations.
    // isLoading = shows spinner while loading.
    var _a = react_1.useState(null), portfolio = _a[0], setPortfolio = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    //get data
    react_1.useEffect(function () {
        var storedData = localStorage.getItem("portfolioData");
        if (!storedData) {
            router.push("/");
            return;
        }
        try {
            var formData = JSON.parse(storedData);
            var recommendations = investment_engine_1.generateInvestmentRecommendations(formData);
            setPortfolio(recommendations);
        }
        catch (error) {
            console.error("Error generating recommendations:", error);
            router.push("/");
        }
        finally {
            setIsLoading(false);
        }
    }, [router]);
    var handleRecalculate = function () { return router.push("/"); };
    if (isLoading) {
        return (React.createElement("div", { className: "min-h-screen flex flex-col" },
            React.createElement(header2_1.Header, null),
            React.createElement("main", { className: "flex-1 flex items-center justify-center" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", { className: "w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" }),
                    React.createElement("p", { className: "text-muted-foreground" }, "Loading your portfolio recommendations..."))),
            React.createElement(footer_1.Footer, null)));
    }
    if (!portfolio) {
        return (React.createElement("div", { className: "min-h-screen flex flex-col" },
            React.createElement(header2_1.Header, null),
            React.createElement("main", { className: "flex-1 flex items-center justify-center" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("h2", { className: "text-2xl font-bold mb-4" }, "No Portfolio Data Found"),
                    React.createElement("p", { className: "text-muted-foreground mb-6" }, "Please complete the form to get your recommendations."),
                    React.createElement(button_1.Button, { onClick: function () { return router.push("/"); } }, "Get Started"))),
            React.createElement(footer_1.Footer, null)));
    }
    return (React.createElement("div", { className: "min-h-screen flex flex-col" },
        React.createElement(header2_1.Header, null),
        React.createElement("main", { className: "flex-1" },
            React.createElement("section", { className: "bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "text-center mb-8" },
                        React.createElement("h1", { className: "text-4xl md:text-5xl font-bold text-balance mb-4" },
                            "Your Personalized",
                            React.createElement("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" },
                                " ",
                                "Investment Portfolio")),
                        React.createElement("p", { className: "text-xl text-muted-foreground text-balance max-w-2xl mx-auto" }, portfolio.summary)),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" },
                        React.createElement(card_1.Card, { className: "text-center" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "text-3xl font-bold text-primary mb-2" },
                                    "PKR ",
                                    portfolio.totalAmount.toLocaleString()),
                                React.createElement("p", { className: "text-muted-foreground" }, "Total Investment"))),
                        React.createElement(card_1.Card, { className: "text-center" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "text-3xl font-bold text-secondary mb-2" }, portfolio.expectedAnnualReturn),
                                React.createElement("p", { className: "text-muted-foreground" }, "Expected Annual Return"))),
                        React.createElement(card_1.Card, { className: "text-center" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement(badge_1.Badge, { variant: "secondary", className: "text-base px-3 py-1" }, portfolio.riskProfile),
                                React.createElement("p", { className: "text-muted-foreground mt-2" }, "Risk Profile")))))),
            React.createElement("section", { className: "py-16" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-6xl mx-auto" },
                        React.createElement("div", { className: "text-center mb-12" },
                            React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Portfolio Allocation"),
                            React.createElement("p", { className: "text-muted-foreground text-balance" }, "Here's how your investment will be distributed across different asset classes.")),
                        React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" },
                            React.createElement(portfolio_chart_1.PortfolioChart, { recommendations: portfolio.recommendations }),
                            React.createElement("div", { className: "space-y-4" }, portfolio.recommendations.map(function (rec) { return (React.createElement("div", { key: rec.id, className: "flex items-center justify-between p-4 rounded-lg border" },
                                React.createElement("div", { className: "flex items-center space-x-3" },
                                    React.createElement("span", { className: "text-2xl" }, rec.icon),
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "font-semibold" }, rec.name),
                                        React.createElement("div", { className: "text-sm text-muted-foreground" },
                                            "Expected: ",
                                            rec.expectedReturn))),
                                React.createElement("div", { className: "text-right" },
                                    React.createElement("div", { className: "font-bold text-lg" },
                                        rec.percentage,
                                        "%"),
                                    React.createElement("div", { className: "text-sm text-muted-foreground" },
                                        "PKR ",
                                        rec.amount.toLocaleString())))); })))))),
            React.createElement("section", { className: "py-16 bg-muted/30" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-6xl mx-auto" },
                        React.createElement("div", { className: "text-center mb-12" },
                            React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Investment Breakdown"),
                            React.createElement("p", { className: "text-muted-foreground text-balance" }, "Detailed analysis of each recommended investment category.")),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" }, portfolio.recommendations.map(function (rec) { return (React.createElement(investment_card_1.InvestmentCard, { key: rec.id, recommendation: rec })); }))))),
            React.createElement("section", { className: "py-16" },
                React.createElement("div", { className: "container mx-auto px-4 text-center" },
                    React.createElement("div", { className: "max-w-2xl mx-auto" },
                        React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Ready to Adjust Your Portfolio?"),
                        React.createElement("p", { className: "text-muted-foreground text-balance mb-8" }, "Want to try different parameters or update your investment amount? You can recalculate your portfolio anytime."),
                        React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" },
                            React.createElement(button_1.Button, { size: "lg", onClick: handleRecalculate, className: "text-base" }, "Recalculate Portfolio"),
                            React.createElement(button_1.Button, { size: "lg", variant: "outline", className: "text-base bg-transparent", disabled: true }, "Download Report (Coming Soon)")))))),
        React.createElement(footer_1.Footer, null)));
}
exports["default"] = ResultsPage;
