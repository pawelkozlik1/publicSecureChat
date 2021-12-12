import React, { useEffect, useState} from 'react';
import TopicsApi from '../../../services/topics';
import { userState } from '../../../state/atoms';
import { showErrorToast } from '../../../utils/toasts';
import { Box, Collapse, List, ListItem, ListItemText} from '@material-ui/core';
import { CssTextField, textRegisteredStyles } from '../../../styling/fields';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import SeeTopics from './SeeTopics';
import { useRecoilState } from 'recoil';

const Default = () => {
    const classes = textRegisteredStyles();
    const [user] = useRecoilState(userState);
    const [topics, setTopics] = useState([]);
    const userId = user.id
    const [collapseId, setCollapseId] = React.useState(null);

    useEffect(() => {
        const allTopics = async () => {
            try {
                const fetchedTopics = await TopicsApi.getTopics();
                fetchedTopics.shift();
                setTopics(fetchedTopics);
            }
            catch (ex) {
                showErrorToast('Problem z pobieraniem tematow');
            }
        };
        allTopics();
    }, []);

    const handleClick = (topicId) => {
        setCollapseId(topicId)
    }

    const isCollapseOpen = (topicId) => topicId === collapseId;

    return (
        <Box className={classes.box}>
            <List>
                {topics.map(topic => (
                    <ListItem
                        Button
                        key={topic.topic_id}
                        onClick={ () => handleClick(topic.topic_id)}
                    >
                        <Box className={classes.text_editor}>
                            <ListItemText primary={topic.title} />
                            <div>
                                {isCollapseOpen(topic.topic_id)
                                    ? <ExpandLess />
                                    : <ExpandMore />
                                }
                            </div>
                            <Box>
                                <Collapse
                                    in={isCollapseOpen(topic.topic_id)}
                                    timeout='auto'
                                    unmountOnExit
                                >
                                    <SeeTopics
                                        topics={topics}
                                        topic={topic}
                                        setTopics={setTopics}
                                    />
                                </Collapse>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Default;
