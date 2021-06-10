import React, { useEffect } from 'react'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Container, ListItemText, Menu, MenuItem, MenuProps,  Typography,  withStyles } from '@material-ui/core';
import { useRootStore } from '../../context/context';
import { Link } from 'react-router-dom';

const StyledMenu = withStyles({
	paper: {
	  border: '1px solid #d3d4d5',
	},
  })((props: MenuProps) => (
	<Menu
	  elevation={0}
	  getContentAnchorEl={null}
	  anchorOrigin={{
		vertical: 'bottom',
		horizontal: 'center',
	  }}
	  transformOrigin={{
		vertical: 'top',
		horizontal: 'center',
	  }}
	  {...props}
	/>
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
	root: {	
	  justifyContent: "space-between",
	  height: "24px",
	  paddingTop: "18px",
	  paddingBottom: "18px",
	},
  }))(MenuItem);

  const linkStyle = {
	textDecoration: 'none', 
	display: 'block', 
	color: 'black',
	':visited': {
		textDecoration: 'none',
		color: 'black'
	}
  }

  

export const UserMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null);


	const open = Boolean(anchorEl);
	const id = open ? 'spring-popper' : undefined;

	const rootStore = useRootStore();
	const userStore = rootStore.user;

	const logout = () => {
		userStore.logout();
	}



	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Container onMouseOver={handleClick} style={{cursor: "pointer"}}>
				<AccountCircleRoundedIcon htmlColor="white" />
				<Typography>
					{
						userStore.user &&
						userStore.user.username
					}
				</Typography>
			</Container>

			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<div onMouseLeave={handleClose}>
					{
						userStore.user && userStore.user.permission === 'admin' &&
						<Link to="/admin" style={linkStyle}>
							<StyledMenuItem>
								<ListItemText primary="AdminView" />
							</StyledMenuItem>
						</Link>
					}
					<Link to="/" style={linkStyle}>
						<StyledMenuItem>
							<ListItemText primary="Konto" />
						</StyledMenuItem>
					</Link>
					<Link to="/" style={linkStyle}>
						<StyledMenuItem>
							<ListItemText primary="Zamówienia" />
						</StyledMenuItem>
					</Link>
					<Link to="/" onClick={logout} style={linkStyle}>
						<StyledMenuItem>
							<ListItemText primary="Wyloguj" />
						</StyledMenuItem>
					</Link>
				</div>
			</StyledMenu>
		</div>
	)
}
