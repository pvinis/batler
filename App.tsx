import { StatusBar } from 'expo-status-bar'
import { Button, Text, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HairCam } from './src/HairCam'
import { PhotoConfirm } from './src/PhotoConfirm'

const Stack = createNativeStackNavigator()

const App = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Test" component={Test} />
			<Stack.Screen name="HairCam" component={HairCam} />
			<Stack.Screen name="PhotoConfirm" component={PhotoConfirm} />
		</Stack.Navigator>
	</NavigationContainer>
)

export default App

const Test = () => {
	const nav = useNavigation()
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>Open up App.tsx to s working on your app!</Text>
			<Button title="hair" onPress={() => nav.navigate('HairCam')} />
			<StatusBar style="auto" />
		</View>
	)
}
