import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Container, Grid, Paper, ThemeProvider} from "@material-ui/core";
import {ItemForm} from "../../components/Admin/ItemForm";
import {ItemSubmit} from "../../components/Admin/ItemSubmit";
import React, {useEffect, useState} from "react";
import {adminItemStyles, Model} from "../Admin/AdminItem";
import {useHistory} from "react-router-dom";
import {getUser} from "../../services/userService";
import {useRootStore} from "../../context/context";

export const OrderDelivery: IReactComponent = observer(() => {
	const [values, setValues] = useState({deliveryDetails: {
			name: "", lastName: "",
			address: {
				city: "", country: "", number: "", postcode: "", street: ""
			}
		}})
	const store = useRootStore();
	const classes = adminItemStyles();
	const history = useHistory();

	const onSubmit = () => {
		history.replace('/order/summary');
	}

	const m: Model = {
		create: [],
		modify: [
			{
				groupName: "Adres dostawy",
				xs: 4,
				items: [
					{
						label: "Imię",
						value: values.deliveryDetails.name,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {...values.deliveryDetails, name: v.target.value}
						})
					},
					{
						label: "Nazwisko",
						value: values.deliveryDetails.lastName,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {...values.deliveryDetails, lastName: v.target.value}
						})
					},
					{
						label: "Państwo",
						value: values.deliveryDetails.address.country,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {
								...values.deliveryDetails,
								address: {
									...values.deliveryDetails.address,
									country: v.target.value
								}
							}
						})
					},
					{
						label: "Kod pocztowy",
						value: values.deliveryDetails.address.postcode,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {
								...values.deliveryDetails,
								address: {
									...values.deliveryDetails.address,
									postcode: v.target.value
								}
							}
						})
					},
					{
						label: "Miasto",
						value: values.deliveryDetails.address.city,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {
								...values.deliveryDetails,
								address: {
									...values.deliveryDetails.address,
									city: v.target.value
								}
							}
						})
					},
					{
						label: "Ulica",
						value: values.deliveryDetails.address.street,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {
								...values.deliveryDetails,
								address: {
									...values.deliveryDetails.address,
									street: v.target.value
								}
							}
						})
					},
					{
						label: "Numer domu/mieszkania (np.: 24/6)",
						value: values.deliveryDetails.address.number,
						setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
							...values,
							'deliveryDetails': {
								...values.deliveryDetails,
								address: {
									...values.deliveryDetails.address,
									number: v.target.value
								}
							}
						})
					},
				]
			}
		]
	}

	useEffect(() => {
		const id = store.user.user && store.user.user.id;
		if(!id) return;
		getUser(id).then(r => {
			setValues({
				...values,
				deliveryDetails: r.deliverDetails ? r.deliverDetails : values.deliveryDetails
			})
		})
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={3} className={classes.g}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Grid container>
								<ItemForm operation="modifying" model={m} />
								<ItemSubmit submit={onSubmit} />
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	)
});