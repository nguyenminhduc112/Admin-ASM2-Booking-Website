import React, { useState } from 'react'
import styles from './FormAddHotel.module.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { addHotel } from '../../services/hotelServices'
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const FormAddHotel = ({ rooms }) => {
    const router = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: '',
            type: '',
            title: '',
            desc: '',
            city: '',
            address: '',
            distance: '',
            cheapestPrice: null,
            photos: '',
            featured: false,
            rooms: []
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
    const addHotelSuccessHandle = async (data) => {
        const response = await addHotel(data)
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
            address: data.address,
            cheapestPrice: Number(data.cheapestPrice),
            city: data.city,
            desc: data.desc,
            distance: data.distance,
            featured: Boolean(data.featured),
            name: data.name,
            photos: data.photos.split('\n'),
            rooms: data.rooms,
            title: data.title,
            type: data.type,
            rating: 3
        }
        addHotelSuccessHandle(dataFinal)
    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseAlertSuccess}
                aria-labelledby="customized-dialog-title"
                open={openAlertSuccess}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ backgroundColor: '#6A994E', color: '#fff' }}>
                    Add Hotel Success
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
                        You have successfully added Hotel
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseAlertSuccess}>
                        Oke
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className={styles.boxAction}>
                <h2 className={styles.title}>Add new hotel</h2>
                <button onClick={routerMoveBack} className={styles.btnBack}>Back</button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(handleSubmitSuccess)}>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input id='name' type="text" name='name' className={styles.input} placeholder='My hotel' {...register('name', {
                            required: "Name is empty"
                        })} />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="type" className={styles.label}>Type</label>
                        <input id='type' type="text" name='type' className={styles.input} placeholder='hotel' {...register('type', {
                            required: "Type is empty"
                        })} />
                        {errors.type && <p className={styles.error}>{errors.type.message}</p>}
                    </div>
                </div>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="city" className={styles.label}>City</label>
                        <input id='city' type="text" name='city' className={styles.input} placeholder='New York' {...register('city', {
                            required: "City is empty"
                        })} />
                        {errors.city && <p className={styles.error}>{errors.city.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="address" className={styles.label}>Address</label>
                        <input id='address' type="text" name='address' className={styles.input} placeholder='New York' {...register('address', {
                            required: "Address is empty"
                        })} />
                        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
                    </div>
                </div>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="distance" className={styles.label}>Distance from city Center (m)</label>
                        <input id='distance' type="text" name='distance' className={styles.input} placeholder='500' {...register('distance', {
                            required: "Distance is empty"
                        })} />
                        {errors.distance && <p className={styles.error}>{errors.distance.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input id='title' type="text" name='title' className={styles.input} placeholder='The best Hotel' {...register('title', {
                            required: "Title is empty"
                        })} />
                        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
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
                        <label htmlFor="cheapestPrice" className={styles.label}>Price</label>
                        <input id='cheapestPrice' type="number" name='cheapestPrice' className={styles.input} placeholder='300' {...register('cheapestPrice', {
                            required: "Price is empty"
                        })} />
                        {errors.cheapestPrice && <p className={styles.error}>{errors.cheapestPrice.message}</p>}
                    </div>
                </div>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="photos" className={styles.label}>Images</label>
                        <textarea id='photos' name='photos' defaultValue={''} rows='10' className={styles.textarea} {...register('photos', {
                            required: "Images is empty"
                        })} ></textarea>
                        {errors.photos && <p className={styles.error}>{errors.photos.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="featured" className={styles.label}>Featured</label>
                        <select id='featured' name='featured' className={styles.select} {...register('featured', {
                            required: "Featured is empty"
                        })} >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="rooms" className={styles.label}>Rooms</label>
                    <select id='rooms' name='rooms' className={styles.select} {...register('rooms', {
                        required: "Rooms is empty"
                    })} multiple>
                        {rooms.length > 0 && rooms.map(room => <option key={room._id} value={room._id}>{room.title}</option>)}
                    </select>
                    {errors.rooms && <p className={styles.error}>{errors.rooms.message}</p>}
                    {errors.checkAdd && <p className={styles.error}>{errors.checkAdd.message}</p>}
                </div>

                <button type='submit' className={styles.btnSubmit} disabled={isSubmitting}>{isSubmitting ? '...Submiting' : 'Send'} </button>
            </form>
        </React.Fragment>
    )
}

export default FormAddHotel
