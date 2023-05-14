import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Bookings = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBooking] = useState([]);
  const [toast, setToast] = useState(false);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [loading]);
  const removeOneFormBooking = (id) => {
    const yesOrNo = confirm("do you want remove this service ?");
    if (yesOrNo) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((d) => {
          const restOf = bookings.filter((booking) => booking?._id !== id);
          setBooking(restOf);
          if (d?.deletedCount >= 1) {
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 1000);
          }
        });
    }
  };
  return (
    <div>
      <div className="overflow-x-auto w-full px-5 rounded">
        <table className="table w-full my-5 border border-gray-600 rounded">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label className="text-xl">X</label>
              </th>
              <th>Services</th>
              <th>Price</th>
              <th>Deatails</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {bookings.map((booking) => {
              const { _id, img, service, date, price } = booking;
              return (
                <TabilItem
                  key={_id}
                  id={_id}
                  img={img}
                  service={service}
                  date={date}
                  price={price}
                  handleClick={removeOneFormBooking}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`toast toast-top toast-end ${toast ? "" : "hidden"}`}>
        <div className="alert alert-info">
          <div>
            <span>The service removed.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const TabilItem = ({ id, img, service, date, price, handleClick }) => {
  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleClick(id)} className="text-xl">
            X
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={img} alt={service} />
            </div>
          </div>
          <div>
            <div className="font-bold">{service}</div>
            <div>{date}</div>
          </div>
        </div>
      </td>
      <td>${price}</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};
export default Bookings;
