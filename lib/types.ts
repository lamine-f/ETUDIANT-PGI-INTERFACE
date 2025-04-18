// Types pour l'authentification
export interface LoginRequest {
  email: string
  password: string
  rememberMe: string
}

export interface LoginResponse {
  token: string
  user: User
}

// Types pour l'utilisateur
export interface User {
  "id": number,
  "email": string,
  "ine": string,
  "prenom": string,
  "nom": string,
  "resetDate": Date,
  "appRole": [],
  "activated": boolean,
  "key": string,
  "telephone": string,
  "etablissement": number,
  "modifierPar": string
  inscriptions: Inscription[]
}

// Types pour les inscriptions
export interface Inscription {
  id: number
  dateInscription: string
  montantInscription: number
  montantScolarite: number
  montantReduction: number
  observation: string
  etat: string
  niveau: Niveau
  anneeAccademique: AnneeAccademique
  etudiant: Etudiant
  groupe: Groupe
}

export interface Niveau {
  id: number
  codeNiveau: string
  libelle: string
  terminal: boolean
  entrant: boolean
  sortant: boolean
  formation: Formation
}

export interface Formation {
  id: number
  codeFormation: string
  nomFormation: string
  departement: Departement
}

export interface Departement {
  id: number
  code: string
  libelle: string
}

export interface AnneeAccademique {
  id: number
  nomAnneeAccademique: string
  actif: boolean
}

export interface Etudiant {
  id: number
  matricule: string
  nom: string
  prenom: string
  email: string
  telephone: string
  adresse: string
  dateNaissance: string
  lieuNaissance: string
  sexe: string
  nationalite: string
  situationMatrimoniale: string
}

export interface Groupe {
  id: number
  codeGroupe: string
  libelleGroupe: string
  niveau: Niveau
  anneeAccademique: AnneeAccademique
}

// Types pour les semestres
export interface Semester {
  id: number
  nomSemestre: string
  actif: boolean
}

// Types pour les sessions
export interface Session {
  id: number
  session: string
}

// Types pour les résultats académiques
export interface EC {
  tp: number | null
  cc: number | null
  ds: number | null
  coefficient: number
  intitule: string | null
  intituleUE: string | null
  intitules: string | null
  moyenne: number | null
  moyenneRatt: number | null
  credit: number
  type: string | null
  moyenneDefinitif: number
  nbAbence: number
  codeUE: string | null
  historiqueElementContitutif: {
    id: number
    newcode: string
    isExecute: boolean
    coeff: number
    tpe: number
    intitule: string
    coefTP: number | null
    specialite: string | null
    typeElementConstitutif: string
    historiqueUniteEnseignement: HistoriqueUniteEnseignement
    elementConstitutif: ElementConstitutif
  }
}

export interface ElementConstitutif {
  id: number
  intitule: string
  code: string
  coefficient: number
  num: string
  uniteEnseignement: UniteEnseignement
  tpe: number | null
}

export interface UniteEnseignement {
  id: number
  code: string
  credit: number
  description: string | null
  intitules: string
  soutenance: boolean | null
  isExecuted: boolean
  isValidate: boolean
  coefUE: number | null
  niveau: Niveau
  anneeAccademique: AnneeAccademique
}

export interface HistoriqueUniteEnseignement {
  id: number
  newCode: string
  intitules: string
  isExecute: boolean
  credit: number
  isValidate: boolean | null
  coefUE: number | null
  soutenance: boolean | null
  description: string | null
  typeUniteEnseignement: string
  anneeAccademique: AnneeAccademique
  uniteEnseignement: UniteEnseignement
}

export interface UE {
  moyenneUE: number
  credit: number
  intitule: string | null
  coefficient: number | null
  intituleUE: string | null
  moyenne: number
  nbAbence: number
  session: string | null
  historiqueUniteEnseignement: HistoriqueUniteEnseignement
  isrepeche: boolean | null
  provisoirs: EC[]
  toutuescontent: any[]
}

export interface StudentData {
  nom: string
  prenom: string
  nomSemestre: string
  libelle: string
  moyenneG: string
  session: string
  nbAbences: number
  toutues: UE[]
  isrepeche: boolean
}

// Types pour les autorisations de réclamation
export interface ReclamationAuthorization {
  id: number
  dateDebut: string
  dateFin: string
  isActive: boolean
  anneeAccademique: AnneeAccademique
  formation: Formation
  session: Session
  isTerminal: boolean
}

// État d'authentification
export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}
