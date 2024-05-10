import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarContainer({
    open,
    setOpen,
    message,
    severity = '',
    autoHideDuration = 6000,
    vertical = 'bottom',
    horizontal = 'left' }) {
    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //   return;
        // }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const getSnackbarColor = () => {
        switch (severity) {
            case 'error':
                return 'rgb(207, 2, 2)'; // Red color for error severity
            // return '#FF0000'; // Red color for error severity
            case 'warning':
                return '#FFC107'; // Orange color for warning severity
            case 'info':
                return '#2196F3'; // Blue color for info severity
            case 'success':
                return 'rgb(3 133 1)'// Green color for success severity
            default:
                return 'rgb(14 167 8)'; // Default black color
        }
    };

    return (
        <Stack spacing={2} sx={{ width: '100%', position: 'relative', zIndex: 999999999 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
                // message={message}
                action={action}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    style={{
                        backgroundColor: getSnackbarColor(),
                        color: '#FFFFFF'
                    }}
                // sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
