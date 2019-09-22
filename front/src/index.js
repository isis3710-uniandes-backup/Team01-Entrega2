import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home/home"
import  Navbar  from "./components/navbar";
import DashBoardTutor from './components/tutoring/dashboardtutor';
ReactDOM.render(<div><Navbar/><Home /></div>, document.getElementById("root"));
ReactDOM.render(<DashBoardTutor/>, document.getElementById("root"));
