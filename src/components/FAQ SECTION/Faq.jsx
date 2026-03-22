import React, { Component } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

const FeatureSection = [
  {
    question: "What services does AK Events & Fireworks offer?",
    answer:
      "AK Events & Fireworks provides complete event management solutions, including venue decoration, stage setups, sound and lighting, event coordination, and premium fireworks displays for weddings, corporate events, festivals, and private celebrations.",
  },
  {
    question: "Are your fireworks safe and legal?",
    answer:
      "Yes. All fireworks used by AK Events & Fireworks are government-approved and handled by licensed professionals. We follow strict safety protocols and ensure full compliance with local regulations to guarantee a safe and spectacular show.",
  },
  {
    question:
      "How far in advance should I book your services?",
    answer:
      "We recommend booking our services at least 4-6 weeks in advance, especially for larger events or during peak seasons. This allows us to plan and customize the event according to your preferences and ensure availability.",
  },
  {
    question: "Do you customize fireworks and event decorations?",
    answer:
      "Absolutely! Whether you want a themed decoration setup or a personalized fireworks show synchronized with music, our team customizes every detail according to your event style, theme, and budget.",
  },
  {
    question:
      "What is the pricing for your event and fireworks packages?",
    answer:
      "Pricing depends on factors such as the event type, location, decoration requirements, and the intensity/duration of the fireworks display. We offer flexible packages for all budgets. You can request a free quote, and our team will guide you with the best options.",
  },
];

class FAQSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openIndex: null,
    };
  }

  toggleFAQ = (index) => {
    this.setState((prevState) => ({
      openIndex: prevState.openIndex === index ? null : index,
    }));
  };

  render() {
    const { openIndex } = this.state;

    return (
      <div id="faq" className="relative flex flex-wrap items-center justify-between gap-8 px-4 py-12 bg-white overflow-hidden sm:gap-10 sm:px-6 sm:py-14 md:px-8 lg:gap-12 lg:px-[6%] lg:py-16 lg:flex-nowrap scroll-mt-24">

        {/* Background Circles */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-sky-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-10 right-16 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-cyan-200 rounded-full blur-3xl opacity-40"></div>

        {/* Left Section */}
        <div className="w-full lg:w-3/5 relative z-10 order-1 lg:order-none">
          <div className="inline-block bg-yellow-400 text-white px-4 py-2 rounded-md font-semibold mb-4 shadow-md">
            Untangle Your Queries
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xl sm:text-base">
            Find answers to all your questions, learn about our software, its
            working and other related information instantly.
          </p>

          <div className="flex flex-col gap-4">
            {FeatureSection.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md hover:yellow-200 transition"
              >
                <button
                  onClick={() => this.toggleFAQ(index)}
                  className="w-full px-5 py-4 text-left font-medium text-gray-900 hover:text-yellow-600 flex items-center gap-3"
                >
                  {openIndex === index ? (
                    <FaMinusSquare className="text-yellow-500 text-xl" />
                  ) : (
                    <FaPlusSquare className="text-yellow-500 text-xl" />
                  )}
                  <span>{faq.question}</span>
                </button>

                {openIndex === index && (
                  <div className="px-5 pb-4 pl-12 bg-gray-50 text-gray-600 text-sm leading-relaxed border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="order-0 relative z-10 mb-8 flex w-full justify-center lg:order-none lg:mb-0 lg:w-2/5">
          <img
            src="https://empmonitor.com/wp-content/uploads/2024/06/Frame-2062.webp"
            alt="FAQ illustration"
            className="h-auto w-full max-w-[min(100%,22rem)] rounded-xl object-cover transition-transform hover:scale-105 sm:max-w-sm lg:max-w-md xl:max-w-lg"
          />
        </div>
      </div>
    );
  }
}

export default FAQSection;
