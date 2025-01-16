import {
	View,
	Text,
	TouchableOpacity,
	Image,
	useWindowDimensions,
} from "react-native";
import React from "react";

const ModuleBox = ({ iconPath, heading, onPress }) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const mtw = Math.round(SCREEN_WIDTH - 225);

	return (
		<View className="w-full flex flex-row justify-between items-center bg-[#1B232C] p-4 rounded-xl">
			<View className="flex flex-row items-center">
				<Image
					source={iconPath}
					className="h-12 w-12 mr-4"
					resizeMode="contain"
				/>
				<View>
					<Text
						style={{
							color: "white",
							fontSize: 16,
							maxWidth: mtw,
							fontFamily: "SF-Pro-Display-Bold",
						}}
					>
						{heading}
					</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={onPress}
				className="bg-secondary px-4 py-2 rounded-xl"
			>
				<Text className="text-white font-sf">SEE MORE</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ModuleBox;

{
	/* <Text className="text-gray-400 font-sft">{description}</Text> */
}
