import React, { useState } from 'react'
import styles from '../newHotel/FormAddHotel.module.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { addRoom } from '../../services/roomServices';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const FormAddRoom = () => {
    const router = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            maxPeople: null,
            title: '',
            desc: '',
            price: null,
            roomNumbers: []
        }
    })
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false)
        reset()
    }
    const routerMoveBack = () => {
        router(-1)
    }

    // Xử lý thêm thành công 
    const addRoomSuccessHandle = async (data) => {
        const response = await addRoom(data)
        if (response.status === 200) {
            setOpenAlertSuccess(true)
        }
        if (response.status === 404) {
            setError('checkAdd', {
                message: 'Add Hotel failed'
            })
        }
    }
    // Xử lý form khi submit thành công
    const handleSubmitSuccess = (data) => {
        const dataFinal = {
            price: Number(data.price),
            desc: data.desc,
            roomNumbers: data.roomNumbers.split('\n').map(number => Number(number)),
            title: data.title,
            createdAt: new Date(),
            updatedAt: new Date(),
            maxPeople: Number(data.maxPeople)
        }
        console.log(dataFinal)
        addRoomSuccessHandle(dataFinal)
    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseAlertSuccess}
                aria-labelledby="customized-dialog-title"
                open={openAlertSuccess}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ backgroundColor: '#6A994E', color: '#fff' }}>
                    Add Room Success
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseAlertSuccess}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        You have successfully added Room
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseAlertSuccess}>
                        Oke
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className={styles.boxAction}>
                <h2 className={styles.title}>Add new room</h2>
                <button onClick={routerMoveBack} className={styles.btnBack}>Back</button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(handleSubmitSuccess)}>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input id='title' type="text" name='title' className={styles.input} placeholder='2 bed room' {...register('title', {
                            required: "Title is empty"
                        })} />
                        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="price" className={styles.label}>Price</label>
                        <input id='price' type="number" name='price' className={styles.input} placeholder='300' {...register('price', {
                            required: "Price is empty"
                        })} />
                        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                    </div>
                </div>
                <div className={styles.groupForm}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="desc" className={styles.label}>Description</label>
                        <textarea id='desc' name='desc' rows='10' className={styles.textarea}  {...register('desc', {
                            required: "Description is empty"
                        })} ></textarea>
                        {errors.desc && <p className={styles.error}>{errors.desc.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="roomNumbers" className={styles.label}>Rooms</label>
                        <textarea id='roomNumbers' name='roomNumbers' placeholder='Please write the room numbers here (a room number is a row)' defaultValue={''} rows='10' className={styles.textarea} {...register('roomNumbers', {
                            required: "Rooms is empty"
                        })} ></textarea>
                        {errors.roomNumbers && <p className={styles.error}>{errors.roomNumbers.message}</p>}
                    </div>

                </div>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="maxPeople" className={styles.label}>Max People</label>
                        <input id='maxPeople' type="number" name='maxPeople' className={styles.input} placeholder='3' {...register('maxPeople', {
                            required: "Max People is empty"
                        })} />
                        {errors.maxPeople && <p className={styles.error}>{errors.maxPeople.message}</p>}
                    </div>
                </div>

                <button type='submit' className={styles.btnSubmit} disabled={isSubmitting}>{isSubmitting ? '...Submiting' : 'Send'} </button>
            </form>
        </React.Fragment>
    )
}

export default FormAddRoom
