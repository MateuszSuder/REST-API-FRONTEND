import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography} from "@material-ui/core";
import {getProduct, Product, ProductInfo, ProductQuantity} from "../../services/productService";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ProductItem} from "../../components/Product/ProductItem";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {ProductAddToCart} from "../../components/Product/ProductAddToCart";
import {useRootStore} from "../../context/context";

export const s = makeStyles((theme: Theme) =>
	createStyles({
		grid: {
			marginTop: theme.spacing(2),
		},
		main: {
			padding: theme.spacing(3),
			width: "90vw"
		},
		category: {
			marginLeft: theme.spacing(4)
		},
		quantity: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: theme.spacing(0.5),
		},
		description: {
			marginTop: theme.spacing(3),
			paddingTop: theme.spacing(1),
			borderTopColor: theme.palette.primary.main,
			borderTop: "solid 1px"
		}
	}
))
export const ProductView: IReactComponent = observer(() => {
	const [product, setProduct] = useState<ProductInfo | null>(null);
	const [category, setCategory] = useState<String | null>(null);
	const [amountAvailable, setAmount] = useState(0);
	const [quantity, setQuantity] = useState<number>(1);

	const st = s();
	const store = useRootStore();
	let { productID } = useParams<{productID: string}>();

	useEffect(() => {
		getProduct(productID).then(p => {
			setProduct(p.product);
			setAmount(p.product.amount);
			if(p.category)
			setCategory(p.category);
		})
	}, [])

	useEffect(() => {
		adjustQuantity();
	}, [amountAvailable])

	useEffect(() => {
		console.log(amountAvailable);
	}, [amountAvailable])

	const addToCart = (p: ProductInfo | undefined) => {
		if(!p) return;
		if(!p.id || !p.name || !p.price) return;
		const pr: ProductQuantity = {
			id: p.id,
			name: p.name,
			price: p.price,
			quantity: quantity
		}

		store.cart.addToCart(pr);
		adjustQuantity();
	}

	const adjustQuantity = () => {
		for(const p of store.cart.items) {
			if(p.id === productID) {
				let am = 0;
				if(product && product.amount) {
					am = product.amount - p.quantity;
				}
				console.log("am: ", am);
				setAmount(am);

				if(quantity === am) {
					setQuantity(am);
				}
			}
		}
	}

	return (
		<ThemeProvider theme = {theme} >
			<Grid container justify="center" className={st.grid}>
				<Paper className={st.main}>
					<Grid container>
						{
							product &&
							<>
                <Grid xs={12} item>
                  <Typography align="center" variant="h4">
	                  {
	                    product.name
	                  }
                  </Typography>
                </Grid>

								<Grid item xs={6}>
									<Grid container>
										<Grid item xs={12}>
											{
												product &&
												product.specification &&
												product.specification.map((s, i) => (
													<Grid container spacing={1} key={i}>
														<Grid item>
															<Typography>
																{
																	'??? ' + s.key + ': '
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
                    <Grid item xs={12} className={st.description} >
	                    <Typography>
		                    {
			                    product.description
		                    }
	                    </Typography>
                    </Grid>
                  </Grid>
								</Grid>

								<Grid item xs={6}>
									<Grid container justify="center">
                    <Grid item xs={12}>
	                    <Typography align="center" variant="h6" color="secondary">
		                    {
			                    (product.price / 100).toFixed(2) + " z??"
		                    }
	                    </Typography>
                    </Grid>
										<Grid className={st.quantity} style={{cursor: "pointer"}} onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                        <RemoveIcon />
										</Grid>
										<Grid className={st.quantity}>
                        <Typography variant="h6">{quantity}</Typography>
										</Grid>
										<Grid className={st.quantity} style={{cursor: "pointer"}} onClick={() => quantity !== amountAvailable && setQuantity(quantity + 1)}>
                        <AddIcon />
										</Grid>
										<Grid item xs={12} />
										<Grid item xs={8} className={st.quantity}>
											{
												product.amount &&
													'Dost??pna ilo????: ' + amountAvailable
											}
										</Grid>
										<Grid item xs={12} className={st.quantity}>
												<ProductAddToCart dis={amountAvailable === 0} add={() => addToCart(product)} />
										</Grid>
									</Grid>
								</Grid>
							</>
						}
					</Grid>
				</Paper>
			</Grid>
		</ThemeProvider>
	)
});