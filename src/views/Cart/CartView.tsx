import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {
	Button,
	Container,
	createStyles,
	Grid,
	makeStyles,
	Paper,
	Theme,
	ThemeProvider,
	Typography
} from "@material-ui/core";
import {useRootStore} from "../../context/context";
import {useStyles} from "../Admin/AdminList";
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';

export const cartStyles = makeStyles((theme: Theme) =>
	createStyles({
		cart: {
			margin: theme.spacing(2)
		},
		item: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			borderBottom: "solid 1px black",
			borderBottomColor: theme.palette.primary.main
		},
		summary: {
			padding: theme.spacing(2)
		},
		center: {
			display: "flex",
			alignItems: "center",
		},
		buttonContainer: {
			display: "flex",
			justifyContent: "center",
			margin: theme.spacing(2)
		}
	})
)

export const CartView: IReactComponent = observer(() => {
	const classes = useStyles();
	const cart = cartStyles();
	const store = useRootStore()

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="lg">
				<Grid container className={classes.g} spacing={2}>
					<Grid item xs={12} className={cart.cart}>
						<Typography align="center">
							Koszyk
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Paper style={{justifyContent: "center", margin: "auto"}} className={cart.summary}>
							{
								store.cart.items.length > 0 &&
								store.cart.items.map((item, i) => (
									<Grid container key={i} className={cart.item}>
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
													{(item.price * item.quantity / 100).toFixed(2) + " zł"}
												</Typography>
											}
										</Grid>
										<Grid item xs={3}>
											<Typography align="center">
												<CloseIcon color="error" cursor="pointer" onClick={() => store.cart.removeFromCart(item.id)} />
											</Typography>
										</Grid>
									</Grid>
								))
							}
							{
								store.cart.items.length === 0 &&
									<Typography>
											Twój koszyk jest pusty...
									</Typography>
							}
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper style={{justifyContent: "center", margin: "auto"}}>
							<Grid container className={cart.summary}>
								<Grid item xs={6} className={cart.center}>
									<Typography>
										Do zapłaty
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography align="right" variant="h5">
										{
											(store.cart.price / 100).toFixed(2) + " zł"
										}
									</Typography>
								</Grid>
								<Grid item xs={12} className={cart.buttonContainer}>
									<Link to={'/order/delivery'}>
										<Button variant="contained" color="primary" disabled={!store.user.userLogged || store.cart.items.length === 0}>
											Wybierz sposób dostawy
										</Button>
									</Link>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	)
});