import { useState } from 'react'
import { Button, Text, View } from 'react-native'
import { Audio } from 'expo-av'
import * as Sharing from 'expo-sharing'

export const Record = () => {
	const [isRecording, setIsRecording] = useState(false)
	const [theRecording, setTheRecording] = useState<Audio.Recording | undefined>(
		undefined,
	)
	const [theUri, setTheUri] = useState<string | undefined>(undefined)
	const [showBlack, setShowBlack] = useState(false)

	/// check if locked is recording
	/// check if bg is recording

	const startRecording = async () => {
		try {
			await Audio.requestPermissionsAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
				staysActiveInBackground: true,
			})
			const recording = new Audio.Recording()
			await recording.prepareToRecordAsync(
				Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
			)
			await recording.startAsync()
			setTheRecording(recording)
			setIsRecording(true)
		} catch (err) {
			console.log('failed: ', err)
		}
	}

	const stopRecording = async () => {
		await theRecording?.stopAndUnloadAsync()
		const uri = theRecording?.getURI()
		// const info = await FileSystem.getInfoAsync(this.recording.getURI() || "");
		console.log('stored at ', uri)
		setTheUri(uri ?? undefined)
		setTheRecording(undefined)
		setIsRecording(false)
	}

	const share = async () => {
		await Sharing.shareAsync(theUri!)
	}

	if (showBlack) {
		return (
			<View style={{ backgroundColor: 'black', flex: 1, paddingTop: 100 }}>
				<Button title="show normal" onPress={() => setShowBlack(!showBlack)} />
			</View>
		)
	}

	return (
		<View style={{ marginTop: 100 }}>
			<Button
				title={isRecording ? 'stop recording' : 'start recording'}
				onPress={isRecording ? stopRecording : startRecording}
			/>
			<Text>WOW!!</Text>
			<Text>Recording at {theUri}</Text>
			<Button title="share" onPress={share} />
			<Button
				title="show black"
				onPress={() => {
					setShowBlack(!showBlack)
				}}
			/>
		</View>
	)
}
