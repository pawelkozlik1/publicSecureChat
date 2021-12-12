import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import UsersAPI from '../../../services/users';
import { CssTextField, textRegisteredStyles } from '../../../styling/fields';
import { showErrorToast, showInfoToast } from '../../../utils/toasts';
import { useRecoilState } from 'recoil';
import { userState } from '../../../state/atoms';
import { useHistory } from 'react-router-dom';

const AuthRegister = ({ setIsRegistering }) => {
    const [, setUser] = useRecoilState(userState);
    const history = useHistory();

    const classes = textRegisteredStyles();
    const initialValues = {
        username: '',
        password: '',
        repeatPassword: '',
    };


    const onSubmit = async ({ username, password, repeatPassword }, { setSubmitting }) => {
        if (username === '') {
            showErrorToast('Brak nazwy uzytkownika');
            return;
        }
        if (password === '') {
            showErrorToast('Haslo nie moze byc puste');
            return;
        }
        if (password.length < 3) {
            showErrorToast('Haslo musi miec wiecej niz 2 znaki')
            return;
        }
        if (password !== repeatPassword) {
            showErrorToast('Hasła się nie zgadzają');
            return;
        }

        try {
            const createdUser = await UsersAPI.createUser(username, password);

            setUser(createdUser);
            showInfoToast('Konto utworzone');

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
                    <h1 className={classes.header_editor}>Rejestracja</h1>
                    <Field
                        component={CssTextField}
                        InputProps={{
                            className: classes.input_textfield,
                        }}
                        className={classes.textfield_editor}
                        name='username'
                        type='text'
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
                    <Field
                        component={CssTextField}
                        InputProps={{
                            className: classes.input_textfield,
                        }}
                        className={classes.textfield_editor}
                        name='repeatPassword'
                        type='password'
                        label='Powtórz hasło'
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
                        Zarejestruj się
                    </Button>
                    <div className={classes.margin_bottom_editor}>
                        <span className={classes.text_editor_label}> Masz konto? </span>
                        <span
                            onClick={() => setIsRegistering(false)}
                            className={classes.text_editor}
                        >
                        Zaloguj się.
                        </span>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AuthRegister;
