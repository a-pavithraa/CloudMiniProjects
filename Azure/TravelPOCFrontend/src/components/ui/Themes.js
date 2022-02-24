import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { blue, grey, lightBlue, lightGreen, red } from '@mui/material/colors';
import { Paper, TextField } from '@mui/material';
export const darkTheme = createTheme({
  mode: 'dark',
  palette: {
    primary: {
      main: "#001026",
      light: lightBlue[100],
      dark: lightGreen[700],
      text: {
        primary: lightBlue[100],
        secondary: lightBlue[300],
      },
    },
    secondary: {
      main: '#f44336',
    },
    danger: {
      main: red
    }
  },
  components: {
    // Name of the component
    MuiTab: {
      styleOverrides: {
        // Name of the slot
        root: {

          fontSize: '1rem',
          color: "red"

          // Some CSS

        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#193a58"
        }
      }
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#031121",
          color: "white",
          '& h6': {
            color: 'red'
          }
        }
      }
    },
    MuiPaginationItem:{
      ul: {
        "& .MuiPaginationItem-root": {
          color: "#fff"
        }
      }
    }
  },
  space: [0, 4, 8, 16, 16, 64],
  spacing: 2
}
);

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex', marginLeft: "15px", background: '#002e4f', color: 'white', boxShadow: 'inset 0px 15px 30px rgba(0, 16, 38, 0.5)', borderRadius: "10px"

}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex', alignItems: 'center', paddingTop: theme.spacing(5), paddingLeft: theme.spacing(3)

}));

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

export const NormalParagraph = styled(Paper)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(10),
  margin: theme.spacing(10),
  fontSize: "0.6em",
  color: theme.palette.primary.text.primary

}));

export const ResultDiv = styled(Paper)(({ theme }) => ({
  background: "#282a37",
  borderColor: "#a3d7fc",
  boxShadow: "0 0 8px #a3d7fc",
  padding: theme.spacing(10),
  margin: theme.spacing(10),
  color: theme.palette.primary.text.primary

}));

export const LoginTextField = styled(TextField)(({ theme }) => ({
  width: '25ch',
  margin: theme.spacing(3),
  borderBottomColor: 'white',
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiInput-underline-root': {
    '& fieldset': {
      borderBottomColor: 'white',
    },
    '&:hover fieldset': {
      borderBottomColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderBottomColor: 'green',
    },
  },
}));