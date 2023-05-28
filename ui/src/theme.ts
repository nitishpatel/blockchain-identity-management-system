import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    typography: {
        fontFamily: "Nunito, Roboto, sans-serif"

    },
    palette: {
        primary: {
            main: '#ee6c4d',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;