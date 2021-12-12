import React, {useState} from 'react';
import {Form, Formik} from 'formik';
import {Button, Collapse, LinearProgress, makeStyles} from '@material-ui/core';
import {showErrorToast, showInfoToast} from '../../../../utils/toasts';
import StyledField from '../../../../components/StyledField';
import {primaryColor, secondaryColor} from '../../../../styling/common';
import DeleteIcon from '@material-ui/icons/Delete';
import TopicsApi from "../../../../services/topics";
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
        fontSize: 'xx-large',
    },
}));

const EditItemList = ({topics, topic, setTopics}) => {
    const [open] = useState(false);
    const initialValues = topic;

    const localClasses = useStyles();

    const handleOnSubmit = async (values) => {
        try {
            await TopicsApi.editTopic(values);
            setTopics(
                topics
                    .map(c => c.topic_id === topic.topic_id
                        ? {...c, ...values}
                        : c,
                    ),
            );
            showInfoToast('Poprawnie zedytowano temat.');
        } catch (ex) {
            showErrorToast(ex.message);
        }
    };

    const handleOnClickDelete = async () => {
        try {
            const usersWithTopic = await UsersAPI.getUsersByTitleId(topic.topic_id)
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
            await TopicsApi.deleteTopicById(topic.topic_id);
            setTopics(topics.filter(c => c.topic_id !== topic.topic_id));
            showInfoToast('Usunięto temat.')
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
                        <StyledField name='title' label='Tytuł'/>
                        <StyledField name='description' label='Opis'/>
                        <StyledField name='participants' label='Max ilość uczestników'/>
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

export default EditItemList;