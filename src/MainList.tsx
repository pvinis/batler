import React from 'react';
import {FlatList, Text} from "react-native"
import {Screen} from "./DesignSystem"



export const MainList =()=> (
	<Screen>
	  <FlatList
	  data={["Alarms", "FB", "Record"]}
	  keyExtractor={(item)=> item}
	  renderItem={({item})=>(
      <Text >WOW {item}</Text>
	  )}
	  />
	  </Screen>
 )
