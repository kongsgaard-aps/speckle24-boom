import { createContext, ReactNode, useMemo } from 'react'
import { useGetUserQuery, User } from '@queries'

interface UserContextProps {
  user: User | null
}

export const UserContext = createContext({ user: null } as UserContextProps)

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  // TODO - Fetch user

  const user = useMemo(() => {
    // TODO - Only set valid user
  })

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
