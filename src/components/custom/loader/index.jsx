import React from 'react'
import palette from '../../../theme';

//mui
import { makeStyles } from "@mui/styles";
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.progress}>
            <CircularProgress color="secondary" />
        </div>
    )
}

export default Loader;


const useStyles = makeStyles(() => ({
    progress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : palette.bgThemeColor,
        height: '100vh',
        width: '100vw',
        '& span': {
            // border: '1px solid rgb(112, 112, 112, 0.2)',
            width: '3rem !important',
            height: '3rem !important',
            '& svg': {
                filter: 'invert(0%) sepia(8%) saturate(30%) hue-rotate(202deg) brightness(99%) contrast(100%)'
           }
        }
    },

}));