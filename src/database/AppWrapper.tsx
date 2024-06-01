import React from 'react'
import { AppProvider, UserProvider } from '@realm/react'
import RealmWrapper from './RealmWrapper'

export default function AppWrapper() {
  return (
    <AppProvider id={'application-1-xzjefvm'}>
     <UserProvider fallback={<RealmWrapper/>}>
        <RealmWrapper/>
     </UserProvider>
    </AppProvider>
  )
}