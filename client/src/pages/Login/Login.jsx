import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { user, loading } = useContext(AuthContext);
  const { signIn } = useContext(AuthContext);
  const form1 = location?.state?.pathname || "/";
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((resault) => {
        const user = resault.user;
        if (user) {
          const userEmail = {
            email: user?.email,
          };
          console.log(JSON.stringify(userEmail));
          fetch("https://car-doctor-server-mocha.vercel.app/jwt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userEmail),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // Warning: local Storage is not best
              localStorage.setItem("token", data.token);
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        }
        // console.log("logged in", user);
        navigate(form1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="my-4 text-center">
              New to Car Doctors{" "}
              <Link
                state={location?.state?.pathname}
                className="text-orange-600 font-bold"
                to="/signup"
              >
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
