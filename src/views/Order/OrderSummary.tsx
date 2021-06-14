import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Button, Container, Divider, Grid, Paper, ThemeProvider, Typography} from "@material-ui/core";
import React from "react";
import {adminItemStyles} from "../Admin/AdminItem";
import {useRootStore} from "../../context/context";
import {Delivery} from "../../services/userService";
import {Link} from "react-router-dom"

const SummaryTitle = ({name}: {name: string | number}) => {
	return (
		<Grid item xs={3}>
			<Typography gutterBottom={true} variant="caption">
				{
					name
				}
			</Typography>
		</Grid>
	)
}

const SummaryItem = ({name}: {name: string | number}) => {
	return (
		<Grid item xs={3}>
			<Typography gutterBottom={true} variant="body2">
				{
					name
				}
			</Typography>
		</Grid>
	)
}

const SummaryDelivery = ({d}: {d: Delivery | undefined}) => {
	if(!d) {
		return(<></>)
	}
	const Ttext = ({t}: {t: string | number}) => {
		return (
			<Typography align="left" variant="body2">
				{
					t
				}
			</Typography>
		)
	}

	return (
		<Grid container justify="center">
			<Grid item xs={10}>
				<Ttext t={d.name + " " + d.lastName} />
			</Grid>
			<Grid item xs={10}>
				<Ttext t={d.address.street + ", " + d.address.number} />
			</Grid>
			<Grid item xs={10}>
				<Ttext t={d.address.postcode + ", " + d.address.city} />
			</Grid>
			<Grid item xs={10}>
				<Ttext t={d.address.country} />
			</Grid>
		</Grid>
	)
}

export const OrderSummary: IReactComponent = observer(() => {
	const classes = adminItemStyles();
	const store = useRootStore();

	const submitOrder = () => {

	}

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={3} className={classes.g}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Grid container>
								<Grid item xs={12}>
									<Grid container>
										<Grid item xs={8}>
											<Typography variant="subtitle2" gutterBottom={true}>
												Podsumowanie zamówienia
											</Typography>
										</Grid>

										<Grid item xs={4}>
											<Typography variant="subtitle2" gutterBottom={true} align="center">
												Adres dostawy
											</Typography>
										</Grid>
									</Grid>
									<Grid container>
										<Grid item xs={8}>
											<Grid item xs={12}>
												<Grid container>
													<SummaryTitle name="Produkt" />
													<SummaryTitle name="Ilość" />
													<SummaryTitle name="Cena za sztukę" />
													<SummaryTitle name="Cena za całość" />
												</Grid>
												<Divider />
											</Grid>
											<Grid item xs={12}>
												<Grid container>
													{
														store.cart.items.map((item, i)=> (

															<React.Fragment key={i}>
																<SummaryItem name={item.name} />
																<SummaryItem name={item.quantity} />
																<SummaryItem name={(item.price / 100).toFixed(2) + " zł"} />
																<SummaryItem name={(item.price * item.quantity / 100).toFixed(2) + " zł"} />
															</React.Fragment>
														))
													}
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<Divider />
												<Grid container>
													<Grid item xs={9} />
													<Grid item xs={3}>
														<Typography variant="body2">
															{
																(store.cart.price / 100).toFixed(2) + " zł"
															}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={4}>
											<SummaryDelivery d={store.cart.deliveryDetails || store.user.user?.deliverDetails} />
											<Link to="/order/delivery">
												<Typography align="right" variant="body2" color="primary">
													Zmień...
												</Typography>
											</Link>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="flex-end">
							<Button variant={"contained"} color={"primary"} onClick={submitOrder}>Potwierdź zamówienie</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	)
});