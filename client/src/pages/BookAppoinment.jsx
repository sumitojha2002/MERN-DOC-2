import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import { DatePicker, TimePicker } from "antd";

function BookAppoinment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [selectedTiming, setSelectedTiming] = useState();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    // if (!user) {
    getDoctorData();
    // }
  }, []);

  return (
    <Layout>
      <div className="page-title">
        <div className="page-title">
          {doctor && (
            <h1 className="page-title">
              {doctor.firstName} {doctor.lastName}
            </h1>
          )}
          <hr />
          {doctor && (
            <h1 className="normal-text">
              <b>Timings: </b>
              {doctor.timings[0]} - {doctor.timings[1]}
            </h1>
          )}
          <div className="d-flex flex-column">
            <DatePicker format="DD-MM-YYYY" />
            <TimePicker.RangePicker format="HH:mm" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookAppoinment;
