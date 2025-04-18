"use client"

import LoginForm from "@/components/login-form"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { isLoading } = useAuthRedirect()

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </main>
    )
  }

  // Afficher le formulaire de connexion si l'utilisateur n'est pas authentifié
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Portail des Résultats Académiques</h1>
        <LoginForm />
      </div>
    </main>
  )
}
