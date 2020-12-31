import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles  } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import EditModal from './modals/EditModal';
import { EnhancedTable } from '../components';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(2)
    }
}));

const ResultBoard = () => {
    const classes = useStyles();
    //create the open flag state and setState function to control the edit modal
    const [open, setOpen] = React.useState(false);
    //create the flag which decides the modal type of Add or update modal.
    const [isAdd, setIsAdd] = React.useState({isAdd: true});

    //get the current link lists from the store
    const { links } = useSelector(state => state.links);

    //callback to change the on and off state of the modal
    const handleClickOpen = () => {
        setIsAdd({isAdd: true});
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleClickOpen}
                >
                    Add Link
                </Button>
                <Grid item sm={12} md={12}>
                    <EnhancedTable setOpen={setOpen} setIsAdd={setIsAdd}/>
                </Grid>
            </Grid>
            {
                open &&
                <EditModal linkState={links} open={open} setOpen={setOpen} isAdd={isAdd}/>
            }
        </div>
    )
}

export default ResultBoard;