import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, View, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as FileSystem from 'expo-file-system'

export const PhotoConfirm = () => {
	const { photo } = useRoute().params
	const saInsets = useSafeAreaInsets()
	const nav = useNavigation()

	const savePhoto = async () => {
		await FileSystem.copyAsync({
			from: photo,
			to: FileSystem.documentDirectory!,
		})
		nav.navigate('Test')
	}

	return (
		<View style={{ flex: 1 }}>
			<Image source={{ uri: photo }} style={{ flex: 1 }} resizeMode="contain" />
			<View
				style={{
					position: 'absolute',
					bottom: saInsets.bottom,
					left: 0,
					right: 0,
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<Button title="Retry" onPress={() => nav.goBack()} />
				<Button title="Save" onPress={savePhoto} />
			</View>
		</View>
	)
}
