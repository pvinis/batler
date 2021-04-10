import styled from "@emotion/native"
import React, { FC } from "react"
import { SafeAreaView } from "react-native"


export const theme = {backgroundColor: "hotpink"}


type ScreenProps ={
	noSafe?: boolean
}
export const Screen: FC<ScreenProps> = ({noSafe, children, style})=> {
	if (noSafe) return (
	<ScreenInner style={style}>
		{children}
	</ScreenInner>
	)

	return (
		<ScreenInner style={style}>
		<SafeAreaView>
		{children}
		</SafeAreaView>
		</ScreenInner>
)
}

 const ScreenInner = styled.View({
	flex: 1,
})
