import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import loading1 from './loading.gif';
const SignupForm = () => {


  const scriptURL = 'https://script.google.com/macros/s/AKfycbzoUpDfb2QyxKNtepYz6OZuOl4M05ynclw5GjONn3QQ9Iqi9uW4W3y7mx9GqRogyo8/exec';
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFadeOut(true);
    setLoading(true);

    const form = e.target;
    try {
      await fetch(scriptURL, { mode: 'no-cors', method: 'POST', body: new FormData(form) });
      // alert("Thank You, your form has been submitted successfully");
      document.getElementById('success-message').classList.remove('hidden');
      // window.location.reload();
      document.getElementById('close-message').addEventListener('click', () => {
        document.getElementById('success-message').classList.add('hidden');
        window.location.reload();
      });

    } catch (error) {
      console.error('Error!', error.message);
    } finally {
      setLoading(false);
      setFadeOut(false);
    }
  };

  return (
    <>

    <div id="success-message" class="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 class="text-2xl font-bold text-green-500">Thank You!</h2>
        <p class="mt-4">Your form has been submitted successfully.</p>
        <button id="close-message" class="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Close
        </button>
      </div>
    </div>

  <div className="">

    <Form
      autoComplete="off"
      className="  grid grid-flow-row-dense grid-cols-2 md:grid-rows-3 sm:grid-cols-1 gap-3 "
      action=""
      method="post"
      id=""
      name="thegi"
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="name" className=" ">
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          required
          pattern=".*\S+.*"
          maxLength="100"
          title="Name"
        />
        <Form.Text className="text-muted d-none">
          Please enter your name
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="email" className=" ">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          required
          maxLength="100"
          title="Email"
        />
        <Form.Text className="text-muted d-none">
          Please enter your email
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="full_phone3" className=" ">
        <Form.Control
          type="tel"
          placeholder="Mobile Number"
          name="mobile"
          required
          title="Mobile Number"
        />
        <Form.Text className="text-muted d-none">
          Please enter your phone number
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="city" className=" ">
        <Form.Control
          type="text"
          placeholder="City"
          name="city"
          required
          maxLength="100"
          title="City"
        />
        <Form.Text className="text-muted d-none">
          Please enter your city
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="state" className=" ">
        <Form.Control
          type="text"
          placeholder="State"
          name="state"
          required
          maxLength="100"
          title="State"
        />
        <Form.Text className="text-muted d-none">
          Please enter your state
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="plan" className=" ">
        <Form.Control
          as="select"
          name="investment"
          required
          title="Select investment"
        >
          <option value="" disabled hidden>Investment Amount</option>
          <option value="100000">1 Lakh</option>
          <option value="500000">5 Lakh</option>
          <option value="1000000">10 Lakh</option>
          <option value="2500000">25 Lakh</option>
          <option value="5000000">50 Lakh</option>
          <option value="10000000">1 Crore</option>
        </Form.Control>
        <Form.Text className="text-muted d-none">
          Please select your plan
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="whatsapp_notification" className="col-lg-12 col-md-12 col-sm-12 well_wr well_wr1 d-none">
        <Form.Check
          type="checkbox"
          label="Get publishing updates on WhatsApp"
          defaultChecked
          name="whatsapp_notification"
          value="1"
        />
      </Form.Group>
      
      <Button
        type="submit"
        className=" btn-blue  "
        disabled={loading} >
           Enquire Now
       {loading && <div className='rel' style={{ padding: '0px', marginTop:'-26px',marginLeft:'20px'  }}><div className="spinner show"></div></div>} 
      </Button>
    </Form>

    </div>
    
    </>
  );
};

export default SignupForm;
