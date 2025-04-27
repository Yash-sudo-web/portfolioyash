import React, { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <hr />
      <div className="m-auto max-w-[1176px]">
        <hr className="w-[25%] border-b-8" />
        <div className="flex custom:gap-40 max-custom:justify-evenly pb-[3%] pt-[3%]">
          <div className="text-white flex flex-col gap-1 custom:w-[30%]">
            <div
              className="text-5xl max-custom:text-3xl pb-1"
              style={{ fontFamily: "monospace" }}
            >
              Yash Mathur
            </div>
            <div
              className="text-2xl max-custom:text-xl custom:pl-[25%]"
              style={{ fontFamily: "monospace" }}
            >
              Full-Stack Developer
            </div>
          </div>
          <div
            style={{ fontFamily: "monospace" }}
            className="max-custom:hidden text-white w-[55%] flex justify-between pl-4 pt-7"
          >
            <a
              href="#about"
              className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
            >
              about
            </a>
            <a
              href="#projects"
              className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              projects
            </a>
            <a
              href="#contact"
              className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right"
            >
              contact me
            </a>
          </div>
          <div
            style={{ fontFamily: "monospace" }}
            className="custom:hidden text-white flex flex-col items-start gap-4 pt-4"
          >
            <div
              className="block md:hidden cursor-pointer text-2xl"
              onClick={toggleMenu}
            >
              ☰
            </div>
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col items-start gap-4 transition-all duration-300`}
            >
              <a
                href="#about"
                className="relative text-[18px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
              >
                about
              </a>
              <a
                href="#projects"
                className="relative text-[18px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              >
                projects
              </a>
              <a
                href="#contact"
                className="relative text-[18px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right"
              >
                contact me
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
