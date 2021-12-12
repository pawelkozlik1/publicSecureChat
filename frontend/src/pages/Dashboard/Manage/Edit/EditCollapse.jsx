import {Box, Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import useStyles from "../../../../components/useStyles";


const EditCollapse = ({checkPath, open}) => {
    const classes = useStyles();
    let link1;
    let link2;
    let key1;
    let key2;
    if (checkPath === 'admin') {
        link1 = '/dashboard/admin/users';
        link2 = '/dashboard/admin/configs';
        key1 = 'Użytkownicy';
        key2 = 'Konfiguracje';
    }
    return (
        <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
                <Link
                    to={link1}
                    style={{textDecoration: 'none'}}
                    key={key1}
                >
                    <ListItem
                        button
                        disableRipple
                        className={classes.nested}>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='row'
                        >
                            <ListItemIcon className={classes.icon}>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary={key1} className={classes.links}/>
                        </Box>
                    </ListItem>
                </Link>


                <Link
                    to={link2}
                    style={{textDecoration: 'none'}}
                    key={key2}
                >
                    <ListItem
                        button
                        disableRipple
                        className={classes.nested}>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='row'
                        >
                            <ListItemIcon className={classes.icon}>
                                <EditIcon/>
                            </ListItemIcon>
                            <ListItemText primary={key2} className={classes.links}/>
                        </Box>
                    </ListItem>
                </Link>
            </List>
        </Collapse>
    );
};

export default EditCollapse;