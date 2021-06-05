  
import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { theme } from '../../App';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getUsers, User } from '../../services/userService';
import { Link, useHistory } from 'react-router-dom';
import { useRootStore } from '../../context/context';

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




export const Login = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [user, setUser] = useState<String>("");

	let history = useHistory();
	
	const store = useRootStore()
	const userStore = store.user;

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		console.log(event.target.value);
		setUser(event.target.value as String);
	};

	const fetchUsers = async () => {
		try {
			getUsers().then(data => {
				setUsers(data);
			}).catch(er => {
				console.error(er);
			})
		} catch(e) {
			console.error(e);
		}
	}

	useEffect(() => {
		fetchUsers();
	}, [])

	const classes = useStyles();

	const submit = () => {
		if(user === "") {
			return;
		}

		const u: User | undefined = users.find(el => el.id == user);

		if(u) {
			userStore.setUser(u);
		}
		
		history.push("/");
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Zaloguj się
				</Typography>
				<Box style={{ minWidth: 360 }}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Nazwa użytkownika</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={user}
							label="User"
							required
							onChange={handleChange}
							MenuProps={{
								anchorOrigin: {
								  vertical: "bottom",	
								  horizontal: "left"
								},
								transformOrigin: {
								  vertical: "top",
								  horizontal: "left"
								},
								getContentAnchorEl: null
							}}
						>
							{
								users && 
								users.map(el => <MenuItem key={el.id} value={el.id}>{el.username}</MenuItem>)
							}
						</Select>
						<Button variant="contained" color="primary" className={classes.submit} type="submit" onClick={submit}>
							Zaloguj
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/register">
								Nie masz jeszcze konta? Zarejestruj się
								</Link>
							</Grid>
						</Grid>
					</FormControl>
				</Box>
			</div>
			</Container>
		</ThemeProvider>
	);
}
