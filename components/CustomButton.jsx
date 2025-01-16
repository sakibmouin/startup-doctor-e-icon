import { TouchableOpacity, Text } from "react-native";
import React from "react";
import className from "classnames";
import PropTypes from "prop-types";

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
	primary,
	secondary,
	danger,
	outline,
	...rest
}) => {
	const classes = className(
		rest.className,
		"rounded-xl py-4 justify-center items-center border-2",
		{
			"border-secondary bg-secondary": primary,
			"border-blue bg-blue": secondary,
			"border-red bg-red": danger,
			"bg-primary": outline,
			"text-white": !outline,
			"text-secondary": outline && primary,
			"text-blue": outline && secondary,
			"text-red": outline && danger,
		},
		containerStyles,
		isLoading ? "opacity-50" : ""
	);
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={classes}
			disabled={isLoading}
		>
			<Text
				className={`font-sfSemibold translate-y-0.5 text-white font-psemibold text-xl ${textStyles}`}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

CustomButton.propTypes = {
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	danger: PropTypes.bool,
	outline: PropTypes.bool,
	rounded: PropTypes.bool,

	checkVariationValue: ({ primary, secondary, danger }) => {
		const count = Number(!!primary) + Number(!!secondary) + Number(!!danger);
		if (count > 1) {
			return new Error(
				"CustomButton Component: Only one of primary, secondary, danger can be true"
			);
		}
	},
};

export default CustomButton;
