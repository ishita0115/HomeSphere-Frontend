import React from 'react'
import About from '../../components/WithoutLogin/about/aboutus'
import Footer from '../../components/footer/footer'

function AboutUs() {
  return (
    <div>
       <About
        cardTitle1="15 years"
        cardSubText1="in business"
        cardTitle2="$1 billion"
        cardSubText2="property brokered"
        cardTitle3="10,000"
        cardSubText3="transactions"
      />
      <Footer />
    </div>
  )
}

export default AboutUs
