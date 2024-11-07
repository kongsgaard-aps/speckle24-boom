import { createContext, ReactNode, useState } from 'react'
import { deleteCookie, getCookie, setCookie } from './cookies.ts'

const TOKEN = `${import.meta.env.VITE_APP_NAME}.AuthToken`
const REFRESH_TOKEN = `${import.meta.env.VITE_APP_NAME}.RefreshToken`
const CHALLENGE = `${import.meta.env.VITE_APP_NAME}.Challenge`

interface AuthContextInterface {
  token: string | undefined
  refreshToken: string | undefined
  login: () => void
  exchangeAccessCode(accessCode: string): Promise<void>
  logOut: () => void
}

export const AuthContext = createContext({} as AuthContextInterface)

type AuthProviderProps = {
  children: ReactNode
}

// Create an auth provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Get the token and refreshToken from localStorage
  const [token, setToken] = useState(getCookie(TOKEN))
  const [refreshToken, setRefreshToken] = useState(getCookie(REFRESH_TOKEN))

  // Create a login function that redirects to the Speckle server authentication page
  const login = () => {
    // TODO - Generate random challenge

    // TODO - Save challenge in localStorage

    // TODO - Send user to auth page

  }

  // Create a logOut function that removes the token and refreshToken from localStorage
  const logOut = () => {
    // TODO - Clear Cookies and localStorage
  }

  // Create an exchangeAccessCode function that exchanges the provided access code with a token/refreshToken pair, and saves them to local storage.
  const exchangeAccessCode = async (accessCode: string) => {
    // TODO - Exchange challenge for token

    const data = await res.json()

    if (data.token) {
      // TODO - If retrieving the token was successful, remove challenge and set the new token and refresh token
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        login,
        exchangeAccessCode,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
