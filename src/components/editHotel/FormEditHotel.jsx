import React, { useEffect, useState } from 'react'
import styles from '../newHotel/FormAddHotel.module.css'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { uppdateHotel } from '../../services/hotelServices'
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Typography } from '@mui/material';
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
const FormEditHotel = ({ hotel, rooms }) => {
    const router = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            name: hotel.name,
            type: hotel.type,
            title: hotel.title,
            desc: hotel.desc,
            city: hotel.city,
            address: hotel.address,
            distance: hotel.distance,
            cheapestPrice: hotel.cheapestPrice,
            photos: hotel.photos.join('\n'),
            featured: hotel.featured,
            rooms: hotel.rooms.map(room => room._id),
            rating: hotel.rating
        }
    })
    // Bắt sự kiện khi bạn thây đổi trường
    useEffect(() => {
        if (isDirty) {
            clearErrors('checkUpdated')
        }
    }, [isDirty])
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false)
    }
    const routerMoveBack = () => {
        router(-1)
    }

    // Xử lý cập nhật thành công 
    const uppdateHotelSuccessHandle = async (data) => {
        const response = await uppdateHotel(hotel._id, data)
        if (response.status === 200) {
            setOpenAlertSuccess(true)
        }
        if (response.status === 400) {
            setError('checkUpdated', {
                message: 'Updated Hotel failed'
            })
        }
        if (response.status === 201) {
            setError('checkUpdated', {
                message: 'There are no changes to the data'
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
            featured: data.featured,
            name: data.name,
            photos: data.photos.split('\n'),
            rooms: data.rooms,
            title: data.title,
            type: data.type,
            rating: data.rating
        }
        uppdateHotelSuccessHandle(dataFinal)
    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleCloseAlertSuccess}
                aria-labelledby="customized-dialog-title"
                open={openAlertSuccess}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ backgroundColor: '#6A994E', color: '#fff' }}>
                    Update Hotel Success
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
                        You have successfully updated Hotel
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseAlertSuccess}>
                        Oke
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className={styles.boxAction}>
                <h2 className={styles.title}>Update hotel</h2>
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
                        <textarea id='photos' name='photos' rows='10' className={styles.textarea} {...register('photos', {
                            required: "Images is empty"
                        })} ></textarea>
                        {errors.photos && <p className={styles.error}>{errors.photos.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="featured" className={styles.label}>Featured</label>
                        <select id='featured' name='featured' defaultValue={hotel.featured} className={styles.select} {...register('featured', {
                            required: "Featured is empty"
                        })} >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                </div>
                <div className={styles.groupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rooms" className={styles.label}>Rooms</label>
                        <select id='rooms' name='rooms' className={styles.select} {...register('rooms', {
                            required: "Rooms is empty"
                        })} multiple defaultValue={hotel.rooms.map(room => room._id)}>
                            {rooms.length > 0 && rooms.map(room => <option key={room._id} value={room._id}>{room.title}</option>)}
                        </select>
                        {errors.rooms && <p className={styles.error}>{errors.rooms.message}</p>}
                        {errors.checkUpdated && <p className={styles.error}>{errors.checkUpdated.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rating" className={styles.label}>Rating</label>
                        <div>
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <Rating
                                        name="rating"
                                        value={field.value}
                                        onChange={(event, newValue) => {
                                            field.onChange(newValue);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.rating && <p className={styles.error}>{errors.rating.message}</p>}
                    </div>
                </div>
                <button type='submit' className={styles.btnSubmit} disabled={isSubmitting}>{isSubmitting ? '...Submiting' : 'Update'} </button>
            </form>
        </React.Fragment>
    )
}

export default FormEditHotel
