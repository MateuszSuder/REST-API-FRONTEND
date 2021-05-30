import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import makeRequest, { requestType } from '../services/fetcher';

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
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {	
	justifyContent: "space-between",
  },
}))(MenuItem);

const StyledMenuIcon = withStyles((theme) => ({
	root: {
		justifyContent: "flex-end",
	},
}))(ListItemIcon);

export const CategoryMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let categories: Array<string> = [];

  React.useEffect(() => {
	async function getCategories() {
		const res = await makeRequest(requestType.GET, "api/category") as Array<string>;
		categories = res;
		return categories;
	}
	getCategories();
  }, [])

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Kategorie
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Kategoria 1" />
		  <StyledMenuIcon>
            <ArrowForwardIosIcon fontSize="small" />
          </StyledMenuIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Kategoria 2" />
		  <StyledMenuIcon>
            <ArrowForwardIosIcon fontSize="small" />
          </StyledMenuIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Kategoria 3" />
		  <StyledMenuIcon>
            <ArrowForwardIosIcon fontSize="small" />
          </StyledMenuIcon>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}