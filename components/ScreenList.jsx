import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InScreenList from "./InScreenList";

const ScreenList = ({ list, header, buttonText }) => {
	return (
		<View className="my-6">
			<FlatList
				data={list}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<InScreenList
						title={item.name}
						icon={item.icon}
						bg={item.bg}
						path={item.path}
						buttonText={buttonText}
					/>
				)}
				ListHeaderComponent={() => (
					<Text className="text-3xl text-white font-sfBold mb-8">{header}</Text>
				)}
				ItemSeparatorComponent={() => <View className="h-2"></View>}
			></FlatList>
		</View>
	);
};

export default ScreenList;
