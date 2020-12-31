import React from 'react';
import {
    TableHead,
    TableRow,
    Checkbox,
    TableCell,
    TableSortLabel
} from '@material-ui/core';

/**
 * format the table header
 */
const headCells = [
    { id: 'url', numeric: false, disablePadding: true, label: 'Link' },
    { id: 'comment', numeric: false, disablePadding: false, label: 'Comment' },
    { id: 'count', numeric: true, disablePadding: false, label: 'Count' },
    { id: 'tags', numeric: false, disablePadding: false, label: 'Tags' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Edit' },
];

const EnhancedTableHead = (props) => {
    const { 
        classes, 
        onSelectAllClick, 
        order, 
        orderBy, 
        numSelected, 
        rowCount, 
        onRequestSort 
    } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                                ) : null
                            }
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;