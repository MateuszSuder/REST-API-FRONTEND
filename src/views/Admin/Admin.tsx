import { Container, createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { theme } from '../../App';
import { useRootStore } from '../../context/context';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';

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
	}
  }),
);


export const Admin = () => {
	const [usersNumber, setUsersNumber] = useState(0);
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
			path: "/admin/companies"
		},
		{
			title: "Produkty",
			icon: <StoreIcon/>,
			path: "/admin/products"
		},
		{
			title: "Zamówienia",
			icon: <ReceiptIcon/>,
			path: "/admin/orders"
		},
	]

	const rootStore = useRootStore();
	let history = useHistory();

	useEffect(() => {
		if(!rootStore.user.userLogged || (rootStore.user.userLogged && rootStore.user.user && rootStore.user.user.permission != 'admin')) {
			history.push('/');
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
											<Grid container>
												<Grid item xs={8}>
													<Typography className={classes.title}>{el.title}</Typography>
													{
														el.icon
													}
												</Grid>
												<Grid item xs={8}>
													{
														el.info && el.info.map(info => {
															return (
																<Typography>
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
