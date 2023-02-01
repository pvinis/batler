import { useState } from "react"
import { Button, Text, View } from "react-native"
import { Audio } from "expo-av"
import * as Sharing from "expo-sharing"

export default () => {
	const [isRecording, setIsRecording] = useState(false)
	const [theRecording, setTheRecording] = useState<Audio.Recording | undefined>(undefined)
	const [theUri, setTheUri] = useState<string | undefined>(undefined)
	const [showBlack, setShowBlack] = useState(false)

	const startRecording = async () => {
		try {
			await Audio.requestPermissionsAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
				staysActiveInBackground: true,
			})
			const recording = new Audio.Recording()
			await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.highQuality)
			await recording.startAsync()
			setTheRecording(recording)
			setIsRecording(true)
		} catch (err) {
			console.log("failed: ", err)
		}
	}

	const stopRecording = async () => {
		await theRecording?.stopAndUnloadAsync()
		const uri = theRecording?.getURI()
		// const info = await FileSystem.getInfoAsync(this.recording.getURI() || "");
		console.log("stored at ", uri)
		setTheUri(uri ?? undefined)
		setTheRecording(undefined)
		setIsRecording(false)
	}

	const share = async () => {
		await Sharing.shareAsync(theUri!)
	}

	if (showBlack) {
		return (
			<View style={{ flex: 1, backgroundColor: "black" }}>
				<Button title="show normal" onPress={() => setShowBlack(!showBlack)} />
			</View>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<Button
				title={isRecording ? "stop recording" : "start recording"}
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
