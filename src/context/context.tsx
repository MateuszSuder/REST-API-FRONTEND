import React, { createContext, useContext } from "react";
import { RootStore } from "../stores/RootStore";


const RootStateContext = createContext<RootStore | null>(null);

export const StateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	let store = new RootStore();
	return <RootStateContext.Provider value = {store}>{ children }</RootStateContext.Provider>;
}

export const useRootStore = () => useContext(RootStateContext);