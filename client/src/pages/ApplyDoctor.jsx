import React from "react";
import Layout from "../components/Layout";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0])._i.format("HH:mm"),
            moment(values.timings[1])._i.format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;
