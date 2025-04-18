"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UE } from "@/lib/types"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface EnhancedChartsProps {
  ues: UE[]
  overallAverage: string
  totalCredits: number
  totalPossibleCredits: number
}

export default function EnhancedCharts({
  ues,
  totalCredits,
  totalPossibleCredits,
}: EnhancedChartsProps) {
  // Prepare data for radar chart
  const radarData = ues.map((ue) => ({
    subject: ue.intituleUE?.substring(0, 15) || "UE",
    value: ue.moyenneUE,
    fullMark: 20,
  }))

  // Prepare data for pie chart
  const pieData = [
    {
      name: "Crédits validés",
      value: totalCredits,
      color: "#22c55e", // green-500
    },
    {
      name: "Crédits non validés",
      value: totalPossibleCredits - totalCredits,
      color: "#ef4444", // red-500
    },
  ]

  // Prepare data for stacked bar chart
  const stackedBarData = ues
    .filter((ue) => ue.moyenneUE > 0) // Only include UEs with grades
    .map((ue) => {
      const name = ue.intituleUE?.substring(0, 15) || "UE"
      return {
        name,
        moyenne: ue.moyenneUE,
        credits: ue.credit,
        code: ue.historiqueUniteEnseignement?.newCode || "",
      }
    })

  // Prepare data for EC composition chart
  const ecCompositionData: any[] = []
  ues.forEach((ue) => {
    ue.provisoirs.forEach((ec) => {
      if (ec.moyenne !== null && ec.intitule) {
        const name = ec.intitule.split(":")[1]?.trim() || ec.intitule
        ecCompositionData.push({
          name: name.length > 20 ? name.substring(0, 20) + "..." : name,
          cc: ec.cc || 0,
          tp: ec.tp || 0,
          ds: ec.ds || 0,
          moyenne: ec.moyenne,
        })
      }
    })
  })

  // Sort EC composition data by average grade
  ecCompositionData.sort((a, b) => b.moyenne - a.moyenne)

  // Take only top 5 ECs for readability
  const topECs = ecCompositionData.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par UE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 20]} />
                  <Radar name="Moyenne" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des crédits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} crédits`, "Nombre de crédits"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Composition des notes (CC, TP, DS) pour les meilleurs ECs */}
      <Card>
        <CardHeader>
          <CardTitle>Composition des notes - Top 5 ECs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topECs}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cc" name="Contrôle Continu" stackId="a" fill="#3b82f6" />
                <Bar dataKey="tp" name="Travaux Pratiques" stackId="a" fill="#22c55e" />
                <Bar dataKey="ds" name="Devoir Surveillé" stackId="a" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Jauge de moyenne générale */}
      <Card>
        <CardHeader>
          <CardTitle>Moyenne générale et crédits par UE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stackedBarData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 20]} />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
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
                <Bar dataKey="moyenne" name="Moyenne" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                  {stackedBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.moyenne >= 10 ? "#22c55e" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
