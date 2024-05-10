import React from 'react'
import palette from '../../../theme';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton = ({
    type = 'submit',
    variant = 'filled',
    textColor = '#fff',
    borderColor = palette.btnPrimary.borderColor,
    bgcolor = palette.btnPrimary.background,
    width = '8rem',
    height = '2.5rem',
    fs = "0.8rem",
    fw = 800,
    ls = 0,
    btnText = '',
    handleClick,
    disabled = false,
    alignSelf = 'center',
    margin = 0,
    loading = false,
    padding = '6px 16px'
}) => {
    return (
        <>
            {
                loading ?
                    <Button
                        variant={'outlined'}
                        disabled={disabled}
                        sx={{
                            width,
                            height,
                            color: textColor,
                            border: `2px solid #6e6e6e`,
                            bgcolor: '#6e6e6e',
                            fontSize: fs,
                            cursor: "pointer",
                            alignSelf,
                            padding,
                            margin,
                            ':hover': {
                                cursor: 'not-allowed',
                                bgcolor: '#6e6e6e',
                                color: textColor,
                            },
                            '& .MuiCircularProgress-root': {
                                width: '1.2rem !important',
                                height: '1.2rem !important'
                            }
                        }}>
                        <CircularProgress color="inherit" />
                    </Button> :
                    <Button
                        type={type}
                        variant={variant}
                        onClick={handleClick}
                        disabled={disabled}
                        sx={{
                            width,
                            height,
                            color: textColor,
                            border: `2px solid ${borderColor}`,
                            bgcolor,
                            fontFamily: "Montserrat",
                            fontSize: fs,
                            fontWeight: fw,
                            letterSpacing: ls,
                            cursor: "pointer",
                            alignSelf,
                            margin,
                            padding,
                            ':hover': {
                                bgcolor: bgcolor,
                                color: textColor,
                            },
                            ':disabled': {
                                backgroundColor: '#cccccc', /* Grey */
                                color: '#666666', /* Dark grey */
                                cursor: 'not-allowed',
                                borderColor:'#cccccc',
                              }
                        }}>
                        {btnText}
                    </Button>
            }


        </>
    )
}

export default CustomButton;



