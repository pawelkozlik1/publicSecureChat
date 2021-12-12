import React, {useEffect, useState} from 'react';
import EditList from './EditList';
import {showErrorToast} from '../../../../utils/toasts';
import {Form, Formik, Field} from 'formik';
import {CssTextField, textRegisteredStyles} from '../../../../styling/fields';
import {Search} from '@material-ui/icons';
import {Box} from '@material-ui/core';
import TopicsApi from "../../../../services/topics";


const AdminConfigs = () => {
    const classes = textRegisteredStyles();
    const [filterValue, setFilterValue] = useState('');
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const fetchedTopics = await TopicsApi.getTopics();
                const sorted = fetchedTopics.sort((a, b) => (a.topic_id > b.topic_id) ? 1 : -1);
                setTopics(fetchedTopics);
            } catch (ex) {
                showErrorToast('Problem z pobraniem tematów');
            }
        };
        fetchTopics();
    }, []);

    const handleFilter = (e) => {
        setFilterValue(e.currentTarget.value);
        setFilteredTopics(
            topics
                .filter(c =>
                    c
                        .title
                        .toLowerCase()
                        .startsWith(filterValue.toLowerCase()),
                ),
        );
    };

    return (
        <box className={classes.box_spacing}>
            <Formik initialValues={{filter: ''}} onSubmit={handleFilter}>
                <Form>
                    <Box>
                        <Search className={classes.icon_editor}/>
                        <Field
                            component={CssTextField}
                            InputProps={{className: classes.input_textfield}}
                            className={classes.search_editor}
                            name='filter'
                            type='text'
                            InputLabelProps={{className: classes.text_editor_label}}
                            value={filterValue}
                            onChange={handleFilter}
                            placeholder='Filter...'
                        />
                    </Box>
                </Form>
            </Formik>
            <EditList
                topics={filterValue.length ? filteredTopics : topics}
                setTopics={setTopics}
            />
        </box>
    );
};

export default AdminConfigs;
