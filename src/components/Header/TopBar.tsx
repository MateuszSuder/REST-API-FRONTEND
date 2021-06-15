import React, { FC, useEffect } from 'react'
import { AppBar, Button, Container, createStyles, makeStyles, ThemeProvider, Toolbar } from '@material-ui/core'
import { Theme } from '@material-ui/core';
import { props, theme } from '../../App';
import { CategoryMenu }  from './Menu';
import { Link } from "react-router-dom"
import { UserMenu } from './UserMenu';
import { CartMenu } from './CartMenu';
import { observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';

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
	},
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	rowChildren: {
		display: "flex",
		gap: "32px",
		color: "white"
	}
  }),
);

export const TopBar: IReactComponent = observer(({store}: props) => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="sticky">
				<Toolbar className={classes.toolbar}>
					<CategoryMenu />
						<div className={classes.row}>
							{
								!store.user.userLogged &&
								<Button color="inherit" component={Link} to="/login" style={{marginRight: 0}}>Login</Button>
							}
							{
								store.user.userLogged &&
								<div className={classes.rowChildren}>
									<UserMenu />
									<CartMenu />
								</div>
							}
						</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	)
})
