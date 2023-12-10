import React, { Suspense } from 'react'
import { fetchTransactions } from '../services/transactionServices'
import { Await, defer, useLoaderData } from 'react-router-dom'
import TableTransationsLast from '../components/transaction/TableTransationsLast'

const TransactionPage = () => {
    const { transactions } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={transactions}>
                    {(transactionsLoader) => <TableTransationsLast transactions={transactionsLoader} pageSizeOptions={[10, 20]} title={'Transactions List'} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}
const transactionsLoader = () => {
    const data = fetchTransactions()
    return data
}

export const loaderTransaction = function () {
    return defer({
        transactions: transactionsLoader()
    })
}
export default TransactionPage
