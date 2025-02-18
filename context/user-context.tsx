"use client"

import { IUser } from "@/components/types/user"
import React from "react"

export const UserContext = React.createContext<UserContextType | undefined>(undefined)

interface UserContextType {
  userData: IUser | null
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = React.useState<IUser | null>(null)

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
