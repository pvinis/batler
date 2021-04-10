import React from 'react';
import { ThemeProvider } from '@emotion/react'
import { theme } from './DesignSystem';
import { MainList } from './MainList';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const EntryPoint =()=>  (
	<ThemeProvider theme={theme}>
		  <SafeAreaProvider>
		  <MainList/>
		  </SafeAreaProvider>
	  </ThemeProvider>
  )
