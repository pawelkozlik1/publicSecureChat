import React, {useEffect, useState} from 'react';
import UsersAPI from '../../../../services/users';
import UsersList from './UsersList';
import {showErrorToast} from '../../../../utils/toasts';
import {Form, Formik, Field} from 'formik';
import {CssTextField, textRegisteredStyles} from '../../../../styling/fields';
import {Search} from '@material-ui/icons';
import {Box} from '@material-ui/core';


const AdminUsers = () => {
    const classes = textRegisteredStyles();
    const [filterValue, setFilterValue] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const userUsers = async () => {
            try {
                const fetchedUsers = await UsersAPI.getUsers();
                const sorted = fetchedUsers.sort((a, b) => (a.id > b.id) ? 1 : -1);
                 setUsers(fetchedUsers);
            } catch (ex) {
                showErrorToast('Problem z pobraniem użytkowników');
            }
        };
        userUsers();
    }, []);

    const handleFilter = (e) => {
        setFilterValue(e.currentTarget.value);
        setFilteredUsers(
            users
                .filter(c =>
                    c
                        .username
                        .toLowerCase()
                        .startsWith(filterValue.toLowerCase()),
                ),
        );
    };

    return (
        <box className={classes.box_spacing}>
            <Formik initialValues={{filter: ''}} onSubmit={handleFilter}>
                <Form>
                    <Box>
                        <Search className={classes.icon_editor}/>
                        <Field
                            component={CssTextField}
                            InputProps={{className: classes.input_textfield}}
                            className={classes.search_editor}
                            name='filter'
                            type='text'
                            InputLabelProps={{className: classes.text_editor_label}}
                            value={filterValue}
                            onChange={handleFilter}
                            placeholder='Filter...'
                        />
                    </Box>
                </Form>
            </Formik>
            <UsersList
                users={filterValue.length ? filteredUsers : users}
                setUsers={setUsers}
            />
        </box>
    );
};

export default AdminUsers;
