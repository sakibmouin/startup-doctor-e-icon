import {
	StyleSheet,
	TouchableWithoutFeedback,
	useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const OnboardingButton = ({ flatListRef, flatListIndex, dataLength, x }) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const navigation = useNavigation();

	const buttonAnimationStyle = useAnimatedStyle(() => {
		return {
			width:
				flatListIndex.value === dataLength - 1
					? withSpring(140)
					: withSpring(60),
			height: 60,
		};
	});

	const arrowAnimationStyle = useAnimatedStyle(() => {
		return {
			width: 30,
			height: 30,
			opacity:
				flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
			transform: [
				{
					translateX:
						flatListIndex.value === dataLength - 1
							? withTiming(100)
							: withTiming(0),
				},
			],
		};
	});

	const textAnimationStyle = useAnimatedStyle(() => {
		return {
			opacity:
				flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
			transform: [
				{
					translateX:
						flatListIndex.value === dataLength - 1
							? withTiming(0)
							: withTiming(-100),
				},
			],
		};
	});
	const animatedColor = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			x.value,
			[0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
			["#35917a", "#062e60", "#070600"]
		);

		return {
			backgroundColor: backgroundColor,
		};
	});

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (flatListIndex.value < dataLength - 1) {
					flatListRef.current?.scrollToIndex({
						index: flatListIndex.value + 1,
					});
				} else {
					router.push("/sign-in");
				}
			}}
		>
			<Animated.View
				style={[styles.container, buttonAnimationStyle, animatedColor]}
			>
				<Animated.Text style={[styles.textButton, textAnimationStyle]}>
					Get Started
				</Animated.Text>
				<Animated.View style={[styles.arrow, arrowAnimationStyle]}>
					<AntDesign
						className="absolute"
						name="arrowright"
						size={30}
						color="white"
					/>
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default OnboardingButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	arrow: {
		position: "absolute",
	},
	textButton: { color: "white", fontSize: 16, position: "absolute" },
});
