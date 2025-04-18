"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileDown } from "lucide-react"
import UECard from "./ue-card"
import ResultsSummary from "./results-summary"
import ResultsChart from "./results-chart"
import EnhancedCharts from "./enhanced-charts"
import type { StudentData } from "@/lib/types"

interface StudentResultsProps {
  data: StudentData
}

export default function StudentResults({ data }: StudentResultsProps) {
  const [expandedUE, setExpandedUE] = useState<string | null>(null)
  const [showDetailedCharts, setShowDetailedCharts] = useState(false)


  const toggleUE = (ueId: string) => {
    setExpandedUE(expandedUE === ueId ? null : ueId)
  }

  // Calculate overall average
  const calculateOverallAverage = () => {
    if (data.moyenneG && Number.parseFloat(data.moyenneG) > 0) {
      return data.moyenneG
    }

    let totalWeightedAverage = 0
    let totalCredits = 0

    data.toutues.forEach((ue) => {
      if (ue.moyenneUE) {
        totalWeightedAverage += ue.moyenneUE * ue.credit
        totalCredits += ue.credit
      }
    })

    return totalCredits > 0 ? (totalWeightedAverage / totalCredits).toFixed(2) : "0.00"
  }

  // Calculate total credits earned
  const calculateTotalCredits = () => {
    return data.toutues.reduce((total, ue) => {
      return total + (ue.moyenneUE >= 10 ? ue.credit : 0)
    }, 0)
  }

  const overallAverage = calculateOverallAverage()
  const totalCredits = calculateTotalCredits()
  const totalPossibleCredits = data.toutues.reduce((total, ue) => total + ue.credit, 0)

  const handleExportPDF = () => {
    alert("Fonctionnalité d'export PDF à implémenter")
  }

  const handleExportCSV = () => {
    alert("Fonctionnalité d'export CSV à implémenter")
  }

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <Card className="border-t-4 border-t-blue-600">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {data.nom} {data.prenom}
              </h2>
              <p className="text-gray-600">
                {data.nomSemestre} - Session {data.session}
              </p>
              <p className="text-gray-600 text-sm">{data.libelle}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileDown className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Moyenne Générale</p>
              <p
                className={`text-xl font-bold ${Number.parseFloat(overallAverage) >= 10 ? "text-green-600" : "text-red-600"}`}
              >
                {overallAverage}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Crédits Obtenus</p>
              <p className="text-xl font-bold text-blue-600">
                {totalCredits} / {totalPossibleCredits}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Absences</p>
              <p className="text-xl font-bold">{data.nbAbences}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <ResultsSummary
        overallAverage={overallAverage}
        totalCredits={totalCredits}
        totalPossibleCredits={totalPossibleCredits}
      />

      {/* Charts Toggle */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={() => setShowDetailedCharts(!showDetailedCharts)}>
          {showDetailedCharts ? "Afficher le graphique simple" : "Afficher les graphiques détaillés"}
        </Button>
      </div>

      {/* Charts */}
      {showDetailedCharts ? (
        <EnhancedCharts
          ues={data.toutues}
          overallAverage={overallAverage}
          totalCredits={totalCredits}
          totalPossibleCredits={totalPossibleCredits}
        />
      ) : (
        <ResultsChart ues={data.toutues} />
      )}

      {/* UE List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Unités d'Enseignement</h3>
        {data.toutues.map((ue, index) => (
          <UECard
            key={index}
            ue={ue}
            isExpanded={expandedUE === `ue-${index}`}
            onToggle={() => toggleUE(`ue-${index}`)}
          />
        ))}
      </div>
    </div>
  )
}
