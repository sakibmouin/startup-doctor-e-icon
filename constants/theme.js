import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
	primary: "#12171F",
	secondary: "#35917a",
	white: "#f5f5f5",
	gray: "#1B232C",
	blue: "279af1",
	red: "ea526f",
};

export const SIZES = {
	base: 8,
	small: 12,
	font: 14,
	medium: 16,
	large: 18,
	extraLarge: 24,
	base: 10,
	width,
	height,
};

export const FONTS = {
	bold: "SF-Pro-Display-Bold",
	semiBold: "SF-Pro-Display-Semibold",
	medium: "SF-Pro-Display-Medium",
	regular: "SF-Pro-Display-Regular",
	light: "SF-Pro-Text-Light",
	desc: "SF-Pro-Text-Regular",
};

export const SHADOWS = {
	light: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	medium: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
	},
	dark: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.41,
		shadowRadius: 9.11,

		elevation: 14,
	},
};
