import { Container, createStyles, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Paper, TextField, Theme, ThemeProvider, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { theme } from '../../App';
import { useRootStore } from '../../context/context';
import { formGroup, formInputs, formItem, inputType } from '../../services/fetcher';
import { userInputs } from '../../services/userService';

const useStyles = makeStyles((theme: Theme) =>
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
			width: "25ch",
		},
		option: {
			padding: theme.spacing(1),
			cursor: "pointer",
			"&:hover": {
				backgroundColor: theme.palette.action.hover,
			}
		}
	})
)

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

enum Operation {
	creating,
	modifying
}

export const AdminItem: IReactComponent = observer(() => {
	const [values, setValues] = useState({username: "", permission: "", companyID: "", companyName: ""});
	const [operation, setOperation] = useState<Operation>(Operation.creating);
	const [inputs, setInputs] = useState<Array<formGroup> | null>(null);

	const classes = useStyles();

	let query = useQuery();
	let { adminType } = useParams<{adminType: string}>();
	let history = useHistory();
	const rootStore = useRootStore();
	
	useEffect(() => {
		if(!rootStore.user.userLogged || (rootStore.user.userLogged && rootStore.user.user && rootStore.user.user.permission != 'admin')) {
			history.push('/');
		} else {
			switch (adminType) {
				case 'users': {
					if(query.get("id")) {
						setOperation(Operation.modifying);
						setInputs(userInputs.modify);
					} else {
						setOperation(Operation.creating);
						setInputs(userInputs.create);
					}
					break;
				}
				default: {
					return;
				}
			}
		}
	}, []);

	useEffect(() => {
		console.log(values);
	}, [values])

	const getValue = (key: keyof typeof values) => {
		if(key in values) {
			return values[key];
		}
		setValues({...values, [key] : "0"});
		return values[key];
	}

	const textTransform = (s: string) => {
		if(s.includes("user")) {
			return "Użytkownik";
		}
		if(s.includes("order")) {
			return "Zamówienie";
		}
		if(s.includes("compan")) {
			return "Firma";
		}
		if(s.includes("product")) {
			return "Produkt";
		}
		return "";
	}

	const handleChange = (key: keyof typeof values, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValues({...values, [key]: event.target.value });
  };
	
	return(
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={3} className={classes.g}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
								<Grid container>
									{
										operation === Operation.modifying &&

										<Grid item xs={6}>
											<Typography className={classes.title}>
												ID: {query.get("id")}
											</Typography>
										</Grid>
									}
									<Grid item xs={operation === Operation.modifying ? 6 : 12}>
										<Typography className={classes.type}>
											{ textTransform(adminType) }
										</Typography>
									</Grid>
									{
										operation === Operation.modifying &&

										<Grid item xs={12}>
											<Typography className={classes.delete}>Usuń...</Typography>
										</Grid>
									}
									{
										inputs &&
										inputs.map((el, i) => {
											return (
												<React.Fragment key={i}>
													{
														el.groupTitle &&
														<Grid item xs={12}>
															<Typography className={classes.subTitle}>{el.groupTitle}</Typography>
														</Grid>
													}
													{
														el.items.map((item: formItem, i: number, ar) => {
															return (
																<Grid item xs={el.gridSize} key={i}>
																	<TextField 
																		required={item.required}
																		disabled={item.disabled}
																		id={item.title}
																		label={item.title}
																		select={item.type == inputType.select ? true : false} 
																		className={classes.input}
																		onChange={(e) => handleChange(item.name as keyof typeof values, e)}
																		value={getValue(item.name as keyof typeof values)}
																	>
																		{
																			<option value="" style={{display: "none"}}></option>
																		}
																		{
																			item.values &&
																			item.values.map((opt, i) => (
																				<option key={opt + i} value={opt} className={classes.option}>
																					{opt}
																				</option>
																			))
																		}
																	</TextField>
																</Grid>
															)
														})
													}
											</React.Fragment>
											)
										})
									}
								</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	);
})