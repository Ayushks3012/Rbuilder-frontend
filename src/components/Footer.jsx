import React from 'react';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg text-center text-light p-5">
      <h4>Contact Us</h4>
      <h6 className="mt-4">
        <MdEmail className="fs-4" /> ResumeBuilder@gmail.com
      </h6>
      <h6>
        <MdOutlinePhoneAndroid className="fs-4" /> 8943140840
      </h6>
      <br />
      <h5>Connect With Us</h5>
      <div className="d-flex justify-content-center align-items-center">
        <IoLogoWhatsapp className="fs-4 me-3" />
        <FaInstagram className="fs-4 me-3" />
        <FaLinkedin className="fs-4 me-3" />
      </div>
      <p className="mt-3">Designed & built with ❤️ using React</p>
    </div>
  );
};

export default Footer;
