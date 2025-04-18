// API client for fetching student data
import type {
  LoginRequest,
  LoginResponse,
  User,
  StudentData,
  Session,
  Semester,
  Inscription,
  ReclamationAuthorization,
} from "./types"

const API_BASE_URL = "https://etudiant-pgi.esp.sn:8080/api"

// Store token in memory during the session
let authToken: string | null = ""


// Utiliser les en-têtes exacts fournis par l'utilisateur
const getStandardHeaders = () => {
  return {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    Connection: "keep-alive",
    CreAuthorization: `Bearer ${authToken}`,
    Host: "etudiant-pgi.esp.sn:8080",
    Origin: "https://etudiant-pgi.esp.sn",
    Referer: "https://etudiant-pgi.esp.sn/",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const loginData: LoginRequest = {
    email,
    password,
    rememberMe: "",
  }

  try {
    const response = await fetch(`${API_BASE_URL}/loginAuth`, {
      method: "POST",
      headers: {
        ...getStandardHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erreur de connexion:", errorText)
      throw new Error("Échec de l'authentification. Vérifiez vos identifiants.")
    }

    const data = await response.json()
    authToken = data.token
    return data
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("Impossible de se connecter au serveur. Vérifiez votre connexion internet.")
    }
    throw error
  }
}

// Helper function to handle API requests with error handling
async function handleApiRequest(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: getStandardHeaders(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erreur API:", errorText)
      throw new Error(`Erreur ${response.status}: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Erreur de requête:", error)
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error(
        "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou réessayez plus tard.",
      )
    }
    throw error
  }
}

export async function getCurrentUser(): Promise<User> {
   return  handleApiRequest(`${API_BASE_URL}/userConnecter`, {
    method: "GET",
    headers: {
      ...getStandardHeaders(),
    },
  })
}

export async function getSessions(): Promise<Session[]> {
  return handleApiRequest(`${API_BASE_URL}/sessions`, {
    method: "GET",

  })
}

export async function getSemestersByInscriptionId(inscriptionId: number): Promise<Semester[]> {
  return handleApiRequest(`${API_BASE_URL}/semestres/getSemestresbyNiveau/${inscriptionId}`, {
    method: "GET",
  })
}

export async function getInscriptionByGroupAndSchooling(groupId: string): Promise<Inscription[]> {
  return handleApiRequest(`${API_BASE_URL}/inscriptions/findByGroupeAndAnneeAcademique/${groupId}`, {
    method: "GET",
  })
}

export async function getStudentResults(
  inscriptionId: number,
  semesterId: number,
  sessionId: number,
): Promise<StudentData> {
  return handleApiRequest(
    `${API_BASE_URL}/notes/getNotesByUniteEnseignement/${inscriptionId}/${semesterId}/${sessionId}`,
    {
      method: "GET",
    },
  )
}

export async function getReclamationAuthorization(
  academicYearId: number,
  formationId: number,
  isTerminal: boolean,
  sessionId: number,
): Promise<ReclamationAuthorization> {
  return handleApiRequest(
    `${API_BASE_URL}/autorisation-reclamations/${academicYearId}/${formationId}/${isTerminal}/${sessionId}`,
    {
      method: "GET",
    },
  )
}

// Set token manually (useful for testing or when token is stored in localStorage/cookies)
export function setAuthToken(token: string) {
  authToken = token
}
