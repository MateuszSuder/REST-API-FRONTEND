import React from 'react'
import { AppBar, Button, createStyles, makeStyles, ThemeProvider, Toolbar } from '@material-ui/core'
import { Theme } from '@material-ui/core';
import { theme } from '../App';
import { CategoryMenu }  from './Menu';
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
					<CategoryMenu />
					<Button color="inherit">Login</Button>
        		</Toolbar>
      		</AppBar>
		</ThemeProvider>
	)
}
