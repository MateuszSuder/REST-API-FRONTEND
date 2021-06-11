import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography} from "@material-ui/core";
import {useRootStore} from "../../context/context";
import {useStyles} from "../Admin/AdminList";
import CloseIcon from '@material-ui/icons/Close';

export const cartStyles = makeStyles((theme: Theme) =>
	createStyles({
		cart: {
			margin: theme.spacing(2)
		}
	})
)

export const CartView: IReactComponent = observer(() => {
	const classes = useStyles();
	const cart = cartStyles();
	const store = useRootStore();

	return (
		<ThemeProvider theme={theme}>
			<Grid container justify="center" className={classes.g}>
				<Paper className={classes.paper} style={{width: "80vw"}}>
					<Grid xs={12} className={cart.cart}>
						<Typography align="center">
							Koszyk
						</Typography>
					</Grid>
					{
						store.cart.items.length > 0 &&
						store.cart.items.map((item, i) => (
							<Grid container key={i}>
								<Grid item xs={3}>
									{
										<Typography  align="center">
											{item.name}
										</Typography>
									}
								</Grid>
								<Grid item xs={3}>
									{
										<Typography align="center">
											{item.quantity}
										</Typography>
									}
								</Grid>
								<Grid item xs={3}>
									{
                    <Typography align="center">
	                    {(item.price * item.quantity / 100).toFixed(2)}
                    </Typography>
									}
								</Grid>
								<Grid item xs={3}>
									<Typography align="center">
										<CloseIcon color="error" />
									</Typography>
								</Grid>
							</Grid>
						))
					}
				</Paper>
			</Grid>
		</ThemeProvider>
	)
});