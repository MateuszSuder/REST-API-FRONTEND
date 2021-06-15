import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {createStyles, Grid, makeStyles, Paper, Theme, ThemeProvider, Typography} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useStyles} from "../Admin/AdminList";
import {getUserOrders, OrderType} from "../../services/orderService";
import * as translation from "../../translation.json";

const orderListStyles = makeStyles((theme: Theme) =>
	createStyles({
		item: {
			cursor: "pointer",
			color: theme.palette.primary.light,
			fontSize: "1.2rem",
			textDecoration: "underline"
		}
	})
)

export const UserOrdersView: IReactComponent = observer(() => {
	const [orders, setOrders] = useState<OrderType[]>([]);
	const classes = useStyles();
	const lClasses = orderListStyles();

	let { id } = useParams<{id: string}>();

	const translate = (toTranslate: string): string => {
		if(toTranslate in translation.primary) {
			// @ts-ignore
			return translation.primary[toTranslate];
		} else {
			return toTranslate
		}
	}

	useEffect(() => {
		if(id) {
			getUserOrders(id).then(os => {
				setOrders(os);
			})
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			{
				orders.map((el, i) => (
					<Grid item xs={12} key={i}>
						<Paper className={classes.paper}>
							{
								<Link to={`/order/summary/${el.id}`}>
									<Typography className={lClasses.item}>{el.id}</Typography>
									<Typography>({translate(el.status[el.status.length - 1].status)})</Typography>
								</Link>
							}
						</Paper>
					</Grid>
				))
			}
		</ThemeProvider>
	)
});