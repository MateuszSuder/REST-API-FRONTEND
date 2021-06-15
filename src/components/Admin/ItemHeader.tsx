import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, ThemeProvider, Typography} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {adminItemStyles} from "../../views/Admin/AdminItem";
import {deleteUser} from "../../services/userService";
import {deleteProduct} from "../../services/productService";
import {deleteCompany} from "../../services/companySevice";
import {AddCategory} from "./AddCategory";
import {useState} from "react";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export const ItemHeader: IReactComponent = observer(({type}: {type: string}) => {
	const classes = adminItemStyles();
	const history = useHistory();
	let query = useQuery();


	const del = () => {
		const id = query.get('id');
		switch (type) {
			case "Użytkownik": {
				if(id) {
					deleteUser(id);
				}
				break;
			}
			case "Produkt": {
				if(id) {
					deleteProduct(id);
				}
				break;
			}
			case "Firma": {
				if(id) {
					deleteCompany(id)
				}
			}
		}

		history.goBack();
	}

	return(
		<ThemeProvider theme={theme}>
			{
				query.get('id') ?
					<>
						<Grid item xs={6}>
							<Typography className={classes.title}>ID: {query.get('id')}</Typography>
						</Grid>

						<Grid item xs={6} className={classes.type}>
							<Typography className={classes.type}>{type}</Typography>
						</Grid>

						<Grid item xs={6}>
							{
								type !== "Zamówienie" &&
								<Typography color="error" onClick={del} style={{cursor: "pointer"}}>Usuń...</Typography>
							}
						</Grid>
					</>
					:
					<>
						<Grid item xs={12}>
							<Typography className={classes.type}>{type}</Typography>
						</Grid>
					</>
			}
		</ThemeProvider>
	)
})