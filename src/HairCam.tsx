import { useNavigation } from '@react-navigation/native'
import { Camera, CameraType } from 'expo-camera'
import { ImageType } from 'expo-camera/build/Camera.types'
import { useEffect, useRef, useState } from 'react'
import {
	Button,
	Linking,
	Text,
	View,
	useWindowDimensions,
	TouchableOpacity,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SNAP_BUTTON_SIZE = 80

export const HairCam = () => {
	const [hasPermissions, setHasPermissions] = useState<boolean | null>(null)
	const { width, height } = useWindowDimensions()
	const saInsets = useSafeAreaInsets()
	const camera = useRef<Camera>()
	const nav = useNavigation()

	useEffect(() => {
		const doIt = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync()
			setHasPermissions(status === 'granted')
		}
		doIt()
	}, [])

	if (hasPermissions === null) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Allow camera permissions</Text>
				<Button
					title="Prompt for camera permissions"
					onPress={() => Camera.requestCameraPermissionsAsync()}
				/>
			</View>
		)
	} else if (hasPermissions === false) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Allow camera permissions</Text>
				<Button title="Go to settings" onPress={() => Linking.openSettings()} />
			</View>
		)
	}

	const takePhoto = async () => {
		const { uri } = await camera.current!.takePictureAsync({
			imageType: ImageType.png,
		})
		console.log('ok', uri)
		nav.navigate('PhotoConfirm', { photo: uri })
	}

	return (
		<View style={{ flex: 1 }}>
			<Camera style={{ flex: 1 }} type={CameraType.front} ref={camera}>
				<TouchableOpacity onPress={takePhoto}>
					<View
						style={{
							width: SNAP_BUTTON_SIZE,
							height: SNAP_BUTTON_SIZE,
							borderColor: 'white',
							borderWidth: 6,
							borderRadius: SNAP_BUTTON_SIZE / 2,
							overflow: 'hidden',
							position: 'absolute',
							top: height - saInsets.bottom - SNAP_BUTTON_SIZE - 100,
							left: (width - SNAP_BUTTON_SIZE) / 2,
						}}
					></View>
				</TouchableOpacity>
			</Camera>
		</View>
	)
}
