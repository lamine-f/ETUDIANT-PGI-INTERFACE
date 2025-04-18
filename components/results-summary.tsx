import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface ResultsSummaryProps {
  overallAverage: string
  totalCredits: number
  totalPossibleCredits: number
}

export default function ResultsSummary({ overallAverage, totalCredits, totalPossibleCredits }: ResultsSummaryProps) {
  const isPassing = Number.parseFloat(overallAverage) >= 10

  return (
    <Card className={`border-l-4 ${isPassing ? "border-l-green-500 bg-green-50" : "border-l-amber-500 bg-amber-50"}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {isPassing ? (
            <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="h-8 w-8 text-amber-500 flex-shrink-0" />
          )}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {isPassing ? "Semestre validé" : "Semestre en cours de validation"}
            </h3>
            <p className="text-gray-700">
              Vous avez obtenu une moyenne générale de <span className="font-bold">{overallAverage}</span> et validé{" "}
              <span className="font-bold">{totalCredits}</span> crédits sur {totalPossibleCredits} possibles.
            </p>
            {!isPassing && (
              <p className="mt-2 text-amber-700">
                Une moyenne générale d'au moins 10/20 est nécessaire pour valider le semestre.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
