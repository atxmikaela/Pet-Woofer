import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

const theme = createTheme( {
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px !important',
          margin: '0 auto',
          padding: '0 20px',
        },
      },
    },
  },
} );

export default function Layout (): JSX.Element
{
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState( false );
  useEffect( () =>
  {
    dispatch( thunkAuthenticate() ).then( () => setIsLoaded( true ) );
  }, [ dispatch ] );

  return (
    <>
      <CssBaseline>
        <ThemeProvider theme={ theme }>
          <ModalProvider>
            <Navigation />
            { isLoaded && <Outlet /> }
            <Modal />
          </ModalProvider>
        </ThemeProvider>
      </CssBaseline >
    </>
  );
}
