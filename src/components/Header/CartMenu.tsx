import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Container, createStyles, Grid, makeStyles, Popover, Theme, Typography} from '@material-ui/core';
import {useRootStore} from "../../context/context";
import {observer} from "mobx-react";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
	  menu: {
    	cursor: "pointer",
		  textDecoration: "none",
		  color: "white",
		  "&focus": {
			  textDecoration: "none",
		  },
	  },
	  menuContainer: {
    	width: "25vw"
	  },
	  item: {
    	padding: theme.spacing(2)
	  }
  }),
);

export const CartMenu = observer(() => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const store = useRootStore();

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handlePopoverClose = () => {
	  setAnchorEl(null);
	};
  
	const open = Boolean(anchorEl);
  
	return (
	  <Link to="/cart" className={classes.menu}>
			<Container
			  aria-owns={open ? 'mouse-over-popover' : undefined}
			  aria-haspopup="true"
			  onMouseEnter={handlePopoverOpen}
			  onMouseLeave={handlePopoverClose}
			>
			  <ShoppingCartIcon />
			  <Typography>
				  {
					  (store.cart.price / 100).toFixed(2) + " zł"
			    }
			  </Typography>
			</Container>
			<Popover
			  id="mouse-over-popover"
			  className={classes.popover}
			  classes={{
					paper: classes.paper,
			  }}
			  open={open}
			  anchorEl={anchorEl}
			  anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
			  }}
			  transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
			  }}
			  onClose={handlePopoverClose}
			  disableRestoreFocus
			>
				{
					store.cart.items.length > 0 &&
					<Grid container className={classes.menuContainer} spacing={2}>
						<Grid item xs={12}>
							<Typography align="center" variant="h6">
								Koszyk
							</Typography>
						</Grid>
						<Grid item xs={12}>
							{
								store.cart.items.map((item, i) => (
									<Grid container key={i} className={classes.item}>
										<Grid item xs={4}>
											<Typography  align="center">
												{
													item.name
												}
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography align="center">
												{
													item.quantity
												}
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography align="center">
												{
													(item.price * item.quantity / 100).toFixed(2)
												}
											</Typography>
										</Grid>
									</Grid>
								))
							}
						</Grid>
					</Grid>
				}
				{
					store.cart.items.length === 0 &&
	        <Grid container>
	          <Grid item xs={12}>
	            <Typography align="center">
								Twój koszyk jest pusty...
	            </Typography>
	          </Grid>
	        </Grid>
				}
			</Popover>
	  </Link>
	);
})
