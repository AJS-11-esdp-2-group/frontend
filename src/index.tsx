import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/order
import store from './Store/store';
import { Provider } from 'react-redux';
import { createTheme } from '@mui/material';

export const GlobalTheme = createTheme({
	components: {
	  MuiContainer: {
		styleOverrides: {
		  root: ({ theme }) => theme.unstable_sx({}),
		},
	  },
	  MuiButtonBase: {
		styleOverrides: {
		  root: ({ theme }) =>
			theme.unstable_sx({
			  marginBottom: 3,
			}),
		},
	  },
	  MuiButton: {
		styleOverrides: {
		  root: ({ theme }) =>
			theme.unstable_sx({
			  margin:1,	  
			}),
		},
	  },
	  MuiListItem: {
		styleOverrides: {
		  root: ({ theme }) =>
			theme.unstable_sx({
			  display: 'block',
			  width: '100%', 
			  maxWidth: 360,
			}),
		},
	  },
	  MuiSvgIcon: {
		styleOverrides: {
		  root: ({ theme }) =>
			theme.unstable_sx({
			  margin: '0 8px',
			}),
		},
	  },
	  MuiListItemText: {
		styleOverrides: {
		  root: ({ theme }) =>
			theme.unstable_sx({
			  width: '75%',
			}),
		},
	  },
	  MuiGrid: {
		styleOverrides: {
		  container: {
			display: 'flex',
			alignItems:'stretch',
			flexDirection:'column',
			alignContent:'space-around',
			justifyContent:'space-between',
			'@media (max-width: 600px)': {
			  display: 'block',
			},
		  },
		},
	  },
		MuiImageListItemBar: {
			styleOverrides: {
				root: ({theme}) => 
					theme.unstable_sx({
						background: 
						'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
						'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
					}),
			},
		},
		MuiCheckbox: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 1,
						color: 'Highlight',
                    }),
            },
        },
	},
  });
  

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
