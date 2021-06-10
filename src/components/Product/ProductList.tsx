import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Container, Grid, Paper, ThemeProvider, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getProducts, ProductInfo} from "../../services/productService";
import {getProductsFromCategory} from "../../services/categoryService";
import {ProductItem} from "./ProductItem";
import {useHistory} from "react-router-dom";
import {adminItemStyles} from "../../views/Admin/AdminItem";

export const ProductList: IReactComponent = observer(({category}: {category?: string}) => {
	const [products, setProducts] = useState<ProductInfo[]>([]);

	const classes = adminItemStyles();
	let history = useHistory();

	useEffect(() => {
		if(category) {
			getProductsFromCategory(category).then(ps => {
				setProducts(ps);
			}).catch(er => {
				console.error(er);
				history.goBack();
			})
		} else {
			getProducts().then(ps => {
				setProducts(ps);
			}).catch(er => {
				console.error(er);
				history.goBack()
			})
		}
	}, [])
	return (
		<ThemeProvider theme={theme}>
			<Container>
				{
					category &&
          <Grid container style={{marginTop: theme.spacing(2)}}>
              <Grid item xs={12}>
                  <Paper className={classes.paper}>
	                  <Typography className={classes.categoryTitle} color="secondary">
		                  {category}
	                  </Typography>
                  </Paper>
              </Grid>
          </Grid>
				}
				<Grid container spacing={2} className={classes.g}>
					{
						products &&
						products.map((p, i) => (
							<Grid item xs={12}>
								<ProductItem product={p} key={i} />
							</Grid>
						))
					}
				</Grid>
			</Container>
		</ThemeProvider>
	)
})