import React, { useEffect, useState } from 'react';
import TopicsApi from '../../../../services/topics';
import { useRecoilState } from 'recoil';
import { showErrorToast, showInfoToast } from '../../../../utils/toasts';
import { Formik, Form, Field } from 'formik';
import { CssTextField, textRegisteredStyles } from '../../../../styling/fields';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, makeStyles, LinearProgress } from '@material-ui/core';
import { primaryColor, secondaryColor } from '../../../../styling/common';
import { userState } from '../../../../state/atoms';
import CenteredBox from '../../../../components/CenteredBox';
import UsersAPI from "../../../../services/users";

const useStyles = makeStyles((theme) => ({
    local_button: {
        margin: theme.spacing(0, 2, 3),
        backgroundColor: primaryColor,
        '&:hover': {
            backgroundColor: secondaryColor,
        },
    },
    local_icon: {
        fontSize: 'xxx-large',
    },
}));

const Edit = () => {
    // const initialValues = config;
    const classes = textRegisteredStyles();
    const [user] = useRecoilState(userState);
    const [configs, setConfigs] = useState({});
    const userId = user.id;
    const localClasses = useStyles();

    useEffect(() => {
        const userConfigs = async () => {
            try {
                const fetchedConfig = await TopicsApi.getTopicByUserId(userId);
                setConfigs(fetchedConfig);
            }
            catch (ex) {
                showErrorToast('Error przy pobieraniu tematu');
            }
        };
        userConfigs();
    }, []);

    const initialValues = {
        title: '',
        description: '',
        participants: 4,
    };

    const handleOnSubmit = async (values) => {
        try {
 
            const updatedValues = { ...configs[0], ...values }
            await TopicsApi.editTopic(updatedValues);
            showInfoToast('Udalo sie zedytowac temat');
        } catch (ex) {
            showErrorToast(ex.message);
        }
    };

    const handleOnClickDelete = async() => {
        try {
            const usersWithTopic = await UsersAPI.getUsersByTitleId((configs[0].topic_id))
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const fetchedUser in usersWithTopic) {
                const editRequestBody = {
                    username: usersWithTopic[fetchedUser].username,
                    id: usersWithTopic[fetchedUser].id,
                    role_id: usersWithTopic[fetchedUser].role_id,
                    topic_id: 1,
                };
                // eslint-disable-next-line no-await-in-loop
                await UsersAPI.editUserTopic(usersWithTopic[fetchedUser].id, editRequestBody);
            };
            await TopicsApi.deleteTopicById(configs[0].topic_id);
            showInfoToast('Usunieto temat')
        } catch (ex) {
            showErrorToast(ex.message);
        }
    };

    return (
        <CenteredBox
        width={1}
        height={1}
    >
        <h1 className={classes.header_editor}>Edycja tematu</h1>
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
                        onClick={submitForm}
                        className={classes.box_editor}
                    >
                        Zatwierdź
                    </Button>
                    <DeleteIcon className={ localClasses.local_icon} onClick={handleOnClickDelete} />
                </Form>
            )}
        </Formik>
        
    </CenteredBox>
    )
}

export default Edit;