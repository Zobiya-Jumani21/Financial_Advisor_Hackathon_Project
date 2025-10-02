"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { InvestmentRecommendation } from "@/lib/investment-engine"

interface PortfolioChartProps {
  recommendations: InvestmentRecommendation[]
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--accent))",
]

export function PortfolioChart({ recommendations }: PortfolioChartProps) {
  const data = recommendations.map((rec, index) => ({
    name: rec.name,
    value: rec.percentage,
    amount: rec.amount,
    color: COLORS[index % COLORS.length],
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-primary">
            {data.value}% (${data.amount.toLocaleString()})
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${value}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
