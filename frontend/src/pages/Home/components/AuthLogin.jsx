import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import UsersAPI from '../../../services/users';
import { CssTextField, textRegisteredStyles } from '../../../styling/fields';
import { showErrorToast, showInfoToast } from '../../../utils/toasts';
import { useRecoilState } from 'recoil';
import { userState } from '../../../state/atoms';
import { useHistory } from 'react-router-dom';


const AuthLogin = ({ setIsRegistering }) => {
    const [, setUser] = useRecoilState(userState);
    const history = useHistory();

    const initialValues = {
        username: '',
        password: '',
    };

    const classes = textRegisteredStyles();

    const onSubmit = async ({ username, password }, { setSubmitting }) => {
        try {
            const loggedUser = await UsersAPI.loginUser(username, password);

            showInfoToast('Zalogowano');
            setUser(loggedUser);

            history.push('/dashboard');
        } catch (ex) {
            showErrorToast(ex.message);
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ submitForm, isSubmitting }) => (
                <Form className={classes.form_editor}>
                    <h1 className={classes.header_editor}>Logowanie</h1>
                    <Field
                        component={CssTextField}
                        InputProps={{
                            className: classes.input_textfield,
                        }}
                        className={classes.textfield_editor}
                        name='username'
                        type='username'
                        label='Nazwa użytkownika'
                        InputLabelProps={{ className: classes.text_editor_label }}
                    />
                    <Field
                        component={CssTextField}
                        InputProps={{
                            className: classes.input_textfield,
                        }}
                        className={classes.textfield_editor}
                        name='password'
                        type='password'
                        label='Hasło'
                        InputLabelProps={{ className: classes.text_editor_label }}
                    />
                    {isSubmitting && <LinearProgress />}
                    <Button
                        fullWidth
                        variant='contained'
                        disabled={isSubmitting}
                        onClick={submitForm}
                        className={classes.box_editor}
                    >
                        Zaloguj się
                    </Button>
                    <div className={classes.margin_bottom_editor}>
                        <span className={classes.text_editor_label}> Nie masz konta? </span>
                        <span
                            onClick={() => setIsRegistering(true)}
                            className={classes.text_editor}
                        >
                        Zarejestruj się.
                        </span>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AuthLogin;
