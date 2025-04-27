import React, { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://portfolioyashmailer.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Email sent successfully");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <hr />
      <div className="text-center text-white m-auto max-w-[1176px] pt-24">
        <h1
          id="contact"
          className="text-5xl"
          style={{ fontFamily: "monospace" }}
        >
          <strong>CONTACT ME</strong> TO BRING YOUR
          <br />
          <em>
            VISION TO <strong>SUCCESSFUL</strong> FRUITION.
          </em>
        </h1>
      </div>
      <div className="relative m-auto max-w-[1176px] flex justify-center items-start gap-16 custom:gap-32 pt-6 custom:pt-20 pb-16 custom:pb-24 max-custom:flex-col max-custom:items-center">
        <div className="text-white text-xl font-nova-flat max-w-[50%] pt-2 max-custom:text-center">
          With hands-on experience in building scalable, high-performance
          applications and contributing to open-source projects, I specialize in
          full-stack development using MERN, Golang, and cloud-native solutions.
          <br />
          <br />
          I've developed core products from scratch, engineered robust real-time
          systems, and optimized applications to handle tens of thousands of
          concurrent users, while ensuring good test coverage with tools
          like Jest and Playwright.
          <br />
          <br />
          Whether it's crafting dynamic web platforms, building microservices,
          or enhancing system efficiency through automation and Docker
          deployments, I bring adaptability, problem-solving skills, and a deep
          technical foundation to every project.
          <br />
          <br />
          Currently open to SDE roles, internships, and collaboration
          opportunities. Feel free to reach out — let's bring innovative ideas
          to life together.
        </div>

        <div className="border rounded max-custom:p-6">
          <form onSubmit={handleSubmit} className=" p-6 rounded shadow-md w-80">
            <div className="mb-4">
              <label className="block mb-2 text-white">Name:</label>
              <input
                onChange={handleChange}
                required
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Email:</label>
              <input
                onChange={handleChange}
                required
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Message:</label>
              <textarea
                onChange={handleChange}
                required
                id="message"
                name="message"
                rows="4"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
