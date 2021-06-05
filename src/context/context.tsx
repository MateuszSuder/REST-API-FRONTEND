import React, { createContext, useContext } from "react";
import { RootStore } from "../stores/RootStore";


const RootStateContext = createContext<RootStore>(new RootStore());

export const StateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	let store = new RootStore();
	// @ts-ignore
	window.$state = store;
	return <RootStateContext.Provider value = {store}>{ children }</RootStateContext.Provider>;
}

export const useRootStore = () => useContext(RootStateContext);

