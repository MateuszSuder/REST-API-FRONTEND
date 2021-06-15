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
import {addNewCategory} from "../../services/categoryService";

export const st = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			margin: theme.spacing(1),
			width: "25%"
		},
		button: {
			margin: theme.spacing(2),
		}
	})
)

export const AddCategory: IReactComponent = observer(() => {
	const [categoryName, setCategoryName] = useState("")

	const c = st();

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setCategoryName(event.target.value as string);
	}

	const add = () => {
		if(categoryName.length > 3)
		addNewCategory(categoryName)
	}

	return (
		<ThemeProvider theme={theme}>
			<TextField
				label="Dodaj kategorie"
				value={categoryName}
				onChange={handleChange}
				className={c.input}
			/>
			<Button className={c.button} variant="contained" color="primary" onClick={add}>Dodaj nową kategorię</Button>
		</ThemeProvider>
	)
});