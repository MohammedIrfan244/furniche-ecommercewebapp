import { useContext, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { shippingFee, currency ,loading,products} =
    useContext(ShopContext);
    const{ setUserOrders,cartTotal,setCartItems,setCartTotal,cartItems}=useContext(UserContext)
  const navigate = useNavigate();
  const[orderProducts,setOrderProducts]=useState([])
  const[firstName,setFirstName]=useState("")
  const[lastName,setLastName]=useState("")
  const[email,setEmail]=useState("")
  const[mobile,setMobile]=useState("")
  const[place,setPlace]=useState("")
  const[pin,setPin]=useState("")
  const address={
    name:firstName+" "+lastName,
    email:email,
    mobile:mobile,
    place:place,
    pin:pin
  }
  const orderItems = products.filter((items) => cartItems[items.id])
  orderProducts=orderItems

  const handleClick = (e) => {
    e.preventDefault();
   setUserOrders(prevItems=>[...prevItems,...orderProducts])
    setCartItems({})
    setCartTotal(0);

    setTimeout(() => {
      toast.success("Payment Success");
    }, 1000);
    navigate("/");
  };

  return (
    <div className={`${loading?"h-[100vh] flex justify-center items-center":null}`}>
      {loading?(
        <span className="loader"></span>
      ):(
        <form  className="pt-[30%] sm:pt-[10%] flex flex-col sm:flex-row justify-between gap-5 sm:gap-3 w-[100%]" onSubmit={handleClick}>
      <div className="w-[100%] sm:w-[40%]">
        <h1 className="flex items-baseline text-l sm:text-xl">
          DELIVARY DETAILS <hr className="w-10 h-[3px] bg-[#A47C48]" />
        </h1>
        <div className="flex flex-col gap-3 mt-[10%]">
          <div className="flex gap-3 w-[100%] justify-between">
            <input
              required
              type="text"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              placeholder="First name"
              className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"
            />
            <input
              required
              type="text"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="Last name"
              className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"
            />
          </div>
          <input
            required
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2"
          />
          <input
            required
            type="text"
            value={place}
            onChange={(e)=>setPlace(e.target.value)}
            placeholder="Place"
            className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2"
          />
          <div className="flex w-[100%] gap-3 justify-between">
            <input
              required
              type="number"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
              minLength={10}
              placeholder="Mobile Number"
              className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"
            />
            <input
              required
              type="number"
              minLength={6}
              value={pin}
              onChange={(e)=>setPin(e.target.value)}
              placeholder="Pincode"
              className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] sm:w-[50%] mt-[10%] sm:mt-0">
        <h1 className="flex items-baseline text-l sm:text-xl">
          PAYMENT DETAILS <hr className="w-10 h-[3px] bg-[#A47C48]" />
        </h1>
        <div className="mt-[10%] flex flex-col gap-3">
          <div className="flex justify-between">
            Total :
            <p className="font-bold">
              {currency}
              {cartTotal}.00
            </p>
          </div>
          <div className="flex justify-between">
            Shipping fee :
            <p className="font-bold">
              {currency}
              {shippingFee}.00
            </p>
          </div>
          <div className="flex justify-between">
            Total payment :
            <p className="font-bold">
              {currency}
              {cartTotal + shippingFee}.00
            </p>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="flex w-[40%] sm:w-[30%] gap-4 flex-nowrap">
                <input type="radio" required name="payment" />
                 <img className="payments w-[50%] sm:w-[80%] md:w-[50%]" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razor pay" />
              </div>
              <div className="flex w-[60%] sm:w-[30%] gap-4">
                <input type="radio" name="payment" />
                 <p className="whitespace-nowrap">Cash on Delivary <FontAwesomeIcon icon={faHandHoldingDollar}/></p>
              </div>
            </div>
            <div className="text-right mt-[5%]">
              <button
                type="submit"
                className="bg-black text-[#F5F2E9] text-xs active:scale-95 px-5 py-1 sm:py-2 "
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
          </form>
      )}
          </div>
  );
}

export default PlaceOrder;
