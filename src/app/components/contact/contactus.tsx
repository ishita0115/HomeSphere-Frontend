import React from "react"
import Back from "../../components/WithoutLogin/about/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact bg-gray-100'>
        <Back name='Contact Us' title='Get Help & Friendly Support' cover="/images/contsctus.jpg" />
        <div className='container mx-auto px-4 flex flex-col items-center mt-6'>
        <button className="text-blue-900 text-xl capitalize shadow-lg bg-white p-4 mb-8 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-3xl h-14 w-36">
        Contact us
        </button>  
          <img
            src="/aboutus/1.png"
            alt="Company Office"
            width={700}
            height={600}
            className="rounded-lg shadow-lg mb-8 transform transition-transform duration-500 hover:scale-105"
          />
          
        </div>
      </section>
    </>
  )
}

export default Contact
