import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {ThemeProvider} from "@material-ui/core";
import {ProductList} from "../../components/Product/ProductList";
import {useParams} from "react-router-dom";

export const IndexView: IReactComponent = observer(() => {
	let { category } = useParams<{category: string}>();

	return (
		<ThemeProvider theme={theme}>
			<ProductList category={category} />
		</ThemeProvider>
	)
});