import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles} from "../../views/Admin/AdminItem";
import {ProductInfo} from "../../services/productService";
import React from "react";

export const productStyle = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			fontSize: "1.5rem",
			paddingBottom: theme.spacing(1)
		}
	})
)

export const ProductItem: IReactComponent = observer(({product}: {product: ProductInfo}) => {
	const classes = adminItemStyles();
	const prodClass = productStyle();


	return (
		<ThemeProvider theme={theme}>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container>
						<Grid item xs={8}>
							{
								product &&
									<Typography className={prodClass.title}>
										{product.name}
									</Typography>
							}
						</Grid>
						<Grid item xs={8}>
							{
								product &&
								product.specification &&
									product.specification.map(s => (
										<Grid container spacing={1}>
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