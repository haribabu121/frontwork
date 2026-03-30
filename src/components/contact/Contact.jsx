import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaFacebook, FaWhatsapp, FaInstagram, FaYoutube 
} from 'react-icons/fa';
import axios from 'axios';
import { API_URLS } from '../../lib/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        API_URLS.CONTACT,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-1">
          <h2 className="text-2xl font-bold mb-3 transition-colors duration-300 sm:text-3xl md:text-4xl sm:mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">

          {/* Contact Info */}
          <div className="min-w-0">
            <h3 className="text-xl font-semibold mb-4 sm:text-2xl sm:mb-6">Contact Information</h3>
            <p className="text-gray-300 mb-5 text-sm sm:text-base sm:mb-6">
              Ready to light up your next event? Contact us today to discuss your requirements!
            </p>

            <div className="space-y-4">

              <div className="flex items-start mb-4">
                <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold">Our Location</h4>
                  <p className="text-gray-400">Chittinagar, Onetown, Vijayawada-9</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <FaPhone className="text-yellow-500 text-xl mr-4" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-400">+91 9642617098</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <FaEnvelope className="text-yellow-500 text-xl mr-4" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-400">akeventsandfireworks@gmail.com</p>
                </div>
              </div>

            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61584294129668" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                  <FaFacebook className="text-xl" />
                </a>

                <a href="https://whatsapp.com/channel/0029VbBCCipHltYDmRN5vN3x" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                  <FaWhatsapp className="text-xl" />
                </a>

                <a href="https://www.instagram.com/akeventsandfireworks" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                  <FaInstagram className="text-xl" />
                </a>

                <a href="https://www.youtube.com/channel/UCWyyejavZ6iWPAX0MFlgKzw" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                Error sending your message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input type="text" id="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input type="tel" id="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-md" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input type="email" id="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input type="text" id="subject" required
                  value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
                <textarea id="message" required rows="5"
                  value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-md"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-md">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
