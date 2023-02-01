import { Link } from "expo-router"
import { FlatList, View } from "react-native"

export default () => {
	return (
		<View className="flex-1 bg-red-100">
			<FlatList
				data={["Alarms", "FB", "Record"]}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <Link href="/record">{item}</Link>}
			/>
		</View>
	)
}
