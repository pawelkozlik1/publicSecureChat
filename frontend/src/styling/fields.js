import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { primaryColor, secondaryColor, lightTextColor } from './common';

export const textRegisteredStyles = makeStyles((theme) => ({
    text_editor_label: {
        color: lightTextColor, // bdbdbd
    },
    text_editor_label_dark: {
        color: '#333333',
    },
    margin_bottom_editor: {
        margin: theme.spacing(0, 0, 20),
    },
    text_editor: {
        color: primaryColor,
        '&:hover': {
            color: secondaryColor,
            cursor: 'pointer',
        },
    },
    box_editor: {
        margin: theme.spacing(3, 0, 1),
        backgroundColor: primaryColor,
        '&:hover': {
            backgroundColor: secondaryColor,
        },
    },
    header_editor: {
        textAlign: 'center',
        color: primaryColor,
        fontSize: 'xxx-large',
    },
    textfield_editor: {
        width: '100%',
    },
    form_editor: {
        width: '400px',
        textAlign: 'center',
    },
    input_textfield: {
        color: lightTextColor,
        fontWeight: 'light',
        margin: theme.spacing(0, 0, 2),
    },
    button_editor: {
        margin: theme.spacing(0, 0, 0),
        backgroundColor: primaryColor,
        '&:hover': {
            backgroundColor: secondaryColor,
        },
    },
    search_editor: {
        width: '250px',
        textAlign: 'center',
        margin: theme.spacing(0, 1, 0),
    },
    box_spacing: {
        margin: theme.spacing(0, 5, 0),
    },
    icon_editor: {
        color: primaryColor,
        margin: theme.spacing(0, 1, 0),
    },
    styled_field_editor: {
        width: '250px',
        textAlign: 'center',
        marginRight: theme.spacing(2),
    },
}));

export const CssTextField = withStyles({
    root: {
        '& .MuiInput-underline': {
            '&:hover:not($disabled):after': {
                borderColor: primaryColor,
            },
            '&:hover:not($disabled):before': {
                borderColor: primaryColor,
            },
        },
        '& label.Mui-focused': {
            color: primaryColor,
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: lightTextColor,
            '&:focus': {
                borderColor: primaryColor,
            },
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: primaryColor,
        },
        '& .MuiInput-underline:hover': {
            borderColor: lightTextColor,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: lightTextColor,
            },
            '&:hover fieldset': {
                borderColor: lightTextColor,
            },
            '&.Mui-focused fieldset': {
                borderColor: lightTextColor,
            },
        },
    },
})(TextField);

