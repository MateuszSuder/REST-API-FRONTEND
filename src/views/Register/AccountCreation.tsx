import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {createUser} from "../../services/userService";

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(32),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	avatar: {
	  margin: theme.spacing(4),
	  backgroundColor: theme.palette.primary.main,
	},
	form: {
	  width: '100%',
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(4, 0, 2),
	}
  }));

export const AccountCreation = () => {
	const [username, setUsername] = useState<string>("");
	const classes = useStyles();

	const history = useHistory();

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setUsername(event.target.value as string);
	};

	const register = () => {
		createUser(username).then(r =>
			history.push('/')
		);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Utwórz konto
				</Typography>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="username"
					label="Nazwa użytkownika"
					name="username"
					autoComplete="username"
					value={username}
					onChange={handleChange}
				/>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={register}
				>
					Utwórz konto
				</Button>
				<Grid container justify="flex-end">
					<Grid item>
						<Link to="/login">
							Masz już konto? Zaloguj się
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
}
