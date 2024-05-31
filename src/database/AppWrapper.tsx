import { View, Text } from 'react-native'
import React from 'react'
import { AppProvider, RealmProvider, UserProvider } from '@realm/react'
import RealmWrapper from './RealmWrapper'

export default function AppWrapper() {
  return (
    <AppProvider id={'application-0-ycfrgbf'}>
     <UserProvider fallback={<RealmWrapper/>}>
        <RealmWrapper/>
     </UserProvider>
    </AppProvider>
  )
}