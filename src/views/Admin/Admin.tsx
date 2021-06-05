import { Container, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { theme } from '../../App';
import { useRootStore } from '../../context/context';

export const Admin = () => {
	const userStore = useRootStore().user;
	let history = useHistory();

	useEffect(() => {
		if(!userStore.userLogged || (userStore.userLogged && userStore.user && userStore.user.permission != 'admin')) {
			history.push('/');
		}
	}, [])

	return (
		<Container maxWidth="lg">
			<Typography align="right" color="primary">
				TEST
			</Typography>
		</Container>
	)
}
