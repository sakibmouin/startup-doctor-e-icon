import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "../../../CustomButton";

const LongTextInput = ({ heading, onSubmit }) => {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = () => {
		onSubmit(inputValue);
		setInputValue("");
	};

	return (
		<View className={"p-4"}>
			<Text className={"text-white text-lg font-semibold mb-2"}>{heading}</Text>
			<TextInput
				className={"bg-opacitywhite text-white p-2 rounded-lg mb-4 h-40"}
				value={inputValue}
				onChangeText={setInputValue}
				placeholder="Enter text"
				placeholderTextColor="#999"
				multiline={true}
				numberOfLines={4}
			/>
			<CustomButton
				title="Submit"
				handlePress={handleSubmit}
				containerStyles="py-2"
				textStyles="font-sft text-base"
				secondary
			/>
		</View>
	);
};

export default LongTextInput;
