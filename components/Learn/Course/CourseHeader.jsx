import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CourseHeader = ({ courseName, aboutCourse, courseImage }) => {
	const [showFullText, setShowFullText] = useState(false);

	const toggleFullText = () => {
		setShowFullText(!showFullText);
	};

	return (
		<View>
			<Image
				className="w-full h-[250px] mb-4"
				source={courseImage}
				resizeMode="contain"
			/>
			<View className="mb-2">
				<Text className="font-sfSemibold text-white text-2xl">
					{courseName}
				</Text>
			</View>
			<View className="mb-4">
				<Text className="font-sfSemibold text-secondary text-lg">
					About Course
				</Text>
				<Text className="font-sft text-gray-400 text-sm">
					{showFullText ? aboutCourse : `${aboutCourse.substring(0, 300)}...`}
				</Text>
				<TouchableOpacity onPress={toggleFullText}>
					<Text className="font-sftBold text-[#f0f0f0]">
						{showFullText ? "See less" : "See more"}
					</Text>
				</TouchableOpacity>
			</View>
			<Text className="font-sfSemibold text-secondary text-lg mb-2">
				Modules
			</Text>
		</View>
	);
};

export default CourseHeader;
