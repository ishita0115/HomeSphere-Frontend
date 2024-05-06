import React from "react";
import Back from "./Back";
import Heading from "./Heading";

import "./about.css";

const About = () => {
  return (
    <>
      <section className="about">
        <Back
          name="About Us"
          title="About Us - Who We Are?"
          cover="/images/about.jpg"
        />
        <div className="container flex mtop">
          <div className="left row mt-4">
            <Heading
              title="Our Agency Story"
              subtitle="Check out our company story and work process"
            />

            <p className="">
              Welcome to HomeSphere Founded in 2012 and acquired by REA India in
              2017, HomeSphere.com is India’s most innovative real estate
              advertising platform for homeowners, landlords, developers, and
              real estate brokers. The company offers listings for new homes,
              resale homes, rentals, plots and co-living spaces in India. Backed
              by strong research and analytics, the company’s experts provide
              comprehensive real estate services that cover advertising and
              marketing, sales solutions for real estate developers,
              personalized search, virtual viewing, AR&VR content, home loans,
              end-to-end transaction services, and post-transaction services to
              consumers for both buying and renting.
            </p>
            <p>
              Our vision is changing the way India experiences property. And our
              mission is to be the first choice of our consumers and partners in
              discovering, renting, buying, selling, financing a home, and
              digitally enabling them throughout their journey. We do that with
              data, design, technology, and above all, the passion of our people
              while delivering value to our shareholders.
            </p>
            <button className="btn2">More About Us</button>
          </div>
          <div className="right row mt-8">
            <img src="/images/immio.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
