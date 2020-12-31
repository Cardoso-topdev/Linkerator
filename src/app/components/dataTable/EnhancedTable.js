import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer,
    Paper,
    Chip,
    IconButton,
    TableRow,
    Checkbox
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { linkActions } from '../../store/actions';

/**
 * 
 * @param {object} a  
 * @param {object} b 
 * @param {string} orderBy 
 * a, b: the subsequent objects of the certain array to be sorted
 * orderBy: the item by which an array is going to be sorted
 */
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

/**
 * 
 * @param {array} links the array of the given links
 * @param {fn} onUpdateClick update callback to be passed to the link table
 */
const createData = (links, onUpdateClick) => {
    return links.map((link) => {
        //action part is an icon for an update
        return {
            id : link.id,
            url: link.url,
            comment: link.comment,
            count: link.count,
            tags: link.tags.map((tag) => tag.name),
            action: <IconButton onClick={() => onUpdateClick(link.id)}>
                        <EditIcon />
                    </IconButton>
        }
    })
};

/**
 * 
 * @param {string} order 
 * @param {string} orderBy 
 * to return a callback to sort the data
 */
const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
  
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
         minWidth: 750,
            '& .link-url' : {
                '&:hover' : {
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }
            }
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    },
}));

const EnhancedTable = ({setOpen, setIsAdd}) => {
    /**
     * 
     * @param {number} id
     * when the user clicks the update button, it triggers the update modal. 
     */
    const onUpdateClick = (id) => {
        setIsAdd({isAdd: false, id: id});
        setOpen(true);
    }

    const classes = useStyles();
    /**
     * get the currnet links state and dispatch function from the redux store
     */
    const { links } = useSelector(state => state.links);
    const dispatch = useDispatch();
    /**
     * create the data for the data table from the current links data
     */
    const rows = createData(links, onUpdateClick);

    /**
     * set the initial order type(as an initail, descending type)
     * 
     */
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('count');
    /**
     * the array of selected link's id
     */
    const [selected, setSelected] = React.useState([]);
    /**
     * 
     * @param {*} property 
     */
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    /**
     * 
     * @param {link url} url 
     * @param {link id} id 
     */
    const goTo = (url, id) => {
        /**
         * to increase the visited count for the link in db
         */
        dispatch(linkActions.visitCounter(id));
        /**
         * go to the another new tab
         */
        window.open(`http://${url}`, '_blank');
    }
    /**
     * 
     * @param {javascript event} event 
     * callback to control the state when all the links are selected
     */
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    /**
     * 
     * @param {id} id
     * when the user checks the links, its index is included in the selected arrray. 
     */
    const handleClick = (event, url, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
  
    const isSelected = (id) => selected.indexOf(id) !== -1;
  
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected} setSelected={setSelected}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
            
                                return (
                                    <TableRow
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.url}
                                        selected={isItemSelected}
                                    >
                                        <TableCell 
                                            padding="checkbox"
                                            onClick={(event) => handleClick(event, row.url, row.id)}
                                        >
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            <a onClick={() => goTo(row.url, row.id)} className="link-url">
                                                {row.url}
                                            </a>
                                        </TableCell>
                                        <TableCell align="center">{row.comment}</TableCell>
                                        <TableCell align="center">{row.count}</TableCell>
                                        <TableCell align="center">
                                            {
                                                row.tags &&
                                                row.tags.map((tag, id) => {
                                                    return (
                                                        <div key={`${tag}-${id}`}>
                                                            <Chip
                                                                label={tag}
                                                                color="primary"
                                                                variant="outlined"
                                                                style={{height: '18px'}}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </TableCell>
                                        <TableCell align="center">{row.action}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default EnhancedTable;