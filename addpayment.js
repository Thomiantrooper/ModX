import { useState } from "react";
import axios from "axios";
import './addorder.css'

function AddPayment() {
    const [payment, setPayment] = useState({
        U_name: "",
        card_number: "",
        card_holder: "",
        expir_date: "",
        cvc: "",
        coupon_code: "",
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:5000/create_payment", payment);
        console.log(data);
        alert("Payment confirmed!");
    };

    return (
        <div className="add-order-container">
            <div className="add-order">
                <h2>Payment Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>User Name:</label>
                        <input type="text" id="U_name" name="U_name" onChange={handleOnChange} />
                    </div>
                    <div className="input-group">
                        <div>
                            <label>Card Holder:</label>
                            <input type="text" id="card_holder" name="card_holder" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label>Card Number:</label>
                            <input type="text" id="card_number" name="card_number" onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="input-group">
                        <div>
                            <label>Expiry Date:</label>
                            <input type="date" id="expir_date" name="expir_date" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label>CVC:</label>
                            <input type="text" id="cvc" name="cvc" onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Coupon Code:</label>
                        <input type="text" id="coupon_code" name="coupon_code" onChange={handleOnChange} />
                    </div>
                    <button id="confirmpaybtn">Confirm Payment</button>

                </form>
            </div>
        </div>
    );
}

export default AddPayment;
