import { Observer } from 'mobx-react';
import React from 'react';
import './App.css';
import { TopBar } from './components/Header/TopBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Account/Login';
import { Admin } from './components/Admin/Admin';
import { AccountCreation } from './components/Account/AccountCreation';

export const theme = createMuiTheme({
	palette: {
	  primary: {
		main: '#80d8ff',
	  },
	  secondary: {
		main: '#82b1ff',
	  },
	  text: {
		  primary: "#000000",
		  secondary: '#000000'
	  }
	},
  });

const App = () => {
  return (
    <Observer>
      {() => (
		<Router>
				<ThemeProvider theme={theme}>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<AccountCreation />
						</Route>
						<Route path="/">
							<div className="App">
								<TopBar />
								<Switch>
									<Route path="/admin">
										<Admin />
									</Route>
								</Switch>
							</div>
						</Route>
					</Switch>
				</ThemeProvider>
		</Router>
      )}
    </Observer>
  );
}

export default App;
