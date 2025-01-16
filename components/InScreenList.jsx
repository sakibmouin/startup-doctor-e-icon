import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const FundList = ({ title, item, icon, bg, onPress }) => {
	const isLoading = false;

	return (
		<View className="rounded-xl w-full bg-opacitywhite">
			<TouchableOpacity
				onPress={onPress}
				className={` ${isLoading ? "opacity-50" : ""}`}
			>
				<View className="flex flex-row p-4 gap-4 justify-center align-middle">
					<View className={`p-1 rounded-xl self-center bg-${bg}`}>
						<Image
							source={icon}
							className="h-[70px] w-[70px] rounded-xl"
							resizeMode="contain"
						/>
					</View>
					<View className="flex flex-1 justify-center align-middle">
						<Text className="text-white text-lg font-sf">{title}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};
export default FundList;
