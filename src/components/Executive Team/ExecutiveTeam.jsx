import React, { useState } from 'react';
// import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './ExecutiveTeam.css';
import dpImage from "./dp.jpg";
const teamMembers = [
  {
    name: "Ankam Durga ",
    title: "Founder & Managing Director",
    image: dpImage,
    linkedin: "#",
  },
  {
    name: "Ankam Haribabu",
    title: "Operations Director",
    image: "https://img.freepik.com/premium-vector/beautiful-professional-man-character-vector-illustration_1287271-88114.jpg?w=2000",
    linkedin: "#",
  },
  {
    name: "Devi",
    title: "Event Manager",
    image: "https://static.vecteezy.com/system/resources/previews/034/488/032/large_2x/3d-cute-cartoon-woman-character-cartoon-businesswoman-wearing-red-suit-on-transparent-background-png.png",
    linkedin: "#",
  },
  {
    name: "Chaitanya",
    title: "Operations & Logistics Manager",
    image: "https://png.pngtree.com/png-vector/20241113/ourlarge/pngtree-professional-woman-using-laptop-png-image_14418003.png",
    linkedin: "#",
  },
  {
    name: "Ankam Jhansi",
    title: "Creative & Design Manager",
    image: "https://www.kindpng.com/picc/m/140-1403886_office-girl-cartoon-png-transparent-png.png",
    linkedin: "#",
  },
  //  {
  //   name: "parvathi",
  //   title: "Board Member",
  //   image: "https://img.freepik.com/premium-photo/young-girl-hr-3d-character-young-working-girl-cartoon-character-professional-girl-character_1002350-2147.jpg?w=2000",
  //   linkedin: "#",
  // },
  //  {
  //   name: "Sekhar",
  //   title: "Board Member",
  //   image: "https://static.vecteezy.com/system/resources/previews/030/690/466/non_2x/office-worker-2d-cartoon-illustraton-on-white-background-h-free-photo.jpg",
  //   linkedin: "#",
  // },
];

const FALLBACK_IMAGE = "https://via.placeholder.com/200x200.png?text=Team+Member";

const TeamMember = ({ member }) => {
  const [hovered, setHovered] = useState(false);
  const { image, name, title } = member;

  return (
    <div className="group relative">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-6 text-center border border-gray-100 hover:border-blue-300 hover:shadow-blue-200/50">
        {/* Photo Container */}
        <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full ring-4 ring-gray-200 group-hover:ring-blue-400 transition-all duration-300">
          <img
            src={image || FALLBACK_IMAGE}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              hovered ? "scale-110 brightness-110" : ""
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          
          {/* LinkedIn Icon - Appears on Hover */}
          {/* {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-blue-600 hover:text-white"
            >
              <FaLinkedin className="text-xl" />
            </a>
          )} */}
        </div>

        {/* Name with Gradient Underline */}
        <div className="relative inline-block mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{name}</h3>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
        </div>

        {/* Title */}
        <p className="text-gray-600 text-sm font-medium leading-relaxed">{title}</p>
      </div>
    </div>
  );
};

const ExecutiveTeam = () => {
  return (
    <section id="executive-team" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 px-1">
          <div className="group">
            <h2 className="text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-500 sm:text-4xl md:text-5xl sm:mb-6">
              Executive Members
            </h2>
            <div className="group relative">
              <div className="w-24 sm:w-32 h-1.5 sm:h-2 mx-auto mb-6 sm:mb-8 transform origin-center transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm leading-relaxed font-medium sm:text-base md:text-lg">
            With more than two decades of expertise in the IT sector, our
            executive leadership team provides strategic direction and
            proven industry insight to drive innovation and excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTeam;
