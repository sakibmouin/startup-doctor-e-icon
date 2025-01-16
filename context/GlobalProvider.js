import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser, fetchBusinesses } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [businessesObject, setBusinessesObject] = useState(null);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLogged(true);
					setUser(res);
				} else {
					setIsLogged(false);
					setUser(null);
				}
			})
			.catch((error) => {
				// console.log("Error in GlobalProvider:", error);
				setIsLogged(false);
				setUser(null);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLogged,
				setIsLogged,
				user,
				setUser,
				isLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
