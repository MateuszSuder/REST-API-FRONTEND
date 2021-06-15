import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Button, ThemeProvider} from "@material-ui/core";
import {productStyle} from "./ProductItem";
import {useRootStore} from "../../context/context";

export const ProductAddToCart: IReactComponent = observer(({add, dis}: {add: () => any, dis: boolean}) => {
	const prodClass = productStyle();
	const store = useRootStore();



	return (
		<ThemeProvider theme={theme}>
			<Button variant="contained" disabled={!store.user.userLogged || dis} color="primary" className={prodClass.button} onClick={add}>
				Do koszyka
			</Button>
		</ThemeProvider>
	)
});