import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        handleAuthenticationFailure();
      }
    } catch (error) {
      dispatch(hideLoading());
      handleAuthenticationFailure();
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const handleAuthenticationFailure = () => {
    localStorage.clear();
    navigate("/login");
  };
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
