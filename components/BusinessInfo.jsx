import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	editEnabled,
	onEdit,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";

const BusinessInfo = ({
	name,
	description,
	pdfFileUrl,
	deleteEnabled,
	onDelete,
	onPress,
	editEnabled,
	onEdit,
}) => {
	const [showFullText, setShowFullText] = useState(false);

	const toggleFullText = () => {
		setShowFullText(!showFullText);
	};

	const openPdfFile = async (fileUrl) => {
		try {
			await Linking.openURL(fileUrl);
		} catch (error) {
			console.error("Error opening PDF:", error);
		}
	};

	const renderEdit = () => {
		return (
			<TouchableOpacity
				style={{ position: "absolute", right: 60, bottom: 20 }}
				onPress={onEdit}
			>
				<Entypo name="edit" size={24} color="white" />
			</TouchableOpacity>
		);
	};

	const renderDelete = () => {
		return (
			<TouchableOpacity
				style={{ position: "absolute", right: 20, bottom: 20 }}
				onPress={onDelete}
			>
				<Entypo name="trash" size={24} color="white" />
			</TouchableOpacity>
		);
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View className="bg-opacitywhite p-5 rounded-xl flex items-center relative">
				{editEnabled && renderEdit()}
				{deleteEnabled && renderDelete()}
				<View className="items-center mb-2">
					<Text className="font-sfBold text-white text-2xl">{name}</Text>
					<Text className="font-sft text-gray-400">
						{showFullText ? description : `${description.substring(0, 300)}...`}
					</Text>
					<TouchableOpacity onPress={toggleFullText}>
						<Text className="font-sftBold text-gray-400">
							{showFullText ? "See less" : "See more"}
						</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					className="p-3 bg-secondary w-36 flex items-center justify-center rounded-3xl"
					onPress={() => openPdfFile(pdfFileUrl)}
				>
					<Text className="font-sft text-white w-fit">View Pitch Deck</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

BusinessInfo.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	pdfFileUrl: PropTypes.string.isRequired,
	deleteEnabled: PropTypes.bool,
};

export default BusinessInfo;
