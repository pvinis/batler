import React, { useState } from 'react';
import { Button, Text} from "react-native"
import {Screen} from "./DesignSystem"
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';


export const Record =()=> {
	const [isRecording, setIsRecording]= useState(false)
	const [theRecording, setTheRecording]= useState<Audio.Recording|undefined>(undefined)
	const [theUri, setTheUri]= useState<string|undefined>(undefined)
	const [showBlack, setShowBlack]=useState(false)
	const startRecording = async () => {
		try{
		await Audio.requestPermissionsAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
				staysActiveInBackground: true,
			})
			const recording = new Audio.Recording()
			await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
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
		await Sharing.shareAsync(theUri!, )
	}

	if (showBlack) {return (
		<Screen style={{backgroundColor: "black"}}>
			<Button title="show normal" onPress={()=>setShowBlack(!showBlack)}/>
		</Screen>
	)
	}

	return(
	<Screen>
		<Button title={isRecording ? "stop recording" : "start recording"}
		 onPress={isRecording ? stopRecording : startRecording}/>
      <Text >WOW!!</Text>
	  <Text>Recording at {theUri}</Text>
	  <Button title="share" onPress={share} />
	  <Button title="show black" onPress={()=> {setShowBlack(!showBlack)}} />
	  </Screen>


 )

	}
