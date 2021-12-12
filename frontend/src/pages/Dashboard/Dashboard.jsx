import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Collapse,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import GroupsIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Default from './Default/Default';
import Add from './Manage/Add/Add';
import Edit from './Manage/Edit/Edit';
import Chat from './Manage/Chat/Chat';
import { bgDarker, bgLighter, lightTextColor, primaryColor } from '../../styling/common';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Group from './Manage/Group/Group';
import AdminConfigs from './Manage/AdminPanel/AdminConfigs';
import AdminUsers from "./Manage/AdminPanel/AdminUsers";
import UsersAPI from '../../services/users';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/atoms';
import EditCollapse from "./Manage/Edit/EditCollapse";

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

const Dashboard = () => {
    const [user, setUser] = useRecoilState(userState);
    const [open, setOpen] = React.useState(true);
    const { path } = useRouteMatch();
    const classes = useStyles();
    const [openAdminPanel, setOpenAdminPanel] = React.useState(false);
    // eslint-disable-next-line camelcase
    const {role_id} = user;

    const handleClick = () => {
        setOpen(!open);
    };

    const handleAdminClick = () => {
        // eslint-disable-next-line camelcase
        if (role_id === 1) {
            setOpenAdminPanel(!openAdminPanel);
        }
    };

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor='left'
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <Link
                        to='/dashboard'
                        style={{ textDecoration: 'none' }}
                        key='Dostępne tematy'
                    >
                        <ListItem
                            button
                            disableRipple
                            className={classes.box}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                flexDirection='row'
                            >
                                <ListItemIcon className={classes.icon}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary='Dostępne tematy' className={classes.links} />
                            </Box>
                        </ListItem>
                    </Link>
                    {user.role_id >= 1 && (<>
                    <ListItem
                        button
                        disableRipple
                        className={classes.box}
                        onClick={handleClick}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='row'
                        >
                            <ListItemIcon className={classes.icon}>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Zarządzaj tematem' className={classes.links} />
                            <div>
                                {open
                                    ? <ExpandLess />
                                    : <ExpandMore />
                                }
                            </div>
                        </Box>
                    </ListItem>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <Link
                                to='/dashboard/manage/add'
                                style={{ textDecoration: 'none' }}
                                key='Dodaj'
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
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Dodaj' className={classes.links} />
                                    </Box>
                                </ListItem>
                            </Link>


                            <Link
                                to='/dashboard/manage/edit'
                                style={{ textDecoration: 'none' }}
                                key='Edytuj'
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
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Edytuj' className={classes.links} />
                                    </Box>
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>  </>)}
                    <Link
                        to='/dashboard/chat'
                        style={{ textDecoration: 'none' }}
                        key='Chat room'
                    >
                        <ListItem
                            button
                            disableRipple
                            className={classes.box}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                flexDirection='row'
                            >
                                <ListItemIcon className={classes.icon}>
                                    <ChatIcon />
                                </ListItemIcon>
                                <ListItemText primary='Chat room' className={classes.links} />
                            </Box>
                        </ListItem>
                    </Link>


                    <Link
                        to='/dashboard/group'
                        style={{ textDecoration: 'none' }}
                        key='Grupa'
                    >
                        <ListItem
                            button
                            disableRipple
                            className={classes.box}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                flexDirection='row'
                            >
                                <ListItemIcon className={classes.icon}>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary='Grupa' className={classes.links} />
                            </Box>
                        </ListItem>
                    </Link>
                    {user.role_id === 1 && (<>
                    <ListItem
                        button
                        disableRipple
                        className={classes.box}
                        onClick={handleAdminClick}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='row'
                        >
                            <ListItemIcon className={classes.icon}>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary='Panel administratora' className={classes.links} />
                            <div>
                                {openAdminPanel
                                    ? <ExpandLess/>
                                    : <ExpandMore/>
                                }
                            </div>
                        </Box>
                    </ListItem>
                    <EditCollapse checkPath='admin' open={openAdminPanel}/> </>)}
                    <ListItem
                        button
                        disableRipple
                        className={classes.box}
                        onClick={async () => {
                            await UsersAPI.logoutUser();
                            setUser({
                                id: null,
                                username: null,
                                roleId: null,
                            });
                        }}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='row'
                        >
                            <ListItemIcon className={classes.icon}>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary='Wyloguj się' className={classes.links} />
                        </Box>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.main}>
                <Switch>
                    <Route path={path} exact>
                        <Default />
                    </Route>
                    <Route path={`${path}/manage/add`} exact>
                        <Add />
                    </Route>
                    <Route path={`${path}/manage/edit`} exact>
                        <Edit />
                    </Route>
                    <Route path={`${path}/chat`} exact>
                        <Chat />
                    </Route>
                    <Route path={`${path}/group`} exact>
                        <Group />
                    </Route>
                    <Route path={`${path}/admin/configs`} exact>
                        <AdminConfigs/>
                    </Route>
                    <Route path={`${path}/admin/users`} exact>
                        <AdminUsers/>
                    </Route>
                </Switch>
            </main>
        </div>
    );
};

export default Dashboard;
