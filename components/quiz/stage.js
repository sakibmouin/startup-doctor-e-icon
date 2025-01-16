const calculateWeightedScore = (answers) => {
	if (!answers || answers.length === 0) return 0;
	return answers.reduce((total, answer) => {
		return total + answer.score * answer.weight;
	}, 0);
};

const calculateCategoryScores = (answers) => {
	if (!answers || answers.length === 0) return {};
	const categories = {};
	answers.forEach((answer) => {
		if (!categories[answer.category]) {
			categories[answer.category] = { total: 0, count: 0 };
		}
		categories[answer.category].total += answer.score;
		categories[answer.category].count++;
	});

	return Object.keys(categories).reduce((result, category) => {
		result[category] = categories[category].total / categories[category].count;
		return result;
	}, {});
};

export const stage = (answers) => {
	if (!answers || answers.length === 0) {
		return {
			stage: "Not Started",
			scorePercentage: "0.00",
			categoryScores: {},
		};
	}

	const weightedScore = calculateWeightedScore(answers);
	const categoryScores = calculateCategoryScores(answers);

	const maxPossibleScore = answers.reduce(
		(total, answer) => total + 3 * answer.weight,
		0
	);
	const scorePercentage = (weightedScore / maxPossibleScore) * 100;

	// Define stage thresholds
	const ideaThreshold = 20;
	const earlyThreshold = 40;
	const seedThreshold = 70;

	// Basic stage determination
	let determinedStage;
	if (scorePercentage <= ideaThreshold) {
		determinedStage = "Idea Stage";
	} else if (scorePercentage <= earlyThreshold) {
		determinedStage = "Early Stage";
	} else if (scorePercentage <= seedThreshold) {
		determinedStage = "Seed Stage";
	} else {
		determinedStage = "Maturity Stage";
	}

	// Additional rules for edge cases
	if (
		determinedStage === "Early Stage" &&
		categoryScores.product >= 2 &&
		categoryScores.traction >= 2
	) {
		determinedStage = "Seed Stage";
	}

	if (
		determinedStage === "Seed Stage" &&
		(categoryScores.funding < 1.5 || categoryScores.revenue < 1.5)
	) {
		determinedStage = "Early Stage";
	}

	if (
		determinedStage === "Maturity Stage" &&
		(categoryScores.team < 2 || categoryScores.revenue < 2)
	) {
		determinedStage = "Seed Stage";
	}

	return {
		stage: determinedStage,
		scorePercentage: scorePercentage.toFixed(2),
		categoryScores: categoryScores,
	};
};
