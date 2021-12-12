import React from 'react';
import {Box, Collapse, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import UsersListItem from './UsersListItem';
import {primaryColor, secondaryColor} from '../../../../styling/common';

const useStyles = makeStyles((theme) => ({
    form_box: {
        margin: theme.spacing(0, 3, 0),
        color: primaryColor,
        '&:hover': {
            color: secondaryColor,
            cursor: 'pointer',
        },
    },
}));

const UsersList = ({users, setUsers}) => {
    const [collapseId, setCollapseId] = React.useState(null);

    const localClasses = useStyles();

    const handleClick = (id) => {
        setCollapseId(id);
    };

    const isCollapseOpen = (id) => id === collapseId;

    return (
        <List>
            {users.map(user => (
                <ListItem
                    button
                    disableRipple
                    key={user.id}
                    onClick={() => handleClick(user.id)}
                >
                    <Box className={localClasses.form_box}>
                        <ListItemText primary={user.username}/>
                        <div>
                            {isCollapseOpen(user.id)
                                ? <ExpandLess/>
                                : <ExpandMore/>
                            }
                        </div>
                        <Box>
                            <Collapse
                                in={isCollapseOpen(user.id)}
                                timeout='auto'
                                unmountOnExit
                            >
                                <UsersListItem
                                    users={users}
                                    user={user}
                                    setUsers={setUsers}
                                />
                            </Collapse>
                        </Box>
                    </Box>

                </ListItem>
            ))}
        </List>

    );

};

export default UsersList;