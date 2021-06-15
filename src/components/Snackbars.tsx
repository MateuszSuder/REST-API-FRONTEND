import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../App";
import {Button, IconButton, Snackbar, ThemeProvider} from "@material-ui/core";
import {useRootStore} from "../context/context";
import React, {useState} from "react";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Snackbars: IReactComponent = observer(() => {
	const store = useRootStore();

	return (
		<div>
			{
				store.snackbarMessages.map((s, i) => (
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						autoHideDuration={1000}
						message={s.message}
						open={true}
						key={i}
					>
						<Alert severity="error">
							{
								s.message
							}
						</Alert>
					</Snackbar>
				))
			}
		</div>
	);
});