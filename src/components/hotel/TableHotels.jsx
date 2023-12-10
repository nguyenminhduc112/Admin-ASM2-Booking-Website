import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from './TableHotels.module.css'
import { useNavigate } from 'react-router-dom';
import { deleteHotel } from '../../services/hotelServices';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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
const TableHotels = ({ hotels }) => {
    const router = useNavigate()
    // Chuyển trang add new hotel
    const routerMoveNewHotel = () => {
        router('/new hotel')
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'name', headerName: 'Name', width: 300,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 300
        },
        {
            field: 'city', headerName: 'City', width: 150
        },
        {
            field: 'action', headerName: 'Action', width: 300,
            renderCell: (params) => {
                return <RowAction id={params.row._id} name={params.row.name} />
            }
        },
    ];
    return (
        <React.Fragment>

            <div className={styles.boxAction}>
                <h2 className={styles.title}>Hotels List</h2>
                <button onClick={routerMoveNewHotel} className={styles.btnAddNew}>Add New</button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={hotels}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    checkboxSelection
                />
            </div>

        </React.Fragment>
    )
}

const RowAction = function ({ id, name }) {
    const router = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)
    const [openAlertError, setOpenAlertError] = useState({ status: false, message: '' })
    // Open Dialog
    const handleOpen = () => {
        setOpenDialog(true)
    }

    // Close Dialog
    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false)
        router('/hotels')
    }
    const handleCloseAlertError = () => {
        setOpenAlertError({ status: false, message: '' })
    }
    // Xử lý xóa dữ liệu
    const handleDeleteHotel = async (id) => {
        const response = await deleteHotel(id)
        if (response.status === 404) {
            const error = await response.json()
            setOpenAlertError({ status: true, message: error.message })
        }
        if (response.status === 200) {
            setOpenAlertSuccess(true)
        }
        setOpenDialog(false)
    }
    return (
        <React.Fragment>
            <button className={styles.btnDelete} onClick={handleOpen}>Delete</button>
            <button className={styles.btnEdit} onClick={() => {
                router(`/edit hotel/${id}`)
            }}>Edit</button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete {name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleDeleteHotel.bind(null, id)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <BootstrapDialog
                onClose={handleCloseAlertSuccess}
                aria-labelledby="customized-dialog-title"
                open={openAlertSuccess}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ backgroundColor: '#6A994E', color: '#fff' }}>
                    Delete Success
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
                        You have successfully deleted {name}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseAlertSuccess}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <BootstrapDialog
                onClose={handleCloseAlertError}
                aria-labelledby="customized-dialog-title"
                open={openAlertError.status}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ backgroundColor: '#BC4749', color: '#fff' }}>
                    Delete Error
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseAlertError}
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
                        {openAlertError.message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseAlertError}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>

    )
}

export default TableHotels
