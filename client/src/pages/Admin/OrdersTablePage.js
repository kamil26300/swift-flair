import React from 'react'
import MetaData from '../../components/MetaData';
import OrdersTable from '../../features/admin/components/OrdersTable';

const OrdersTablePage = () => {
  return (
    <>
      <MetaData title="All Orders" />
      <OrdersTable />
    </>
  )
}

export default OrdersTablePage