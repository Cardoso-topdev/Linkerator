import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

/**
 * define the useStyles
 */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
        '& .header' : {
            marginTop: theme.spacing(8)
        }
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className="header">
                <Typography variant="h2" component="p">
                    The Andrew Linkerator
                </Typography>
                <Typography variant="h5" component="p">
                    POWERFUL option for indexing URLs
                </Typography>
            </div>
        </div>
    )
}

export default Header;