import React from 'react';
import { ThemeProvider } from '@emotion/react'
import { theme } from './DesignSystem';
import { MainList } from './MainList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Record } from './Record';


const Stack = createStackNavigator()

export const EntryPoint =()=>  (
	<ThemeProvider theme={theme}>
		  <SafeAreaProvider>
			  <NavigationContainer>
				  <Stack.Navigator>
		  <Stack.Screen name="MainList" component={MainList}/>
		  <Stack.Screen name="Record" component={Record}/>
				  </Stack.Navigator>
			  </NavigationContainer>
		  </SafeAreaProvider>
	  </ThemeProvider>
  )
