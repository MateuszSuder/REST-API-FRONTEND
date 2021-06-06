import { Button, Container, createStyles, Grid, Icon, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { categories } from '../../services/categoryService';
import { Company, getCompanies } from '../../services/companySevice';
import { getOrdersMinified, OrderMinified } from '../../services/orderService';
import { getProductsMinified, ProductMinified } from '../../services/productService';
import { getUsersMinified, UserMinified } from '../../services/userService';
import * as translation from '../../translation.json';
import { AdminItem } from './AdminItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
			color: theme.palette.primary.dark,
			"&:visited": {
				textDecoration: "none",
				color: theme.palette.primary.dark
			}
		},
		info: {
			color: theme.palette.secondary.dark
		},
		values: {
			"&:first-letter": {
				textTransform: "capitalize"
			}
		},
    buttonContainer: {
      margin: theme.spacing(3)
    },
    button: {
      cursor: "pointer"
    }
  }),
);


export const AdminList: IReactComponent = observer(() => {
	const [listType, setListType] = useState("");
	const [list, setList] = useState<Company[] | OrderMinified[] | UserMinified[] | ProductMinified[]>([{id: "0", name: ""}]);

	const classes = useStyles();
	let history = useHistory();

	const translate = (toTranslate: string): string => {
		if(toTranslate in translation.primary) {
			// @ts-ignore
			return translation.primary[toTranslate];
		} else {
			return toTranslate;
		}
	}

	useEffect(() => {
		setListType(history.location.pathname.replace("/admin/", ""));
		console.log(history);
	}, [])

	useEffect(() => {
		switch(listType) {
			case 'users': {
				getUsersMinified().then(data => {
					setList(data);
				})
				break;
			}
			case 'companies': {
				getCompanies().then(data => {
					setList(data);
				}).catch(er => {
					console.error(er);
				})
				break;
			}
			case 'orders': {
				getOrdersMinified().then(data => {
					setList(data);
				})
				break;
			}
			case 'products': {
				getProductsMinified().then(data => {
					setList(data);
				})
				break;
			}
		}
	}, [listType])

	useEffect(() => {
		console.log(history);
	}, [history])

	return(
		<>
			<Switch>
				<Route path="/admin/:adminType/*">
					<AdminItem />
				</Route>
				<Route path="/admin/*">
					<Container>
						<Grid container spacing={3} className={classes.g}>
							{
								list && list.map((el: Company | OrderMinified | UserMinified | ProductMinified, i: number) => {
									return (
										<Grid item xs={12} key={i}>
											<Paper className={classes.paper}>
												{
													<Typography className={classes.title}>{"ID: " + el.id}</Typography>
												}
												{
													Object.entries(el).map((e, i) => {
														if(e[0] != "id" && e[0] && e[1]) {
															return (
																<Typography key={i} className={classes.values}>{translate(e[0]) + ": " + e[1]}</Typography>
															)
														}
													})
												}
												<Typography className={classes.manage}>
													<Link to={history.location.pathname + `/?id=${el.id}`} className={classes.link}>Zarządzaj...</Link>
												</Typography>
											</Paper>
										</Grid>
									)
								})
							}
              <Grid container justify="flex-end" className={classes.buttonContainer}>
                <Link to={history.location.pathname + '/'}>
                  <AddCircleIcon color="primary" style={{fontSize: "40px"}} className={classes.button} />
                </Link>
              </Grid>
						</Grid>
					</Container>
				</Route>
			</Switch>
		</>
	);
})