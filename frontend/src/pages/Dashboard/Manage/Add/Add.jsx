import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, LinearProgress } from '@material-ui/core';
import { CssTextField, textRegisteredStyles } from '../../../../styling/fields';
import CenteredBox from '../../../../components/CenteredBox';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../state/atoms';
import TopicsApi from '../../../../services/topics';
import { showErrorToast, showInfoToast } from '../../../../utils/toasts';
import UsersAPI from "../../../../services/users";


const Add = () => {
    const [user] = useRecoilState(userState);
    const initialValues = {
        title: '',
        description: '',
        participants: 4,
    };

    const classes = textRegisteredStyles();

    const handleOnSubmit = async ({ title, description, participants }, { setSubmitting }) => {
        const addRequestBody = {
            user_id: user.id,
            title,
            description,
            participants,
        };

        try {
            const fetchedTopics = await TopicsApi.getTopicByUserId(user.id);
            if (fetchedTopics.length === 0) {
                try {
                    await TopicsApi.addTopic(addRequestBody);
                    showInfoToast('Utworzono nowy temat');
                    const newFetchedTopics = await TopicsApi.getTopicByUserId(user.id);
                    try {
                        const editRequestBody = {
                            username: user.username,
                            id: user.id,
                            role_id: user.role_id,
                            topic_id: newFetchedTopics[0].topic_id,
                            };
                        await UsersAPI.editUserTopic(user.username, editRequestBody);
                    }
                    catch (ex) {
                        showErrorToast(ex.message);
                    }
                } 
                catch (ex) {
                    showErrorToast(ex.message);
                }
            } else {
                showInfoToast('Masz juz istniejacy temat')
            }
        }
        catch (ex) {
            showErrorToast(ex.message);
        }
        setSubmitting(false);
    };

    return (
        <CenteredBox
            width={1}
            height={1}
        >
            <h1 className={classes.header_editor}>Dodawanie nowego tematu</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
            >
                {({ values, setValues, submitForm, isSubmitting }) => (
                    <Form className={classes.form_editor}>
                        <Field
                            component={CssTextField}
                            InputProps={{
                                className: classes.input_textfield,
                            }}
                            className={classes.textfield_editor}
                            name='title'
                            type='text'
                            label='Tytuł'
                            InputLabelProps={{ className: classes.text_editor_label }}
                        />
                        <Field
                            component={CssTextField}
                            InputProps={{
                                className: classes.input_textfield,
                            }}
                            className={classes.textfield_editor}
                            name='description'
                            type='text'
                            label='Opis'
                            InputLabelProps={{ className: classes.text_editor_label }}
                        />
                        <Field
                            component={CssTextField}

                            InputProps={{
                                className: classes.input_textfield,
                            }}
                            className={classes.textfield_editor}
                            name='participants'
                            type='text'
                            label='Max ilosc uczestnikow (domyślnie 4)'
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
                            Zatwierdź
                        </Button>
                    </Form>
                )}
            </Formik>
        </CenteredBox>
    );
};

export default Add;
