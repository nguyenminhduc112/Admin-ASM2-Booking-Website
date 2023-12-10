import React from 'react'
import styles from './WrapperBoard.module.css'
import ItemBoard from './ItemBoard'
// Utils
import { covertCurrencyUSD } from '../../utils/covertCurrency'
// Icons
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
const WrapperBoard = ({ infoBoard }) => {
    return (
        <React.Fragment>
            <div className={styles.wrapperBoard}>
                <ItemBoard title={'Users'} result={infoBoard.countUsers} Icon={PersonIcon} backgroundIcon={'#FFC2D1'} colorIcon={'#FB6F92'} />
                <ItemBoard title={'Orders'} result={infoBoard.countTransaction} Icon={ShoppingCartIcon} backgroundIcon={'#F9C74F'} colorIcon={'#F48C06'} />
                <ItemBoard title={'Earnings'} result={covertCurrencyUSD(infoBoard.revenueTransactions)} Icon={MonetizationOnIcon} backgroundIcon={'#76C893'} colorIcon={'#386641'} />
                <ItemBoard title={'Balance'} result={covertCurrencyUSD(infoBoard.averageMonthlyRevenue)} Icon={CollectionsBookmarkIcon} backgroundIcon={'#E0AAFF'} colorIcon={'#3C096C'} />
            </div>
        </React.Fragment>
    )
}

export default WrapperBoard
