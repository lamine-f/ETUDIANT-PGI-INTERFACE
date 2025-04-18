"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSemestersByInscriptionId, getSessions } from "@/lib/api"
import type { Semester, Session } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface SemesterSelectorProps {
  inscriptionId: number
  onSelectionChange: (semesterId: number, sessionId: number) => void
}

export default function SemesterSelector({ inscriptionId, onSelectionChange }: SemesterSelectorProps) {
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedSession, setSelectedSession] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [semestersData, sessionsData] = await Promise.all([
          getSemestersByInscriptionId(inscriptionId),
          getSessions(),
        ])

        setSemesters(semestersData)
        setSessions(sessionsData)

        // Set defaults if data is available
        if (semestersData.length > 0) {
          setSelectedSemester(semestersData[0].id.toString())
        }

        if (sessionsData.length > 0) {
          setSelectedSession(sessionsData[0].id.toString())
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des données")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [inscriptionId])

  useEffect(() => {
    if (selectedSemester && selectedSession) {
      onSelectionChange(Number.parseInt(selectedSemester), Number.parseInt(selectedSession))
    }
  }, [selectedSemester, selectedSession])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Chargement des semestres...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label htmlFor="semester-select" className="block text-sm font-medium text-gray-700 mb-1">
          Semestre
        </label>
        <Select value={selectedSemester} onValueChange={(value) => setSelectedSemester(value)}>
          <SelectTrigger id="semester-select">
            <SelectValue placeholder="Sélectionner un semestre" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((semester) => (
              <SelectItem key={semester.id} value={semester.id.toString()}>
                {semester.nomSemestre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="session-select" className="block text-sm font-medium text-gray-700 mb-1">
          Session
        </label>
        <Select value={selectedSession} onValueChange={(value) => setSelectedSession(value)}>
          <SelectTrigger id="session-select">
            <SelectValue placeholder="Sélectionner une session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session) => (
              <SelectItem key={session.id} value={session.id.toString()}>
                {session.session}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
