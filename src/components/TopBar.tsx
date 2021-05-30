import React from 'react'
import { AppBar, Button, Container, createStyles, IconButton, makeStyles, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Theme } from '@material-ui/core';
import { theme } from '../App';
import { SimpleMenu } from './Menu';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
	toolbar: {
		justifyContent: "space-between",
	}
  }),
);

export const TopBar = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="sticky">
				<Toolbar className={classes.toolbar}>
					<SimpleMenu />
					<Button color="inherit">Login</Button>
        		</Toolbar>
      		</AppBar>
		</ThemeProvider>
	)
}
