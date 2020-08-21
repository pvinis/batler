// import React, { useState, useEffect, useRef } from 'react'
// import { Button, View, Text } from 'react-native'
// import {DateTime} from 'luxon'
// import {Audio} from 'expo-av'
// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions'

// export const Alarms = () => {
// 	const [loaded, setLoaded] = useState(false)
// 	const [text, setText] = useState("")
// 	const [permissionText, setPermissionText] = useState("donno")
// 	const soundObject = useRef(new Audio.Sound())

// 	const loadSound = async () => {
// 		const retval = await soundObject.current.loadAsync(require('../assets/D-Day.mp3'))
// 		console.log(await soundObject.current.getStatusAsync())

// 		setLoaded(retval)
// 	}

// 	const checkPermission = async () => {
// 		const {status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
// 		setPermissionText(status)
// 	}
// 	const askPermission = async () => {
// 		const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
// 		setPermissionText(status)
// 	}

// const handleNotif = async () => {
// 	await startSound()
// }

// 	useEffect(() => {
// const 		notifsub = Notifications.addListener(handleNotif)
// // return () => notifsub.remove()
// 	}, [])

// 	useEffect(() => {
// 		loadSound()
// 		checkPermission()
// 	}, [])

// 	const startSound = async () => {
// 		console.log(await soundObject.current.getStatusAsync())
// 		await soundObject.current.playAsync()
// 	}

// 	const stopSound = async () => {
// 		await soundObject.current.stopAsync()
// 	}

// 	const addTestAlarm = () => {
// 		const nextMinute = DateTime.local().plus({minute: 1})

// 		setText(`set alarm for ${nextMinute.toLocaleString(DateTime.TIME_SIMPLE)}`)

// 		const localNotification = {
// 			title: 'wow',
// 			body: 'yup',
// 			ios: {
// 				_displayInForeground: true
// 			}
// 		}
// 		Notifications.presentLocalNotificationAsync(localNotification)
// 		// Notifications.scheduleLocalNotificationAsync(localNotification,{time: nextMinute.toJSDate()})

// 	}

// 	useEffect(() => {
// 		if (text === "") return
// 		const timer = setTimeout(() => setText(""), 3000)
// 		return () => clearTimeout(timer)
// 	}, [text])

// 	return (
// 	<View>
// 		<Text>{`${JSON.stringify(loaded)}`}</Text>
// 		<Text>Permission: {permissionText}</Text>
// 		<Button title="get permission" onPress={askPermission}/>
// 		<Button title="play" onPress={startSound}/>
// 		<Button title="stop" onPress={stopSound}/>
// 		<Button title="make test alarm for next minute" onPress={addTestAlarm}/>
// 	<Text>{text}</Text>
// 		</View>
// 	)
// }
