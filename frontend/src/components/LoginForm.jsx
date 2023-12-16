import { useRef } from "react";
import { API_URL } from "../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function LoginForm() {
  const ref = useRef(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    const req = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      ref.current.reset();
      return alert("Error al iniciar sesión");
    }

    const res = await req.json();

    login(res);

    ref.current.reset();

    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div
        className="w-100 d-flex justify-content-center align-items-center h-100"
        style={{ minWidth: "100vw"}}
      >
        <div className="p-4 rounded shadow bg-light d-flex flex-column align-items-center"  style={{ width: "300px", margin: "200px"  }}>
        <form onSubmit={handleSubmit} ref={ref}>
          <h1 className="h3 mb-3 fw-normal">Welcome</h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>        
          <button className="btn btn-primary w-100 py-2 " type="submit">
            Login
          </button>          
        </form>
        <h1 className="h6 mb-3 mt-3 fw-normal">Don't you have account?</h1>
        <Link to="/register" className="btn btn-success w-50 py-1">
          Register
        </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
