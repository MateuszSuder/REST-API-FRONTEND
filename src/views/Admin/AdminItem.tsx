import {
	Container,
	createStyles,
	FormControl,
	Grid,
	GridSize,
	Input,
	InputLabel,
	makeStyles,
	MenuItem,
	Paper,
	TextField,
	Theme,
	ThemeProvider,
	Typography
} from '@material-ui/core';
import { observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { theme } from '../../App';
import { useRootStore } from '../../context/context';
import {Company} from "../../components/Admin/Company";
import {User} from "../../components/Admin/User";
import {Product} from "../../components/Admin/Product";
import {Order} from "../../components/Admin/Order";

export interface ModelOption {
	label: string,
	value: string
}

export interface ModelItem {
	label: string,
	value: any,
	setValue?: React.Dispatch<any>,
	options?: Array<ModelOption>,
	disabled?: boolean,
	required?: boolean
	type?: 'number',
}

export interface ModelGroup {
	groupName?: string,
	xs: GridSize,
	items: Array<ModelItem>
}

export interface Model {
	create: Array<ModelGroup>,
	modify: Array<ModelGroup>
}

export const adminItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
		g: {
			marginTop: theme.spacing(5),
		},
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
		title: {
			marginRight: theme.spacing(1),
			fontSize: "1.2rem"
		},
		type: {
			textAlign: "right",
			color: theme.palette.primary.dark
		},
		delete: {
			fontSize: "0.7rem",
			color: theme.palette.error.dark,
			cursor: "pointer"
		},
		subTitle: {
			textAlign: "left",
			color: theme.palette.primary.light,
			marginTop: theme.spacing(5),
			borderBottomStyle: "solid",
			borderBottomWidth: "1px",
			borderBottomColor: theme.palette.primary.light,
			marginBottom: theme.spacing(2)
		},
		input: {
    	marginTop: theme.spacing(2),
			width: "70%",
		},
		option: {
			padding: theme.spacing(1),
			cursor: "pointer",
			"&:hover": {
				backgroundColor: theme.palette.action.hover,
			}
		},
		submit: {
			borderTopStyle: "solid",
			borderTopWidth: "1px",
			borderTopColor: theme.palette.primary.light,
			marginTop: theme.spacing(3),
			paddingTop: theme.spacing(2),
			textAlign: "center"
		},
		key: {
			textAlign: "right",
			padding: theme.spacing(2)
		},
		val: {
			textAlign: "left",
			padding: theme.spacing(2)
		},
		add: {
    	textAlign: "right",
			cursor: "pointer"
		},
	  categoryTitle: {
		  textAlign: "center",
		  fontSize: "1.5rem",
		  margin: theme.spacing(0.25),
		  textTransform: "capitalize",
		  color: theme.palette.secondary.dark
	  },
	})
)

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export enum Type {
	User,
	Company,
	Product,
	Order
}

export const AdminItem: IReactComponent = observer(() => {
	const [type, setType] = useState<Type>();
	const [operation, setOperation] = useState<'creating' | 'modifying'>('creating');


	const classes = adminItemStyles();

	let query = useQuery();
	let { adminType } = useParams<{adminType: string}>();
	let history = useHistory();
	const rootStore = useRootStore();
	
	useEffect(() => {
		if(!rootStore.user.userLogged || (rootStore.user.userLogged && rootStore.user.user && rootStore.user.user.permission !== 'admin')) {
			history.push('/');
		} else {
			switch(adminType) {
				case 'users': {
					setType(Type.User);
					setOperation(query.get('id') ? 'modifying' : 'creating');
					break;
				}
				case 'companies': {
					setType(Type.Company);
					setOperation(query.get('id') ? 'modifying' : 'creating');
					break;
				}
				case 'products': {
					setType(Type.Product);
					setOperation(query.get('id') ? 'modifying' : 'creating');
					break;
				}
				case 'orders': {
					setType(Type.Order);
					setOperation(query.get('id') ? 'modifying' : 'creating');
					break;
				}
				default: {
					history.push('/');
				}
			}
		}
	}, [adminType, history, query, rootStore.user.user, rootStore.user.userLogged]);

	return(
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={3} className={classes.g}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
								<Grid container>
									{
										type === Type.User &&
										<User operation={operation}/>
									}
									{
										type === Type.Company &&
										<Company operation={operation}/>
									}
									{
										type === Type.Product &&
										<Product operation={operation} />
									}
									{
										type === Type.Order &&
										<Order operation={operation} />
									}
								</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	);
})