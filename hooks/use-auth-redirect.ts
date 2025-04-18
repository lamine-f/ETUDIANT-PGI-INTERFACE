"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, setAuthToken } from "@/lib/api"

/**
 * Hook qui vérifie si l'utilisateur est connecté et redirige vers la page des résultats si c'est le cas.
 * Utile pour les pages publiques comme la page de connexion.
 *
 * @returns Un objet contenant l'état d'authentification et l'état de chargement
 */
export function useAuthRedirect() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)

      // Vérifier si un token existe dans localStorage
      const token = localStorage.getItem("authToken")

      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      try {
        // Définir le token dans le client API
        setAuthToken(token)

        // Tenter de récupérer les informations de l'utilisateur pour vérifier si le token est valide
        await getCurrentUser()

        // Si la requête réussit, l'utilisateur est authentifié
        setIsAuthenticated(true)

        // Rediriger vers la page des résultats
        router.push("/result")
      } catch (error) {
        // Si la requête échoue, le token est invalide ou expiré
        console.error("Token invalide ou expiré:", error)
        localStorage.removeItem("authToken")
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { isAuthenticated, isLoading }
}
