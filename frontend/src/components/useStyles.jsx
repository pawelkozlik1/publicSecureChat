import {makeStyles} from "@material-ui/core";
import {bgDarker, bgLighter, lightTextColor, primaryColor} from "../styling/common";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    links: {
        textDecoration: 'none',
        transitionDuration: 300,
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: bgDarker,
        color: lightTextColor,
        width: 240,
    },
    icon: {
        color: primaryColor,
    },
    box: {
        color: lightTextColor,
        '&:hover': {
            color: primaryColor,
        },
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        color: lightTextColor,
        '&:hover': {
            color: primaryColor,
        },
        paddingLeft: theme.spacing(4),
    },
    main: {
        width: '100%',
        height: '100vh',
        backgroundColor: bgLighter,
    },
}));

export default useStyles;