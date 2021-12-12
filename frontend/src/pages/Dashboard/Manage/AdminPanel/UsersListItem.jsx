import React from 'react';
import {Form, Formik} from 'formik';
import {Button, Collapse, LinearProgress, makeStyles} from '@material-ui/core';
import UsersAPI from '../../../../services/users';
import {showErrorToast, showInfoToast} from '../../../../utils/toasts';
import StyledField from '../../../../components/StyledField';
import {primaryColor, secondaryColor} from '../../../../styling/common';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    local_button: {
        margin: theme.spacing(0, 2, 3),
        backgroundColor: primaryColor,
        '&:hover': {
            backgroundColor: secondaryColor,
        },
    },
    local_icon: {
        fontSize: 'xx-large',
    },
}));

const UsersListItem = ({users, user, setUsers}) => {
    const open = false;
    const initialValues = user;

    const localClasses = useStyles();

    const handleOnSubmit = async (values) => {
        try {
            await UsersAPI.updateUserRole(values);
            setUsers(
                users
                    .map(c => c.id === user.id
                        ? {...c, ...values}
                        : c,
                    ),
            );
            showInfoToast('Poprawnie zedytowano dane użytkownika.');
        } catch (ex) {
            showErrorToast(ex.message);
        }
    };

    const handleOnClickDelete = async () => {
        try {
            await UsersAPI.deleteUser(user.id);
            setUsers(users.filter(c => c.id !== user.id));
            showInfoToast('Usunięto użytkownika.')
        } catch (ex) {
            showErrorToast(ex.message);
        }
    };

    return (
        <Collapse in={!open} timeout='auto' unmountOnExit>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <StyledField name='username' label='Nazwa użytkownika'/>
                        <StyledField name='id' label='Id użytkownika'/>
                        <StyledField name='role_id' label='Rola użytkownika'/>
                        {isSubmitting && <LinearProgress/>}
                        <Button
                            onClick={submitForm}
                            className={localClasses.local_button}
                        >
                            Zapisz zmiany
                        </Button>
                        <DeleteIcon className={localClasses.local_icon} onClick={handleOnClickDelete}/>
                    </Form>
                )}
            </Formik>
        </Collapse>
    );
};

export default UsersListItem;