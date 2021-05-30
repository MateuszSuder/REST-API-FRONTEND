import { Observer } from 'mobx-react';
import React from 'react';
import './App.css';
import { TopBar } from './components/TopBar';

import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	palette: {
	  primary: {
		main: '#80d8ff',
	  },
	  secondary: {
		main: '#82b1ff',
	  },
	},
  });

const App = () => {
  return (
    <Observer>
      {() => (
        <div className="App">
			<TopBar />
        </div>
      )}
    </Observer>
  );
}

export default App;
