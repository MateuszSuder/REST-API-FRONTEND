import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {ThemeProvider} from "@material-ui/core";

export const ProductView: IReactComponent = observer(() => {
	return (
		<ThemeProvider theme={theme}>
			Company
		</ThemeProvider>
	)
});