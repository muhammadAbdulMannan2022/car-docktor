import { useLoaderData } from "react-router-dom";
import CommonHeader from "../Shared/commonHeader/CommonHeader";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Checkout = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const { _id, title, price, img } = data;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, date, phone, email } = e.target;
    console.log(name.value, email.value, date.value, phone.value);
    if (name.value && date.value && phone.value.match(/\b\d+\b/)) {
      setError("");
      const order = {
        customerName: name.value,
        email: email.value,
        date: date.value,
        service_id: _id,
        service: title,
        price,
        img,
      };
      fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then(() => {
          setSuccess("order confirmed");
        });
    } else {
      setError("please! provide valid data");
    }
  };
  return (
    <div>
      <CommonHeader title="Checkout" />
      <h1 className="text-center sm:text-4xl text-2xl mb-6">
        book the service : {title}
      </h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="flex justify-between gap-2">
          <div className="w-1/2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={user?.displayName}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                defaultValue={user?.phoneNumber}
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input type="date" name="date" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                defaultValue={user?.email}
                className="input input-bordered"
                readOnly
              />
            </div>
          </div>
        </div>
        <span className="text-red-600">{error}</span>
        <span className="text-green-600">{success}</span>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-error">
            Order Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
