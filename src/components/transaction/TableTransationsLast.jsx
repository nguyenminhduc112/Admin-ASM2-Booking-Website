import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { covertCurrencyUSD } from '../../utils/covertCurrency';
import styles from './TableTransationsLast.module.css'
const TableTransationsLast = ({ transactions, pageSizeOptions, title }) => {
    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'nameUser', headerName: 'User', width: 200,
            valueGetter: (params) => {
                return params.row.user.fullName
            }
        },
        {
            field: 'nameHotel', headerName: 'Hotel', width: 200,
            valueGetter: (params) => {
                return params.row.hotel.title
            }
        },
        {
            field: 'roomNumber',
            headerName: 'Room',
            width: 150,
            valueGetter: (params) => {
                const rooms = params.row.room.map(room => {
                    return room.numberRooms.map((number) => number)
                })
                const roomString = rooms.join(', ');
                return roomString
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 300,
            valueGetter: (params) => {
                const dateStart = format(new Date(params.row.dateStart), 'dd/MM/yyyy')
                const dateEnd = format(new Date(params.row.dateEnd), 'dd/MM/yyyy')
                return `${dateStart} - ${dateEnd}`
            }
        },
        {
            field: 'price', headerName: 'Price', width: 200,
            valueGetter: (params) => {
                return covertCurrencyUSD(params.row.price)
            }
        },
        {
            field: 'payment', headerName: 'Payment Method', width: 150
        },

        {
            field: 'status', headerName: 'Status', width: 100,
            renderCell: (params) => {
                return <p className={params.row.status === 'Booked' ? styles.activeBooked : params.row.status === 'Checkin' ? styles.activeCheckin : styles.activeCheckout}>{params.row.status}</p>
            }
        },
    ];


    return (
        <React.Fragment>
            <h2 className={styles.title}>{title}</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={transactions}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
                        },
                    }}
                    pageSizeOptions={pageSizeOptions}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    )
}

export default TableTransationsLast
