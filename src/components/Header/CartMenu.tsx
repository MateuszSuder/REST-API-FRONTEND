import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Container, createStyles, makeStyles, Popover, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

export const CartMenu = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handlePopoverClose = () => {
	  setAnchorEl(null);
	};
  
	const open = Boolean(anchorEl);
  
	return (
	  <div>
		<Container
		  aria-owns={open ? 'mouse-over-popover' : undefined}
		  aria-haspopup="true"
		  onMouseEnter={handlePopoverOpen}
		  onMouseLeave={handlePopoverClose}
		>
		  <ShoppingCartIcon />
		  <Typography>0.00zł</Typography>
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
		  <Typography>Info about cart...</Typography>
		</Popover>
	  </div>
	);
}
