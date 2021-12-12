import React from 'react';
import {Box, Collapse, List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import EditItemList from './EditItemList';
import {primaryColor, secondaryColor} from '../../../../styling/common';

const useStyles = makeStyles((theme) => ({
    form_box: {
        margin: theme.spacing(0, 3, 0),
        color: primaryColor,
        '&:hover': {
            color: secondaryColor,
            cursor: 'pointer',
        },
    },
}));

const EditList = ({topics, setTopics}) => {
    const [collapseId, setCollapseId] = React.useState(null);

    const localClasses = useStyles();

    const handleClick = (topicId) => {
        setCollapseId(topicId);
    };

    const isCollapseOpen = (topicId) => topicId === collapseId;

    return (
        <List>
            {topics.map(topic => (
                <ListItem
                    button
                    disableRipple
                    key={topic.topic_id}
                    onClick={() => handleClick(topic.topic_id)}
                >
                    <Box className={localClasses.form_box}>
                        <ListItemText primary={topic.title}/>
                        <div>
                            {isCollapseOpen(topic.topic_id)
                                ? <ExpandLess/>
                                : <ExpandMore/>
                            }
                        </div>
                        <Box>
                            <Collapse
                                in={isCollapseOpen(topic.topic_id)}
                                timeout='auto'
                                unmountOnExit
                            >
                                <EditItemList
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

    );

};

export default EditList;