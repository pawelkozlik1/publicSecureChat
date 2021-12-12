import React, {useEffect, useState} from 'react';
import UsersAPI from "../../../../services/users";
import TopicsApi from "../../../../services/topics";
import {showErrorToast, showInfoToast} from "../../../../utils/toasts";
import {textRegisteredStyles} from "../../../../styling/fields";
import {userState} from "../../../../state/atoms";
import {useRecoilState} from 'recoil';
import CenteredBox from "../../../../components/CenteredBox";
import {makeStyles} from "@material-ui/core/styles";
import {lightTextColor, primaryColor, secondaryColor} from "../../../../styling/common";
import {Box, ListItem, List, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    local_p: {
        fontSize: 30,
        color: primaryColor,
        fontFamily: "roboto",
    },
    local_box: {
        margin: theme.spacing(15, 20, 0),
        fontSize: 30,
        fontFamily: "roboto",
        width: '30%',
    },
    local_box_2: {
        margin: theme.spacing(40, 20, 0),
        fontSize: 30,
        fontFamily: "roboto",
        width: '30%',
    },
    local_box_3: {
        margin: theme.spacing(0, 180, 3),
        fontSize: 30,
        fontFamily: "roboto",

    },
    local_box_4: {
        margin: theme.spacing(0, 20, 0),
        fontSize: 30,
        fontFamily: "roboto",
    },
    smaller_box: {
        margin: theme.spacing(6, 0, 0),
        color: '#BCBAC0',

    },
    smaller_box_2: {
        fontSize: 25,
        marginLeft: 5,
        color: '#BCBAC0',
        flexDirection: "row",
        display: "flex",
    },
    big_box: {
        flexDirection: "row",
        margin: theme.spacing(0, 0, 0),
    },
    local_button: {
        margin: theme.spacing(0, 180, 3),
        fontSize: 30,
        fontFamily: "roboto",
        width: '50%',
    },
    box_editor: {
        backgroundColor: primaryColor,
        fontSize: 14,
        color: '#BCBAC0',
        '&:hover': {
            backgroundColor: secondaryColor,
        },
    },
    list_local: {
        flexDirection: "row",
        display: "flex",
    },
}));
const Group = () => {
    const [user, setUser] = useRecoilState(userState);
    const localClasses = useStyles();

    const classes = textRegisteredStyles();
    const [topic, setTopic] = useState([]);
    const [part, setPart] = useState([]);
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const theTopic = async () => {
            try {
                const fetchedTopic = await TopicsApi.getTopicById(user.topic_id)
                setTopic(fetchedTopic);
                const userList = await UsersAPI.getUsersByTitleId(user.topic_id)
                setPart(userList);
                const fetchedUser = await UsersAPI.getUser(fetchedTopic.user_id)
                setAuthor(fetchedUser);
            } catch (ex) {
                showErrorToast('Problem przy pobieraniu tematu')
            }
        };
        theTopic();
    }, []);

    const handleOnClickDelete = async () => {
        try {
            const editRequestBody = {
                username: user.username,
                id: user.id,
                role_id: user.role_id,
                topic_id: 1,
            };
            await UsersAPI.editUserTopic(user.username, editRequestBody)
            setUser(prevState => ( {...prevState, topic_id: 1} ))
        } catch (ex) {
            showErrorToast('Problem przy usuwania z grupy')
        }
    };

    const listPart = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const elem in part) {
        listPart.push(part[elem].username)
    };

    return (
        <>
            {user.topic_id !== 1 ? (
                <Box className={localClasses.big_box}>
                    <Box className={localClasses.local_box}>
                        <Box className={localClasses.smaller_box}>
                            Tytuł:
                        </Box>
                        <Box className={localClasses.smaller_box}>
                            {topic.title}
                        </Box>
                        <Box className={localClasses.local_box_3}>
                            <Box className={localClasses.smaller_box}>
                                Członkowie:
                            </Box>
                            <List>
                                {listPart.map(onePart => (
                                    <Box className={localClasses.smaller_box_2}>
                                        {onePart}
                                    </Box>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    <Box className={localClasses.local_box_4}>
                        <Box className={localClasses.smaller_box}>
                            Opis tematu:
                        </Box>
                        <Box className={localClasses.smaller_box}>
                            {topic.description}
                        </Box>
                    </Box>
                    <Box className={localClasses.local_box_2}>
                        <Box className={localClasses.smaller_box}>
                            Prowadzący:
                        </Box>
                        <Box className={localClasses.smaller_box}>
                            {author.username}
                        </Box>
                        <Box className={localClasses.local_button}>
                            <Button
                                variant='contained'
                                className={localClasses.box_editor}
                                onClick={handleOnClickDelete}
                            >
                                Wyjdź z grupy
                            </Button>
                        </Box>

                    </Box>
                </Box>
            ) : (
                <CenteredBox height={500}>
                    <p className={localClasses.local_p}>
                        NIE JESTEŚ PRZYPISANY DO TEMATU
                    </p>
                </CenteredBox>
            )}
        </>
    );
};

export default Group;
