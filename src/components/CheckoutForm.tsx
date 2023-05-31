import { useState } from "react";
import axios from "axios";

interface props {
    pid: string;
    mail: string;
}

const CheckoutForm = ({ pid, mail }: props) => {
    const [checkoutDetails, setCheckoutDetails] = useState(Object);

    const setupVal = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        let temp = checkoutDetails;
        temp[type] = e.target.value;
        setCheckoutDetails(temp);
    };

    const checkoutMain = () => {
        let temp = checkoutDetails;
        temp["adminMail"] = mail;
        temp["pid"] = pid;
        setCheckoutDetails(temp);

        axios
            .post("http://127.0.0.1:8000/postMail/", checkoutDetails)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">
                    Name
                </label>

                <input
                    onChange={(e) => setupVal("name", e)}
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="John Smith"
                />

                <label htmlFor="email" className="form-label">
                    Email address
                </label>
                <input
                    onChange={(e) => setupVal("email", e)}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                    Address
                </label>
                <textarea
                    onChange={(e) => {
                        let temp = checkoutDetails;
                        temp["address"] = e.target.value;
                        setCheckoutDetails(checkoutDetails);
                    }}
                    className="form-control"
                    id="address"
                    rows={3}
                ></textarea>

                <label className="form-label" htmlFor="transaction-id">
                    Transaction ID of your payment
                </label>

                <input
                    onChange={(e) => setupVal("trancsid", e)}
                    type="text"
                    id="transaction-id"
                    className="form-control"
                    placeholder="3246421384"
                />
                <button
                    className="btn btn-outline-success float-right my-3"
                    onClick={checkoutMain}
                >
                    Place the order
                </button>
            </div>
        </>
    );
};

export default CheckoutForm;
