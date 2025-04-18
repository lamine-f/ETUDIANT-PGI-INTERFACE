"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getStudentResults } from "@/lib/api"
import StudentResults from "@/components/student-results"
import SemesterSelector from "@/components/semester-selector"
import Header from "@/components/header"
import type { StudentData } from "@/lib/types"
import { useAuth } from "@/hooks/use-auth"
import { AlertCircle, Loader2, LogIn, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResultsPage() {

  const { user, isAuthenticated, isLoading, error, logout } = useAuth()
  const [results, setResults] = useState<StudentData | null>(null)
  const [resultsLoading, setResultsLoading] = useState(false)
  const [resultsError, setResultsError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const router = useRouter()

  // Fonction pour réessayer la connexion
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    window.location.reload()
  }

  // Fonction pour retourner à la page de connexion
  const handleBackToLogin = () => {
    logout();
  }

  const handleSemesterSessionChange = async (semesterId: number, sessionId: number) => {
    if (!user || !user.inscriptions || user.inscriptions.length === 0) {
      setResultsError("Aucune inscription trouvée")
      return
    }

    try {
      setResultsLoading(true)
      // Use the first inscription ID for simplicity
      const inscriptionId = user.inscriptions[0].id
      const resultsData = await getStudentResults(inscriptionId, semesterId, sessionId)
      setResults(resultsData)
      setResultsError(null)
    } catch (err) {
      setResultsError(err instanceof Error ? err.message : "Erreur lors du chargement des résultats")
      setResults(null)
    } finally {
      setResultsLoading(false)
    }
  }

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Chargement de vos informations...</p>
        </div>
      </div>
    )
  }

  // Afficher un message d'erreur si l'authentification a échoué
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Erreur de connexion</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <div className="flex flex-col space-y-2">
            <Button onClick={handleRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
            <Button onClick={handleBackToLogin}>
              <LogIn className="h-4 w-4 mr-2" />
              Retour à la connexion
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Rediriger si l'utilisateur n'est pas authentifié
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Vous n'êtes pas connecté. Redirection...</p>
          <Button onClick={handleBackToLogin} className="mt-4">
            <LogIn className="h-4 w-4 mr-2" />
            Aller à la page de connexion
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {user.inscriptions && user.inscriptions.length > 0 ? (
            <>
              <SemesterSelector
                inscriptionId={user.inscriptions[0].id}
                onSelectionChange={handleSemesterSessionChange}
              />

              {resultsLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                  <p className="mt-2 text-gray-600">Chargement des résultats...</p>
                </div>
              ) : resultsError ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500 mb-4">{resultsError}</p>
                  <Button onClick={() => setResultsError(null)} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réessayer
                  </Button>
                </div>
              ) : results ? (
                <StudentResults data={results} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Sélectionnez un semestre et une session pour afficher vos résultats
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-amber-600">Aucune inscription trouvée pour cet utilisateur</div>
          )}
        </div>
      </main>
    </div>
  )
}
