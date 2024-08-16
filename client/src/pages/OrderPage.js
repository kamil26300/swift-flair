import MetaData from "../components/MetaData"
import UserOrder from "../features/user/components/UserOrder"

const OrderPage = () => {
  return (
    <>
      <MetaData title="Your Orders"/>
      <UserOrder/>
    </>
  )
}

export default OrderPage