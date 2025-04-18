"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LogOut, User } from "lucide-react"

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Portail des Résultats Académiques</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-700">
            <User className="h-4 w-4 mr-1" />
            <span>
              {user.prenom} {user.nom}
            </span>
          </div>

          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-1" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  )
}
