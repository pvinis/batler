import React, { useState, useEffect }  from 'react'
import {Image, Button, View, Text } from 'react-native'
import * as Facebook from "expo-facebook"



export const FBStuff = () => {
	const [isLoggedIn , setIsLoggedIn] = useState(false)
	const [token, setToken] = useState(null)
	const [userData, setUserData] = useState(null)

	const fbLogin = async () => {
		try {
			await Facebook.initializeAsync()
			const {
				type, token: theToken, expires, permissions, declinedPermissions
			} = await Facebook.logInWithReadPermissionsAsync(
				{ permissions: ["public_profile", "user_posts"] },
				)
			if (type === 'success') {
				setToken(theToken)
				console.log({permissions, declinedPermissions, theToken})
				fetch(`https://graph.facebook.com/me?access_token=${theToken}&fields=id,name`)
				.then(r => r.json())
				.then(data => {
					setUserData(data)
					setIsLoggedIn(true)
				})
				.catch(e => console.log(e))
			}
		} catch ({message}){
			alert(`FB Login Error: ${message}`)
		}
	}


	const syncAC = async () => {
		console.log(`https://graph.facebook.com/me/feed?fields=name,message,full_picture,link,application,type&access_token=${token}`)
		fetch(`https://graph.facebook.com/me/feed?fields=name,message,full_picture,link,application,type&access_token=${token}`)
		.then(r => r.json())
		.then(data => {
			// filter
			console.log({data})

			// syncWithLocalPhotos()
		})
		.catch(e => console.log(e))

	}

	return (
		<View >
			{isLoggedIn ?
			<>
			<Text>{userData.name}</Text>
			<Button title="Sync animal crossing" onPress={syncAC}/>
			</>
		:
			<Button title="Login with Facebook" onPress={fbLogin}/>
		}
      </View>

	)
}
