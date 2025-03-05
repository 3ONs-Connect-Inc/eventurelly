import { footerLinks } from "../../data";
import { useIconColor } from "../hooks/useIconColor";
import Logo from "./navbar/Logo";
import Button from "./ui/Button";

const Footer = () => {
  const { textColor, bgColor, pColor } = useIconColor();

  return (
    <footer
      className={`${bgColor} ${textColor}  flex items-center justify-center max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16`}
    >
      <div className="w-full max-w-7xl py-10 px-6 ">
        {/* Top Section */}
        <div className="bg-bg-footer mx-auto py-10 px-6   text-center flex flex-col items-center justify-center rounded-lg">
          <h2 className="text-white text-big max-md:text-mid font-bold mb-4">
            Let’s build stronger, happier teams together!
          </h2>
          <p className="text-gray-light font-normal text-xl mb-6 max-md:text-base max-sm:text-tiny">
            Boost team bonding, engagement, and satisfaction with unforgettable
            experiences that strengthen connections and improve retention.
          </p>
          {/* Buttons */}
          <div className="flex max-xs:flex-col flex-row justify-center gap-4">
            <Button
              label="Request a demo"
              className="bg-white text-gray px-4 py-2 cursor-pointer hover-effect text-base max-sm:text-tiny font-semibold"
            />
            <Button
              label="Get started"
              className="bg-primary text-white px-4 py-2 text-base cursor-pointer bg-hover max-sm:text-tiny font-semibold"
            />
          </div>
        </div>

        {/* Footer Content */}
        <div className={`${textColor}  mx-auto mt-10 flex flex-col gap-8`}>
          {/* Logo and Links Section */}
          <div className="w-full flex flex-wrap md:flex-nowrap items-center md:items-start gap-6">
            {/* Logo Section */}
            <div className="w-full md:w-1/4 flex justify-start md:justify-start">
              <Logo  />
            </div>
            {/* Links Section */}
            <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h1
                    className={`${pColor} semi-bold font-normal text-tiny mb-2`}
                  >
                    {section.title}
                  </h1>
                  {section.links.map((link, index) => (
                     <a
                     key={index}
                     href={link.url}
                      className={`${textColor} hover:text-primary cursor-pointer font-normal block text-base max-sm:text-tiny`}
                    >
                      {link.name === "Solutions" ? (
                        <>
                          {link.name}{" "}
                          <span className="text-green-700 bg-green-200 px-2 py-1 font-medium rounded-lg text-tiny">
                            New
                          </span>
                        </>
                      ) : (
                        link.name
                      )}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Divider Line */}
        <div className="border-t border-border-gray my-6  mx-auto"></div>

        {/* Bottom Section */}
        <div className=" mx-auto flex flex-col md:flex-row justify-between text-center md:text-left ">
          <p className={`${pColor} font-normal  text-base max-sm:text-tiny max-xs:hidden`}>
            Boost Team Bonding & Employee Engagement Today!
          </p>
          <p className={`${pColor} font-normal  text-base max-sm:text-tiny`}>
            © 2025 Eventurelly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
