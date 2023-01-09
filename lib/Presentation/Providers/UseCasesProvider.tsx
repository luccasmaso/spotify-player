import React, { useContext, createContext } from 'react'

import { UseCases } from '../../../pages/_initializer'

type Props = {
  children: JSX.Element,
  useCases: UseCases
}

export const Context = createContext<UseCases>({} as UseCases)

export function ContextProvider({ children, useCases } : Props) {
  return (
    <Context.Provider value={useCases}>
      {children}
    </Context.Provider>
  )
}

export const useUseCases = () => useContext(Context)