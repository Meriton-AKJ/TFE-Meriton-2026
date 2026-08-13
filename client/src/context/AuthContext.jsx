// =============================================================
// AuthContext.jsx — Contexte d'authentification global
// =============================================================
//
// QU'EST-CE QU'UN CONTEXTE REACT ?
// ---------------------------------
// Un contexte permet de partager des données entre TOUS les composants
// de l'app sans devoir les passer manuellement de parent en enfant.
//
// Sans contexte :  App → Navbar → UserMenu  (il faut passer "user" à chaque niveau)
// Avec contexte :  n'importe quel composant peut lire "user" directement
//
// STRUCTURE DE CE FICHIER :
// ---------------------------------
// 1. On crée le contexte (AuthContext)
// 2. On crée le Provider (AuthProvider) qui enveloppe toute l'app
// 3. Le Provider stocke l'état auth et expose les fonctions login/logout
//
// UTILISATION DANS L'APP :
// ---------------------------------
// Dans main.jsx ou App.jsx :
//   <AuthProvider>
//     <App />
//   </AuthProvider>
//
// Dans n'importe quel composant :
//   import { useAuth } from '../context/useAuth'
//   const { user, login, logout, isAuthenticated } = useAuth()
// =============================================================

import { createContext, useState, useEffect, useCallback } from 'react'

// createContext() crée le "canal" de communication entre le Provider et les composants.
// La valeur null est la valeur par défaut si on utilise le contexte en dehors du Provider.
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // "children" représente tout ce qui est enveloppé par <AuthProvider>
  // (toute l'application dans notre cas)

  // ------------------------------------------------------------------
  // ÉTAT LOCAL DU CONTEXTE
  // ------------------------------------------------------------------

  // user : objet contenant les infos de l'utilisateur connecté
  // Ces infos viennent du token JWT (id, email, role)
  // null = personne n'est connecté
  const [user, setUser] = useState(null)

  // token : le JWT reçu de l'API après login/register
  // Il est stocké dans localStorage pour persister entre les rechargements de page
  const [token, setToken] = useState(null)

  // loading : true pendant qu'on vérifie si un token existe dans le localStorage
  // Évite un flash visuel (ex: la Navbar qui affiche "Connexion" avant de savoir
  // que l'utilisateur est déjà connecté)
  const [loading, setLoading] = useState(true)

  // ------------------------------------------------------------------
  // RESTAURATION DE SESSION AU CHARGEMENT
  // ------------------------------------------------------------------

  // useEffect avec [] = s'exécute UNE SEULE FOIS au montage du composant
  // Vérifie si un token existe dans le localStorage (session précédente)
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token')

      if (storedToken) {
        // Un JWT est composé de 3 parties séparées par des points : header.payload.signature
        // On prend la 2e partie (payload) et on la décode depuis le base64
        // atob() = fonction native du navigateur pour décoder du base64
        // Résultat : { id, email, role, iat, exp } (les données qu'on a mis dans le token côté API)
        const payload = JSON.parse(atob(storedToken.split('.')[1]))
        setUser(payload)
        setToken(storedToken)
      }
    } catch {
      // Si le token est corrompu ou invalide, on le supprime
      localStorage.removeItem('token')
    } finally {
      // Dans tous les cas (succès ou erreur), on arrête le loading
      setLoading(false)
    }
  }, [])

  // ------------------------------------------------------------------
  // FONCTION LOGIN
  // ------------------------------------------------------------------

  // useCallback mémoïse la fonction pour éviter qu'elle soit recréée
  // à chaque re-render (optimisation des performances)
  //
  // login() reçoit le token JWT retourné par l'API après connexion ou inscription
  // Elle décode le token pour extraire les infos user et tout sauvegarde dans le state + localStorage
  const login = useCallback((token) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    setUser(payload)
    setToken(token)
    localStorage.setItem('token', token) // persiste la session
  }, [])

  // ------------------------------------------------------------------
  // FONCTION LOGOUT
  // ------------------------------------------------------------------

  // Pas besoin d'appeler l'API : JWT est stateless (sans état côté serveur)
  // Il suffit de supprimer le token localement → l'utilisateur est déconnecté
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }, [])

  // ------------------------------------------------------------------
  // VALEURS EXPOSÉES AUX COMPOSANTS
  // ------------------------------------------------------------------

  // Tout ce qui est dans "value" est accessible via useAuth() dans n'importe quel composant
  //
  // user            → infos de l'utilisateur connecté ({ id, email, role })
  // token           → le JWT brut (utile pour les requêtes API protégées)
  // loading         → true pendant la vérification initiale du localStorage
  // isAuthenticated → booléen pratique : true si token existe, false sinon
  // login           → fonction à appeler après un loginUser() ou registerUser() réussi
  // logout          → fonction à appeler pour déconnecter

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
