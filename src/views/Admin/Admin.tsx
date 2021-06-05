import { Container, createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { theme } from '../../App';
import { useRootStore } from '../../context/context';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { getUsersInfo } from '../../services/userService';
import { getCompaniesInfo } from '../../services/companySevice';
import { getProductsInfo, ProductsInfo } from '../../services/productService';
import { OrdersInfo } from '../../services/orderService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
		g: {
			marginTop: theme.spacing(2),
		},
		manage: {
			color: theme.palette.primary.light,
			fontSize: "0.8rem",
			textAlign: "right",
			textDecoration: "none"
		},
		title: {
			marginRight: theme.spacing(1),
			fontSize: "1.2rem"
		},
		link: {
			textDecoration: "none",
			color: theme.palette.primary.light,
			"&:visited": {
				textDecoration: "none",
				color: theme.palette.primary.light
			}
		},
		info: {
			color: theme.palette.secondary.dark
		}
  }),
);


export const Admin = () => {
	const [usersNumber, setUsersNumber] = useState(0);
	const [companiesNumber, setCompaniesNumber] = useState(0);
	const [productsInfo, setProductsInfo] = useState<ProductsInfo>({numberOfProducts: 0, productsWithLowAmount: 0});
	const [ordersInfo, setOrdersInfo] = useState<OrdersInfo>({delivered: 0, paymentDone: 0, shipped: 0, waitingForPayment: 0})

	const productAmountCheck = 10;

	const classes = useStyles();

	const fields = [
		{
			title: "Użytkownicy",
			icon: <PersonIcon/>,
			path: "/admin/users",
			info: [
				{
					key: "Liczba użytkowników",
					value: usersNumber
				}
			]
		},
		{
			title: "Firmy",
			icon: <PeopleIcon/>,
			path: "/admin/companies",
			info: [
				{
					key: "Liczba firm",
					value: companiesNumber
				}
			]
		},
		{
			title: "Produkty",
			icon: <StoreIcon/>,
			path: "/admin/products",
			info: [
				{
					key: "Liczba produktów",
					value: productsInfo.numberOfProducts
				},
				{
					key: "Liczba produktów z ilością mniejszą niż " + productAmountCheck,
					value: productsInfo.productsWithLowAmount
				}
			]
		},
		{
			title: "Zamówienia",
			icon: <ReceiptIcon/>,
			path: "/admin/orders",
			info: [
				{
					key: "Zamówienia czekające na zatwierdzenia płatności",
					value: ordersInfo.waitingForPayment
				},
				{
					key: "Zamówienia opłacone",
					value: ordersInfo.paymentDone
				},
				{
					key: "Zamówienia wysłane",
					value: ordersInfo.shipped
				},
				{
					key: "Zamówienia dostarczone",
					value: ordersInfo.delivered
				},
			]
		},
	]

	const rootStore = useRootStore();
	let history = useHistory();

	useEffect(() => {
		if(!rootStore.user.userLogged || (rootStore.user.userLogged && rootStore.user.user && rootStore.user.user.permission != 'admin')) {
			history.push('/');
		} else {
			getUsersInfo().then(res => {
				setUsersNumber(res.numberOfUsers)
			});
			getCompaniesInfo().then(res => {
				setCompaniesNumber(res.numberOfCompanies)
			});
			getProductsInfo(productAmountCheck).then(res => {
				setProductsInfo(res)
			});
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={3} className={classes.g}>
					{
						fields.map(el => 
							{
								return(
									<Grid item xs={12}>
										<Paper className={classes.paper}>
											<Grid container spacing={3}>
												<Grid item xs={8} container>
													<Typography className={classes.title}>{el.title}</Typography>
													{
														el.icon
													}
												</Grid>
												<Grid item xs={8}>
													{
														el.info && el.info.map(info => {
															return (
																<Typography className={classes.info}>
																	{
																		info.key + ": " + info.value
																	}
																</Typography>
															)
														})
													}
												</Grid>
											</Grid>
											<Typography className={classes.manage}>
												<Link to={el.path} className={classes.link}>Zarządzaj...</Link>
											</Typography>
										</Paper>
									</Grid>
								)
							})
					}
				</Grid>
			</Container>
		</ThemeProvider>
	)
}
