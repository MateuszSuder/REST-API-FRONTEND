import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, ThemeProvider, Typography} from "@material-ui/core";
import {useLocation} from "react-router-dom";
import {adminItemStyles} from "../../views/Admin/AdminItem";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export const ItemHeader: IReactComponent = observer(({type}: {type: string}) => {
	const classes = adminItemStyles();
	let query = useQuery();

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