import React from "react"
import Back from "../../components/WithoutLogin/about/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover="/images/contsctus.jpg" />
        <div className='container m-4 bg-blue-200'>
          <form className='shadow'>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' placeholder='Name' />
              <input type='text' placeholder='Email' />
            </div>
            <input type='text' placeholder='Subject' />
            <textarea cols='30' rows='10'></textarea>
            <button>Submit Request</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact