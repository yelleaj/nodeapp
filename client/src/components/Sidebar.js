import React, { Fragment } from "react";
import { MdOutlineDashboard, MdOutlineGroups, MdOutlinePersonOutline, BsClock, IoSettingsOutline, SlCalender, MdOutlineDownloadForOffline, FaBell, MdLogout, FaAngleRight, FaAngleDown } from "react-icons/md";
import img1 from './assests/3d-illustration-teenager-with-funny-face-glasses.jpg';
import './Dashboard.css';

const Sidebar = ({ logout }) => {
    return (
        <div className="sidebar">
            <div className="Top">
                <div className="components">
                    <a href="" className="component">
                        <MdOutlineDashboard className="icons" />
                        <h5>Dashboard</h5>
                    </a>
                    <a href="#submenu-wrap" id="open" className="component">
                        <MdOutlineGroups className="icons" />
                        <h5>Hr Management</h5>
                        <div className="submenu-wrap" id="submenu-wrap">
                            <div className="submenu">
                                <div id="close" className="subcomponent">
                                    <h5>Hr Requests</h5>
                                    <FaAngleDown className="icons" />
                                </div>
                                <div className="subcomponent">
                                    <h5>Create Hr Request</h5>
                                </div>
                                <div className="subcomponent">
                                    <h5>My Requests</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="" className="component">
                        <MdOutlinePersonOutline className="icons" />
                        <h5>Self Service</h5>
                    </a>
                    <a href="" className="component">
                        <BsClock className="icons" />
                        <h5>Time and Attendance</h5>
                    </a>
                    <a href="" className="component">
                        <IoSettingsOutline className="icons" />
                        <h5>Settings</h5>
                    </a>
                    <a href="" className="component">
                        <SlCalender className="icons" />
                        <h5>Work Shedule</h5>
                    </a>
                </div>
            </div>
            <div className="Botton">
                <a href="" className="getapp">
                    <h5 className="component">
                        <MdOutlineDownloadForOffline className="icons" /> Get App
                    </h5>
                </a>
                <div className="Profile">
                    <div className="pic">
                        <img src={img1} alt="" />
                    </div>
                    <div className="name">
                        <h5>Full Name</h5>
                        <p>Designation</p>
                    </div>
                    <div className="arrow">
                        <a href=""><FaAngleRight /></a>
                    </div>
                </div>
                <a href="" className="notification">
                    <p><FaBell /> Notification</p>
                </a>
                <div className="logout">
                    <a href="" onClick={(e) => logout(e)}><MdLogout /> Log Out</a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
