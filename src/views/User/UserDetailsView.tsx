import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Container, Grid, Paper, ThemeProvider} from "@material-ui/core";
import {ItemForm} from "../../components/Admin/ItemForm";
import {adminItemStyles, Model} from "../Admin/AdminItem";
import React, {useEffect, useState} from "react";
import {ItemSubmit} from "../../components/Admin/ItemSubmit";
import {createUser, getUser, modifyUser} from "../../services/userService";
import {useHistory, useParams} from "react-router-dom";
import {useRootStore} from "../../context/context";

export const UserDetailsView: IReactComponent = observer(() => {
	const [values, setValues] = useState({deliveryDetails: {
		name: "", lastName: "",
		address: {
			city: "", country: "", number: "", postcode: "", street: ""
		}
	}})
	const [open, setOpen] = React.useState(false);

	const classes = adminItemStyles();
	const store = useRootStore();
	const history = useHistory();

	let { id } = useParams<{id: string}>();

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
		getUser(id).then(r => {
			setValues({
				...values,
				deliveryDetails: r.deliverDetails ? r.deliverDetails : values.deliveryDetails
			})
		})
	}, [])

	const onSubmit = () => {
		modifyUser(id, {
			companyID: store.user.user && store.user.user.company ? store.user.user?.company.id : undefined,
			deliveryDetails: values.deliveryDetails,
			permission: store.user.user?.permission as 'user' | 'admin'
		}).then(r => history.goBack());
	}

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