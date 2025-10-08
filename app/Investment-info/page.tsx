"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header2"
import { Footer } from "@/components/footer1"
import { FaChartLine, FaCoins, FaHome, FaBitcoin, FaBalanceScale, FaPiggyBank } from "react-icons/fa"

const investmentOptions = [
  {
    category: "Stocks",
    description: "Ideal for long-term growth. Moderate to high risk. Best for investors who can tolerate market fluctuations.",
    examples: ["Apple (AAPL)", "Microsoft (MSFT)", "Tesla (TSLA)"],
    icon: <FaChartLine size={40} className="text-blue-500" />,
  },
  {
    category: "Bonds",
    description: "Safer investments providing regular income. Low to moderate risk, suitable for conservative investors.",
    examples: ["US Treasury Bonds", "Corporate Bonds", "Municipal Bonds"],
    icon: <FaBalanceScale size={40} className="text-green-500" />,
  },
  {
    category: "Gold",
    description: "Hedge against inflation and market volatility. Good for risk-averse investors seeking stable returns.",
    examples: ["Physical gold", "Gold ETFs", "Gold mining stocks"],
    icon: <FaCoins size={40} className="text-yellow-500" />,
  },
  {
    category: "Real Estate",
    description: "Provides rental income and long-term appreciation. Suitable for investors looking for tangible assets.",
    examples: ["Residential properties", "Commercial buildings", "REITs"],
    icon: <FaHome size={40} className="text-red-500" />,
  },
  {
    category: "Cryptocurrency",
    description: "High-risk, high-reward digital assets. Suitable for experienced investors comfortable with volatility.",
    examples: ["Bitcoin (BTC)", "Ethereum (ETH)", "Cardano (ADA)"],
    icon: <FaBitcoin size={40} className="text-purple-500" />,
  },
  {
    category: "Mutual Funds / ETFs",
    description: "Diversified portfolios managed by professionals. Good for investors seeking balanced risk and simplicity.",
    examples: ["Vanguard S&P 500 ETF", "Fidelity Growth Fund", "iShares MSCI ETF"],
    icon: <FaPiggyBank size={40} className="text-indigo-500" />,
  },
]

export default function InvestmentInfoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Smart <span className="text-blue-700">Investment</span> Recommendations
          </h1>
          <p className="text-gray-600 text-lg">
            Get personalized advice on which investment category fits your budget, risk tolerance, and timeline.
          </p>
        </div>

        {/* Investment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentOptions.map((option, index) => (
            <motion.div
              key={option.category}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {option.icon}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{option.category}</h2>
              <p className="text-gray-600 mb-2">{option.description}</p>
              <ol className="list-decimal list-inside text-gray-700">
                {option.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-4 text-lg">Ready to start your investment journey?</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Now
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
