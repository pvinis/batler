import React from 'react';
import {Button, FlatList, Text} from "react-native"
import {Screen} from "./DesignSystem"



export const MainList =({navigation})=> (
	<Screen>
	  <FlatList
	  data={["Alarms", "FB", "Record"]}
	  keyExtractor={(item)=> item}
	  renderItem={({item})=>(
		  <Button onPress={()=>{  navigation.navigate("Record") }}
		  title={`wow ${item}`}
		  />
	  )}
	  />
	  </Screen>
 )
