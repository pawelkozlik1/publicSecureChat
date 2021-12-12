import React, {useEffect, useRef, useState} from 'react';
import {useRecoilState} from "recoil";
import {userState} from "../../../../state/atoms";
import CenteredBox from "../../../../components/CenteredBox";
import {makeStyles} from "@material-ui/core/styles";
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import {showInfoToast} from "../../../../utils/toasts";
import { CssTextField, textRegisteredStyles} from "../../../../styling/fields";
import {bgDarker, bgLighter, primaryColor, secondaryColor} from "../../../../styling/common";

// eslint-disable no-constant-condition

const useStyles = makeStyles((theme) => ({
    local_p: {
        fontSize: 30,
        color: primaryColor,
        fontFamily: "roboto",
    },
    entire_chat: {
        paddingTop: "auto",
        backgroundColor: bgDarker,
        flexDirection: "column",
        fontSize: 18,
        justifyContent: "flex-end",
        width: '50%',
        display: "flex",
        height: '90%',
    },
    input_form: {
        display: 'flex',
        flexDirection: "row",
    },
    single_message: {
        paddingLeft: '4px',
        paddingRight: '4px',
        marginBottom: '2px',
        marginRight: 'auto',
        marginLeft: '3px',
        borderRadius: '10px',
        backgroundColor: '#474850',
        // alignItems: "center",
        display: "flex",
        height: 'auto',
        flexDirection: 'column',
        maxWidth: '80%',
    },
    your_message: {
        paddingLeft: '4px',
        paddingRight: '4px',
        marginBottom: '2px',
        marginLeft: 'auto',
        marginRight: '3px',
        borderRadius: '10px',
        backgroundColor: secondaryColor,
        alignItems: "flex-end",
        display: "flex",
        height: 'auto',
        flexDirection: 'column',
        maxWidth: '80%',
    },
    big_div: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: bgLighter,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    input_div: {
        marginTop: '2px',
        display: 'flex',
        backgroundColor: bgDarker,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: '10px',
        paddingLeft: '10px',
        marginBottom: 50,
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
    },
    formik_padding: {
        paddingRight: 30,
        width: '75%',
    },
    button_styling: {
        marginLeft: 20,
        height: '120%',
        width: '15%',

    },
    author_div: {
        fontSize: 15,
        marginBottom: 2,
        color: "gray",
    },
}));

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);
    const [user] = useRecoilState(userState);
    const localClasses = useStyles();
    const classes = textRegisteredStyles();
    const handleOnMessage = (e) => {
        if (!ws.current) return;
        const message = JSON.parse(e.data);
        setMessages(prevState => prevState.concat(message));
    }

    useEffect(() => {
        ws.current = new WebSocket(`wss://localhost:5010/api/3/ws/${user.topic_id}`);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = handleOnMessage;

        return () => {
            ws.current.close();
        };
    }, []);

    const initialValues = {
        input: ''
    };

    const handleOnSubmit = async (values, { resetForm }) => {
        ws.current.send(JSON.stringify({message: values.input, author: user.username}));
        resetForm();
    };

    if (user.topic_id !== 1) {

        return(
            <div className={localClasses.big_div}>
                <div className={localClasses.entire_chat}>
                    {messages.map(message =>
                        <div key={message.message} className={`${message.author === user.username ? localClasses.your_message : localClasses.single_message}`}>
                            <div className={localClasses.author_div}>
                                {message.author}
                            </div>
                            <div>
                                {message.message}
                            </div>
                        </div>

                    )}
                </div>

                <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
                className={localClasses.input_form}
                >
                {({ values, submitForm, isSubmitting }) => (
                    <Form className={localClasses.input_div}>
                        <Field
                            component={CssTextField}
                            className={localClasses.formik_padding}
                            name='input'
                            type='text'
                            label='Wpisz wiadomość'
                            InputLabelProps={{ className: classes.text_editor_label }}
                            InputProps={{
                                className: classes.input_textfield,
                            }}
                        />
                        <div className={localClasses.button_styling}>
                            <Button
                                fullWidth
                                variant='contained'
                                className={classes.box_editor}
                                type="submit"
                            >
                            WYŚLIJ
                            </Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </div>
        );
    };
    return(
        <CenteredBox height={500}>
            <p className={localClasses.local_p}>
                NIE JESTEŚ PRZYPISANY DO TEMATU
            </p>
        </CenteredBox>
    )
};

export default Chat;