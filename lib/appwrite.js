import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import {
	Account,
	Client,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
} from "react-native-appwrite";

export const config = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
	businessesCollectionId: EXPO_PUBLIC_APPWRITE_BUSINESS_COLLECTION_ID,
	storageId: EXPO_PUBLIC_APPWRITE_STORAGE_ID,
	pdfStorageBucketId: EXPO_PUBLIC_APPWRITE_PDF_BUCKET_ID,
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	businessesCollectionId,
	storageId,
	pdfStorageBucketId,
} = config;

// Init the SDK
const client = new Client();

client
	.setEndpoint(endpoint) // Appwrite Endpoint
	.setProject(projectId) // Project ID
	.setPlatform(platform); // Application ID

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		const avatarUrl = avatars.getInitials(username);

		// Sign in the user immediately after creation
		await signIn(email, password);

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

// Sign In
export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		const user = await getCurrentUser();
		return user;
	} catch (error) {
		console.error("Error signing in:", error);
		throw error;
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}

// Get Current User
export async function getCurrentUser() {
	try {
		// First, check if there's an active session

		// If there's a session, try to get the account
		const currentAccount = await account.get();

		// Then fetch the user document
		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (currentUser.documents.length === 0) {
			console.log("User document not found");
			return null;
		}

		return currentUser.documents[0];
	} catch (error) {
		console.log("Error getting current user:", error);
		if (
			error.code === 401 ||
			error.message.includes("missing scope (account)")
		) {
			console.log("User is not authenticated or lacks necessary permissions");
			await signOut();
			return null;
		}
		return null;
	}
}

// Sign Out
export async function signOut() {
	try {
		const session = await account.deleteSession("current");

		return session;
	} catch (error) {
		throw new Error(error);
	}
}

export const checkSession = async () => {
	const [isSessionActive, setIsSessionActive] = useState(false);
	const session = await account.getSession("current");
	if (!session) {
		console.log("No active session found");
		return null;
	} else {
		setIsSessionActive(true);
		return isSessionActive;
	}
};

// --------------------------------------------------------------------

export async function uploadFile(file) {
	if (!file) return;

	const { mimeType, ...rest } = file;
	const asset = { type: mimeType, ...rest };

	try {
		const uploadedFile = await storage.createFile(
			pdfStorageBucketId,
			ID.unique(),
			asset
		);

		const fileId = uploadedFile.$id;
		const fileUrl = await getFileUrl(fileId);
		return { fileId, fileUrl };
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}

export async function getFileId(fileId) {
	return fileId;
}

export async function getFileUrl(fileId) {
	try {
		const fileUrl = storage.getFileView(pdfStorageBucketId, fileId);
		if (!fileUrl) throw new Error("Failed to get file URL");
		return fileUrl;
	} catch (error) {
		console.error("Error getting file URL:", error);
		throw error;
	}
}

export async function createBusiness(form) {
	try {
		const uploadResult = await uploadFile(form.pdfFile);
		const pdfFileUrl = uploadResult.fileUrl;
		const pdfId = uploadResult.fileId;

		// let logoUrl = null;
		// if (form.logo) {
		// 	const logoUploadResult = await uploadFile(form.logo);
		// 	logoUrl = logoUploadResult.fileUrl;
		// }

		const newBusiness = await databases.createDocument(
			databaseId,
			businessesCollectionId,
			ID.unique(),
			{
				name: form.name,
				pdfFileUrl: pdfFileUrl,
				description: form.description,
				users: form.userId,
				pdfId: pdfId,
				category: form.category,
				yearFounded: form.yearFounded,
				startupStage: form.startupStage,
				location: form.location,
				teamSize: form.teamSize,
				website: form.website,
				email: form.email,
				products: form.products || [], // Ensure it's always an array

				category: form.category, // Add this line
			}
		);
		return newBusiness;
	} catch (error) {
		console.error("Error creating business:", error);
		throw error;
	}
}

export async function deleteBusiness(business) {
	if (!business || !business.$id) {
		throw new Error("Invalid business object or missing $id");
	}

	const documentId = business.$id;

	try {
		if (business.pdfId) {
			try {
				await deletePdf(business.pdfId);
			} catch (pdfError) {
				console.log("Error deleting PDF or PDF not found:", pdfError);
			}
		}

		const response = await databases.deleteDocument(
			databaseId,
			businessesCollectionId,
			documentId
		);

		return response;
	} catch (error) {
		console.error("Error deleting business:", error);
		throw error;
	}
}
// --------------------------------------------------------------------

// Fetch businesses from the database
export const fetchBusinesses = async () => {
	try {
		const response = await databases.listDocuments(
			databaseId,
			businessesCollectionId
		);
		return response.documents;
	} catch (error) {
		console.error("Error fetching Businesses: ", error);
		throw error;
	}
};

// Fetch businesses for a specific user
export const getUserBusinesses = async (userId) => {
	try {
		const response = await databases.listDocuments(
			databaseId,
			businessesCollectionId,
			[Query.equal("users", userId)]
		);
		return response.documents;
	} catch (error) {
		console.error("Error fetching user's businesses: ", error);
		throw error;
	}
};

export const openPdf = async (fileId) => {
	try {
		const response = await storage.getFileDownload(pdfStorageBucketId, fileId);
		const fileUrl = response.href;
		return fileUrl;
	} catch (error) {
		console.log("Error Opening PDF: " + error);
		throw error;
	}
};

export const deletePdf = async (fileId) => {
	try {
		const response = await storage.deleteFile(pdfStorageBucketId, fileId);
		return response;
	} catch (error) {
		console.log("Error deleting PDF:", error);
		throw error;
	}
};

export async function fetchBusinessById(id) {
	try {
		const response = await databases.getDocument(
			databaseId,
			businessesCollectionId,
			id
		);
		return response;
	} catch (error) {
		console.error("Error fetching business by ID:", error);
		throw error;
	}
}

export const updateStartupStage = async (documentId, stageResult) => {
	try {
		await databases.updateDocument(databaseId, userCollectionId, documentId, {
			startupStage: stageResult.stage,
		});
		console.log("Startup stage updated successfully");
	} catch (error) {
		console.error("Error updating startup stage:", error);
	}
};

export const getStartupStage = async (userId) => {
	try {
		const response = await databases.getDocument(
			databaseId,
			userCollectionId,
			userId
		);
		return response.startupStage || "Not determined";
	} catch (error) {
		console.error("Error fetching startup stage:", error);
		return "Error";
	}
};

export async function updateBusiness(id, updatedData) {
	try {
		const updatedBusiness = await databases.updateDocument(
			databaseId,
			businessesCollectionId,
			id,
			{
				name: updatedData.name,
				description: updatedData.description,
				industry: updatedData.industry,
				yearFounded: updatedData.yearFounded,
				startupStage: updatedData.startupStage,
				location: updatedData.location,
				teamSize: updatedData.teamSize,
				website: updatedData.website,
				email: updatedData.email,
				products: updatedData.products,
			}
		);
		return updatedBusiness;
	} catch (error) {
		console.error("Error updating business:", error);
		throw error;
	}
}

const updateProgress = async (userId, courseId, moduleId) => {
	try {
		await databases.updateDocument(databaseId, userCollectionId, userId, {
			courseId: courseId,
			moduleId: moduleId,
		});
		console.log("Progress updated successfully");
	} catch (error) {
		console.error("Error updating progress: ", error);
	}
};
