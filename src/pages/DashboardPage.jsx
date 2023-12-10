import React, { Suspense } from 'react'
import WrapperBoard from '../components/dashboard/WrapperBoard'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { fetchInfoBoard } from '../services/dashboardServices'
import { fetchTransactionLast } from '../services/transactionServices'
import TableTransationsLast from '../components/transaction/TableTransationsLast'
const DashboardPage = () => {
    const { infoBoard } = useLoaderData()
    const { transactionsLast } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={infoBoard}>
                    {(infoBoardLoader) => <WrapperBoard infoBoard={infoBoardLoader} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={transactionsLast}>
                    {(transactionsLoader) => <TableTransationsLast transactions={transactionsLoader} pageSizeOptions={[8]} title={'Latest Transactions'} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

const infoBoardLoader = () => {
    const data = fetchInfoBoard()
    return data
}

const transactionLastLoader = () => {
    const data = fetchTransactionLast()
    return data
}

export const loaderDashboard = function () {
    return defer({
        infoBoard: infoBoardLoader(),
        transactionsLast: transactionLastLoader()
    })
}
export default DashboardPage
