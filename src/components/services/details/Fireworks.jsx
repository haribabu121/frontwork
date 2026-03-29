import React from 'react';
import { FaFire } from 'react-icons/fa';
import ServiceDetail from './ServiceDetail';

const Fireworks = () => {
  const features = [
    'Breathtaking aerial displays',
    'Synchronized pyrotechnic shows',
    'Cold pyro for indoor events',
    'Confetti cannon finales',
    'Custom choreography to music'
  ];

  const idealFor = [
    {
      title: 'Wedding Receptions',
      description: 'End your celebration with a bang'
    },
    {
      title: 'New Year\'s Eve',
      description: 'Ring in the new year with a spectacular show'
    },
    {
      title: 'Corporate Events',
      description: 'Make your brand launch unforgettable'
    },
    {
      title: 'Festivals',
      description: 'Light up the night sky for large audiences'
    }
  ];

  return (
    <ServiceDetail
      title="High-Impact Fireworks"
      description="Light up the sky with our breathtaking fireworks displays. From intimate gatherings to large-scale events, we create custom pyrotechnic shows that leave lasting impressions."
      features={features}
      idealFor={idealFor}
      icon={FaFire}
      iconBgColor="bg-red-50"
      iconTextColor="text-red-500"
      buttonBgColor="bg-yellow-500"
      buttonHoverColor="hover:bg-yellow-600"
    />
  );
};

export default Fireworks;
