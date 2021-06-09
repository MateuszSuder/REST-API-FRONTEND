import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Button, Grid, ThemeProvider} from "@material-ui/core";
import React from "react";
import {adminItemStyles} from "../../views/Admin/AdminItem";

export const ItemSubmit: IReactComponent = observer(({submit}: {submit: () => any}) => {
	const classes = adminItemStyles();
	return (
		<ThemeProvider theme={theme}>
			<Grid item xs={12} className={classes.submit}>
				<Button variant="contained" color="primary" onClick={() => submit()}>
					Zapisz
				</Button>
			</Grid>
		</ThemeProvider>
	)
});