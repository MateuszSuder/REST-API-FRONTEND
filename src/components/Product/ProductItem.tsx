import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles} from "../../views/Admin/AdminItem";
import {ProductInfo, ProductQuantity} from "../../services/productService";
import React from "react";
import {ProductAddToCart} from "./ProductAddToCart";
import {useRootStore} from "../../context/context";
import {Link} from "react-router-dom";

export const productStyle = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			fontSize: "1.5rem",
			paddingBottom: theme.spacing(1),
			textDecoration: "none",
			color: theme.palette.primary.light,
			textDecorationLine: "underline",
			"&:focus": {
				textDecoration: "none",
				color: theme.palette.text.primary,
			}
		},
		button: {
			width: "80%"
		},
		price: {
			width: "80%",
			fontSize: "1.5rem",
			marginBottom: theme.spacing(2),
			borderBottom: "1px solid black",
			borderBottomColor: theme.palette.primary.main,
			color: theme.palette.text.secondary
		}
	})
)

export const ProductItem: IReactComponent = observer(({product}: {product: ProductInfo}) => {
	const classes = adminItemStyles();
	const prodClass = productStyle();
	const store = useRootStore()

	const addToCart = (p: ProductInfo | undefined) => {
		if(!p) return;
		if(!p.id || !p.name || !p.price) return;
		const pr: ProductQuantity = {
			id: p.id,
			name: p.name,
			price: p.price,
			quantity: 1
		}

		store.cart.addToCart(pr)
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container>
						<Grid item xs={8}>
							{
								product &&
									<Typography>
										<Link to={'/product/' + product.id} className={prodClass.title}>
											{product.name}
										</Link>
									</Typography>
							}
						</Grid>
						<Grid item xs={4}>
							<Grid item xs={12}>
								<Typography className={prodClass.price}>
									{
										(product.price / 100).toFixed(2) + " zł"
									}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<ProductAddToCart add={() => addToCart(product)} />
							</Grid>
						</Grid>
						<Grid item xs={8}>
							{
								product &&
								product.specification &&
									product.specification.slice(0, 4).map((s, i) => (
										<Grid container spacing={1} key={i}>
											<Grid item>
												<Typography>
													{
														'• ' + s.key + ': '
													}
												</Typography>
											</Grid>
											<Grid item>
												<Typography style={{fontWeight: "bold"}}>
													{
														s.val
													}
												</Typography>
											</Grid>
										</Grid>
									))
							}
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</ThemeProvider>
	)
});