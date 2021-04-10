import React from 'react';
import { ThemeProvider } from '@emotion/react'
import { theme } from './DesignSystem';
import { MainList } from './MainList';


export const EntryPoint =()=>  (
	  <ThemeProvider theme={theme}>
		  <MainList/>
	  </ThemeProvider>
  )
