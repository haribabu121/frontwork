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
    title: "Production & Logistics Manager",
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
  const { image, name, title, linkedin } = member;

  return (
    <div className="group relative text-center p-4">
      {/* Photo Container */}
      <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full group-hover:shadow-lg transition-all duration-300">
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-110" : ""
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

      {/* Name with Yellow Underline */}
      <div className="relative inline-block mb-1">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <div className="h-1 w-12 bg-green-500 mx-auto mt-2 mb-3"></div>
      </div>

      {/* Title */}
      <p className="text-gray-600 text-sm font-medium">{title}</p>
    </div>
  );
};

const ExecutiveTeam = () => {
  return (
    <section id="executive-team" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="group">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-yellow-500 transition-colors duration-300">Executive Team</h2>
            <div className="group relative">
              <div className="w-24 h-1.5 mx-auto mb-6 transform origin-left transition-all duration-500 group-hover:scale-x-125 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-size-200 group-hover:bg-pos-0 bg-pos-100"></div>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With more than two decades of expertise in the IT sector, our
            executive leadership team provides strategic direction and
            proven industry insight.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTeam;
