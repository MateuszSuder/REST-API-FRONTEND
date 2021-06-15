import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {
	Container,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	TextField,
	Theme,
	ThemeProvider
} from "@material-ui/core";
import React, {useState} from "react";
import { Button } from "@material-ui/core";

export const st = makeStyles((theme: Theme) =>
	createStyles({
		popup: {
			padding: theme.spacing(4,4,4,4)
		}
	})
)

export const AddCategory: IReactComponent = observer(({open}: {open: boolean}) => {
	const [categoryName, setCategoryName] = useState("")

	const c = st();


	return (
		<ThemeProvider theme={theme}>

		</ThemeProvider>
	)
});