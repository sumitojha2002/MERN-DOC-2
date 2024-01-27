import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Layout.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/doctorslist",
      icon: "ri-nurse-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-3-line",
    },
  ];

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appoinments",
      path: "/appoinments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply for Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appoinments",
      path: "/appoinments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout ">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="heading">DN</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                window.location.reload(true);
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex px-4 align-items-center">
              <Badge
                className=" notiBell"
                count={user?.unseenNotification.length}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <i
                  className=" ri-notification-line header-action-icon mr-2 px-3 "
                  to="/profile"
                ></i>
              </Badge>
              <Link className="anchor mx-3">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
