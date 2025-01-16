import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const ShortTextInput = ({ heading, onSubmit }) => {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = () => {
		onSubmit(inputValue);
		setInputValue("");
	};

	return (
		<View className={"p-4"}>
			<Text className={"text-white text-lg font-semibold mb-2"}>{heading}</Text>
			<TextInput
				className={"bg-opacitywhite text-whtie p-2 rounded-lg mb-4"}
				value={inputValue}
				onChangeText={setInputValue}
				placeholder="Enter text"
				placeholderTextColor="#999"
			/>
			<TouchableOpacity
				className={"bg-secondary py-2 rounded-lg"}
				onPress={handleSubmit}
			>
				<Text className={"text-white text-center"}>Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ShortTextInput;
