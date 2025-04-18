# Portail des Résultats Académiques

Une application web moderne permettant aux étudiants de consulter leurs résultats académiques de manière sécurisée et intuitive.

## Fonctionnalités Principales

- Authentification sécurisée des étudiants
- Visualisation des résultats par semestre et session
- Tableaux de bord avec statistiques détaillées
- Interface responsive adaptée à tous les appareils
- Support des thèmes clair et sombre
- Affichage détaillé des notes (Contrôle Continu, Travaux Pratiques, Devoirs Surveillés)
- Analyses graphiques avancées des performances

## Technologies

- **Framework Frontend**: [Next.js 15](https://nextjs.org/)
- **Langage**: [TypeScript](https://www.typescriptlang.org/)
- **Styles**: [Tailwind CSS](https://tailwindcss.com/)
- **Composants UI**: [Radix UI](https://www.radix-ui.com/)
- **Visualisation**: [Recharts](https://recharts.org/)
- **Iconographie**: [Lucide Icons](https://lucide.dev/)

## Prérequis

- Node.js (version 18 ou supérieure)
- pnpm (version 10 ou supérieure)

## Installation

1. Cloner le dépôt :
```bash
git clone [url-du-repo]
cd student-results
```

2. Installer les dépendances :
```bash
pnpm install
```

3Lancer l'application en développement :
```bash
pnpm dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Architecture du Projet

```
.
├── app/                # Pages et routage de l'application
├── components/         # Composants réutilisables
│   ├── ui/            # Composants d'interface utilisateur
│   └── charts/        # Composants de visualisation
├── hooks/             # Hooks React personnalisés
├── lib/               # Utilitaires et configuration
│   ├── api/          # Client API et services
│   └── types/        # Types TypeScript
└── public/           # Ressources statiques
```

## Sécurité

- Authentification par tokens JWT
- Protection des routes via middleware Next.js
- Validation des données côté client et serveur
- Gestion sécurisée des sessions utilisateur
- Chiffrement des données sensibles

## Tests

```bash
# Exécuter les tests unitaires
pnpm test

# Exécuter les tests avec couverture
pnpm test:coverage
```

## Déploiement

L'application peut être déployée sur n'importe quelle plateforme supportant Node.js. Pour construire l'application pour la production :

```bash
pnpm build
pnpm start
```

## Contribution

1. Fork du projet
2. Création d'une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Création d'une Pull Request
