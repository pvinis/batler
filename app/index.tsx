import { Link } from "expo-router"
import { FlatList, View } from "react-native"

export default () => {
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={["Alarms", "FB", "Record"]}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <Link href="/record">{item}</Link>}
			/>
		</View>
	)
}
