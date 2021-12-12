import React from 'react';
import { Box } from '@material-ui/core';

const CenteredBox = (
    {
        width,
        height,
        p = 1,
        bgcolor,
        children,
    },
) => (
    <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        p={p}
        bgcolor={bgcolor}
        width={width}
        height={height}
    >
        {children}
    </Box>
);

export default CenteredBox;
