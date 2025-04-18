"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {getCurrentUser, getInscriptionByGroupAndSchooling, setAuthToken} from "@/lib/api"
import type { User } from "@/lib/types"

/**
 * Hook qui gère l'état d'authentification de l'utilisateur.
 * Fournit des méthodes pour la connexion, la déconnexion et la vérification de l'authentification.
 */
export function useAuth() {

  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Vérifier l'authentification au chargement du composant
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      setError(null)

      // Utiliser le token stocké ou le token par défaut
      const token = localStorage.getItem("authToken")

      if (!token) {
        setIsAuthenticated(false)
        setUser(null)
        setIsLoading(false)
        return
      }

      try {
        setAuthToken(token)

        const userData= await getCurrentUser();
        userData.inscriptions = await getInscriptionByGroupAndSchooling(userData.ine)

        setUser(userData)
        setIsAuthenticated(true)

        // Stocker le token dans localStorage si ce n'est pas déjà fait
        if (!localStorage.getItem("authToken")) {
          localStorage.setItem("authToken", token)
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de l'authentification:", err)

        // Message d'erreur plus convivial
        if (err instanceof Error) {
          if (err.message.includes("Failed to fetch") || err.message.includes("Délai d'attente dépassé")) {
            setError("Impossible de se connecter au serveur. Vérifiez votre connexion internet ou réessayez plus tard.")
          } else {
            setError("Session expirée ou invalide. Veuillez vous reconnecter.")
          }
        } else {
          setError("Une erreur inattendue s'est produite. Veuillez vous reconnecter.")
        }

        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fonction de déconnexion
  const logout = useCallback(() => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/")
  }, [router])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
  }
}
