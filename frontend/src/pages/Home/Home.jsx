import React from 'react';
import { Box, Button } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import AuthController from './components/AuthController';
import CenteredBox from '../../components/CenteredBox';
import { makeStyles } from '@material-ui/core/styles';
import { bgDarker } from '../../styling/common';

const discordButtonStyles = makeStyles(() => ({
    discord: {
        backgroundColor: '#7289da',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#8ea1e1',
        },
    },
}));

const Home = () => {
    const classes = discordButtonStyles();

    const loginDiscord = () => {
        window.location.href = 'https://localhost:5000/api/1/oauth_login';
    };

    return (
        <Box
            width='100%'
            height='100%'
            display='flex'
            justifyContent='center'
        >
            <CenteredBox
                bgcolor={bgDarker}
                flexGrow='1'
                width='100%'
            >
                <AuthController />
                <Box
                    width={250}
                    margin_top={50}
                >
                    <Button
                        fullWidth
                        className={classes.discord}
                        onClick={loginDiscord}
                    >
                        Zaloguj się Discordem
                    </Button>
                </Box>
            </CenteredBox>
        </Box>
    );
};

export default Home;
