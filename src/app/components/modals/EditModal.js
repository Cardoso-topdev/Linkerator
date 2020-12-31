import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl
} from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import { linkActions } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .content-wrapper' : {
            minHeight: '400px',
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '70%'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 200,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

/**
 * 
 * @param {*} param0 
 */
const EditModal = ({open, setOpen, isAdd: flag, linkState}) => {
    /**
     * isAdd is a boolean that decides whether this modal is for update and add
     * if isAdd is boolean, it is an add modal
     * id: when it is an update modal, id is the id of the link to be updated
     */
    const { isAdd, id } = flag;
    const classes = useStyles();
    /**
     * Initailize the states
     */
    let initLinks = '', initComment = '';
    let initTags = [];
    /**
     * initialize the default value and option values for multiselect
     */
    let defaultTags = [];
    let optionTags = [];
    
    /**
     * When it is an update modal, the initial states for link, comment and tags should be
     * the ones of the link to be updated
     */
    if(!isAdd) {
        let index = linkState.findIndex(link => link.id === id);
        initLinks = linkState[index].url;
        initComment = linkState[index].comment;
        initTags = linkState[index].tags.map(tag => tag.name);
    }
    //set the initial states of links, comment and tags
    const [links, setLinks] = useState(initLinks);
    const [comment, setComment] = useState(initComment);
    const [selectedTags, setSelectedTags] = useState(initTags);
    const { tags } = useSelector(state => state.tags);
    const dispatch = useDispatch();

    /**
     * to get optiontags for the multiselect from the current tags
    the format of option tags of the multiselect must be 
            const optionTags = [{
                name: "React",
                label: "react"
            }]
     */
    optionTags = useMemo(() => {
        return tags && tags.map(tag => ({
                value: tag.name,
                label: tag.name
            }))
    }, [tags]);
    /**
     * when it is an update modal, the selected link's tags should be provided as a default
     * tags for the multiselect
     */
    defaultTags = useMemo(() => {
        return selectedTags && selectedTags.map(tag => ({
                value: tag,
                label: tag
            }))
    }, [selectedTags]);

    /**
     * callbacks to monitor the change of the links, comment and tags
     */
    const onChangeLinks = useCallback(
        (e) => {
            setLinks(e.target.value);
        },
        [links],
    );

    const onChangeComment = useCallback((e) => {
        setComment(e.target.value);
    }, [comment]);

    const onChangeTag = useCallback((selectedTags) => {
        setSelectedTags(selectedTags)
    }, [selectedTags])

    /**
     * callback to control on and off state of the modal
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * callback to handle the adding or updating
     */
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            let addedTags = [];
            //tags to be added or updated for a certain link
            addedTags = selectedTags && selectedTags.map(tag => {
                return {
                    name: tag.value
                }
            })
            if(isAdd) {
                //Add a new link
                dispatch(linkActions.addLink({
                    url: links,
                    comment: comment,
                    tags: addedTags
                }));
            } else {
                //update the selected link
                dispatch(linkActions.updateLink({
                    url: links,
                    comment: comment,
                    tags: addedTags
                }, id));
            }
            handleClose();
        },
        [links, comment, selectedTags],
    );

    /**
     * title and subheader of the edit modal.
     */
    const title = isAdd ? 'ADD LINKS' : 'UPDATE LINKS';
    const subheader = isAdd ? 'You can submit your new Bookmark.' : 'You can update your Bookmark.'
    

    return (
        <div >
            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                className={classes.root}
            >
                <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                    <DialogContent className="content-wrapper">
                        <DialogContentText className="subheader">
                            {subheader}
                        </DialogContentText>
                        <form className={classes.form} noValidate>
                            <FormControl className={classes.formControl}>
                                <TextField 
                                    label="Link Url"
                                    name="link_url"
                                    variant="outlined"
                                    value={links}
                                    onChange={onChangeLinks}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField 
                                    label="comment"
                                    name="comment"
                                    variant="outlined"
                                    multiline={true}
                                    value={comment}
                                    onChange={onChangeComment}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <CreatableSelect
                                    isMulti
                                    onChange={onChangeTag}
                                    options={optionTags}
                                    defaultValue={defaultTags}
                                />
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditModal;
