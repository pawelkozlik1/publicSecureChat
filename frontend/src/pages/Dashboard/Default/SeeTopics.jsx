import React, { useState, useEffect } from 'react';
import { Button, Collapse, LinearProgress, makeStyles } from '@material-ui/core';
import { showErrorToast, showInfoToast } from '../../../utils/toasts';
import { Form, Formik } from 'formik';
import { userState } from '../../../state/atoms';
import UsersAPI from '../../../services/users';
import {lightTextColor, primaryColor, secondaryColor} from '../../../styling/common';
import {useRecoilState} from "recoil";

const useStyles = makeStyles((theme) => ({
  local_div: {
    margin: theme.spacing(0, 2, 3),
    color: lightTextColor,
    fontWeight: 'light',
    display: 'flex',
    fleDirection: 'row',
  },
  mini_div: {
    margin: theme.spacing(0, 1, 0),
  },
  local_button: {
    margin: theme.spacing(0, 2, 3),
    backgroundColor: primaryColor,
    '&:hover': {
        backgroundColor: secondaryColor,
    },
  },
}));
const SeeTopics = ({ topics, topic, setTopics }) => {
  const localClasses = useStyles();
  const [open] = useState(false);
  const initialValues = topic;
  const [author, setAuthor] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const allAuthors = async () => {
        try {
            const fetchedAuthor = await UsersAPI.getUser(topic.user_id)
            setAuthor(fetchedAuthor);
            const fetchedAssigned = await UsersAPI.getUsersByTitleId(topic.topic_id)
            setUsers(fetchedAssigned);
        }
        catch (ex) {
            showErrorToast('Problem z pobieraniem autora');
        }
    };
    allAuthors();
}, []);

  const handleOnSubmit = async() => {
    if (users.length < topic.participants) {
        try {
            const editRequestBody = {
                username: user.username,
                id: user.id,
                role_id: user.role_id,
                topic_id: topic.topic_id,
            };
            await UsersAPI.editUserTopic(user.username, editRequestBody);
            setUsers(prevState => prevState.concat(editRequestBody));
            setUser(prevState => ( {...prevState, topic_id: topic.topic_id} ))
            showInfoToast('Pomyślnie wpisany do tematu');
        }
        catch (ex) {
            showErrorToast(ex.message)
        }

    } else {
        showInfoToast('Brak miejsca w grupie');
    }
  };

  return (
    <Collapse in={!open} timeout='auto' unmountOnExit>
      <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form float = 'left'>
            <div className={localClasses.local_div}> 
              <div>
                Autor:
              </div>
              <div className={localClasses.mini_div}>
                {author.username}
              </div>
            </div>
            <div className={localClasses.local_div}>
              <div>
                Opis:
              </div>
              <div className={localClasses.mini_div}>
                {topic.description}
              </div>
            </div>
            <div className={localClasses.local_div}>
              <div>
                  Ilość zapisanych osób:
              </div>
              <div className={localClasses.mini_div}>
                  {users.length} / {topic.participants}
              </div>
              </div>
            <Button
                onClick={submitForm}
                className={localClasses.local_button}
            >
                Dolacz do tematu
            </Button>
          </Form>
        )}
      </Formik>
    </Collapse>
  );
};

export default SeeTopics;