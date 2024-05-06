import React from "react";
import "./getstart.css";
import useLoginModal from "@/app/redux/hooks/loginhook";
const GetStarted = () => {
    const loginModal = useLoginModal();
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with HomeSphere</span>
          <span className="secondaryText m-3">
            find super attractive and Safe Home from us.
            <br />
            Find your Home soon
          </span>
          <button className="button p-2" onClick={() => {
                  loginModal.open();
                }} >
           Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;