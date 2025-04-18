"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UE } from "@/lib/types"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ResultsChartProps {
  ues: UE[]
}

export default function ResultsChart({ ues }: ResultsChartProps) {
  // Prepare data for the chart
  const chartData = ues.map((ue) => {
    const name = ue.intituleUE || "UE sans nom"
    const shortName = name.length > 20 ? name.substring(0, 20) + "..." : name

    return {
      name: shortName,
      code: ue.historiqueUniteEnseignement?.newCode || "",
      moyenne: ue.moyenneUE,
      credits: ue.credit,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moyennes par UE</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 20]} />
              <Tooltip
                formatter={(value, name) => [value, name === "moyenne" ? "Moyenne" : "Crédits"]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const item = payload[0].payload
                    return `${item.name} (${item.code})`
                  }
                  return label
                }}
              />
              <Legend />
              <Bar dataKey="moyenne" name="Moyenne" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
