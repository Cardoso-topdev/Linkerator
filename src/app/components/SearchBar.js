import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles  } from '@material-ui/core/styles';
import { Typography, Grid, Paper, TextField, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { linkActions } from '../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(7),
        '& .sub-header' : {
            textAlign: 'center',
            padding: theme.spacing(2)
        }
    },
    search: {
        paddingLeft: '.8rem',
        paddingRight: '.8rem',
        paddingTop: '.65rem',
        paddingBottom: '.65rem',
        display: 'flex',
        '& .input-wrapper' : {
            borderRadius: "0.5rem",
            width: '100%',
            color: 'rgba(0, 0, 0, 0.97)',
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            backgroundColor: '#FFFFFF',
            position: 'relative',
        },
        '& .type' : {
            width: '100px'
        }
    }
}));

const SearhBar = () => {
    //classes offert to the component
    const classes = useStyles();
    //search keys set as states by useState
    const [searchKey, setSearchKey] = useState('');
    const [searchType, setSearchType] = useState(0);

    const dispatch = useDispatch();

    //callback to change the search type
    const onChangeType = useCallback(
        (e) => {
            setSearchType(e.target.value)
        },
        [searchType],
    );
    //callback to change the search key 
    const onChangeKey = useCallback(
        (e) => {
            setSearchKey(e.target.value)
        },
        [searchKey],
    );

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const data = searchType ? { tag: searchKey } : { url: searchKey } ;
        //when search triggers, it dispatches the action to fetch the links.
        dispatch(linkActions.getLinks(data));
    }, [searchType, searchKey]);

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12} md={12}>
                    <Typography variant="h6" component="p" className="sub-header">
                        Enter a Search Term
                    </Typography>
                </Grid>
                <Grid item md={3} sm={2}>
                </Grid>
                <Grid item md={6} sm={8}>
                    <form onSubmit={handleSubmit} className={classes.search}>
                        <Paper className="input-wrapper" elevation={1}>
                            <TextField 
                                autoFocus={false}
                                name="search"
                                className="flex-1 w-100"
                                InputProps={{
                                    disableUnderline: true,
                                    classes : {
                                        root : "flex flex-grow flex-no-shrink ml-12 mr-28 my-8 text-12",
                                        input: ""
                                    },
                                    placeholder     : "Search the links"
                                }}
                                InputLabelProps={{
                                    shrink   : false,
                                    className: classes.bootstrapFormLabel
                                }}
                                value={searchKey}
                                onChange={onChangeKey}
                            />
                        </Paper>
                    </form>
                </Grid>
                <Grid item md={3} sm={2} className={classes.search}>
                    <Paper className="input-wrapper type" elevation={1}>
                        <Select
                            className="flex-1 w-100"
                            disableUnderline 
                            inputProps={{
                                classes : {
                                    root : "flex flex-grow flex-no-shrink ml-12 mr-28 my-8 text-9 pt-15",
                                    input: ""
                                }
                            }}
                            value={searchType}
                            onChange={onChangeType}
                        >
                            <MenuItem value={0}>Link</MenuItem>
                            <MenuItem value={1}>Tag</MenuItem>
                        </Select>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearhBar;