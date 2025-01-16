import { View, Text } from "react-native";
import React from "react";

const ListItem = ({ item }) => {
	return (
		<View className="flex flex-row items-center mb-[6px]">
			<Text className="text-2xl text-white mr-2">{`\u25CF`}</Text>
			<Text className="text-white">{item.title}</Text>
		</View>
	);
};

export default ListItem;
