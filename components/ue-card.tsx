"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UE } from "@/lib/types"

interface UECardProps {
  ue: UE
  isExpanded: boolean
  onToggle: () => void
}

export default function UECard({ ue, isExpanded, onToggle }: UECardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h4 className="text-lg font-medium">{ue.intituleUE}</h4>
            <p className="text-sm text-gray-500">{ue.historiqueUniteEnseignement?.newCode}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Moyenne</p>
              <p className={`font-bold ${ue.moyenneUE >= 10 ? "text-green-600" : "text-red-600"}`}>
                {ue.moyenneUE.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Crédits</p>
              <p className="font-bold text-blue-600">{ue.credit.toFixed(1)}</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-2">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 bg-gray-50/50">
          <div className="space-y-4">
            <h5 className="font-medium text-gray-700">Éléments Constitutifs (EC)</h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2 border">Matière</th>
                    <th className="text-center p-2 border">CC</th>
                    <th className="text-center p-2 border">TP</th>
                    <th className="text-center p-2 border">DS</th>
                    <th className="text-center p-2 border">Moyenne</th>
                  </tr>
                </thead>
                <tbody>
                  {ue.provisoirs.map((ec, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-2 border">
                        {ec.intitule ? ec.intitule.split(":")[1]?.trim() || ec.intitule : "N/A"}
                      </td>
                      <td className="text-center p-2 border">{ec.cc !== null ? ec.cc.toFixed(2) : "-"}</td>
                      <td className="text-center p-2 border">{ec.tp !== null ? ec.tp.toFixed(2) : "-"}</td>
                      <td className="text-center p-2 border">{ec.ds !== null ? ec.ds.toFixed(2) : "-"}</td>
                      <td
                        className={`text-center p-2 border font-medium ${
                          ec.moyenne !== null && ec.moyenne >= 10 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {ec.moyenne !== null ? ec.moyenne.toFixed(2) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
