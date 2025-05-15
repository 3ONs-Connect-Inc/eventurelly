import { Link, useNavigate } from "react-router-dom";
import { footerLinks } from "../../data";
import { useColor } from "../hooks/ui/useColor";
import Logo from "./navbar/Logo";
import Button from "./ui/Button";
import { useAppSelector } from "../hooks/redux";

const Footer: React.FC<{ showButtons: boolean }> = ({ showButtons }) => {
  const { textColor, bgColor, pColor } = useColor();
  const { isLoggedIn } = useAppSelector((state) => state.user)
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/?scrollTo=teamBonding");
  };
  
  return (
    <footer
      className={`${bgColor} ${textColor}  flex items-center justify-center `}
    >
      <div className="w-full max-w-7xl py-10 px-6 ">
        {/* Top Section */}
        {showButtons && (
          <div className="bg-footer-foreground mx-auto py-10 px-6   text-center flex flex-col items-center justify-center rounded-lg">
            <h2 className="text-white text-big max-md:text-mid font-bold mb-4">
              Let’s build stronger, happier teams together!
            </h2>
            <p className="text-secondary-foreground font-normal text-xl mb-6 max-md:text-base max-sm:text-tiny">
              Boost team bonding, engagement, and satisfaction with
              unforgettable experiences that strengthen connections and improve
              retention.
            </p>
            {/* Buttons */}

            <div className="flex max-xs:flex-col flex-row justify-center gap-4">
              {isLoggedIn ? (
                <Link to="/demo-request">
                  <Button
                    label="Request a demo"
                    className="bg-primary text-white px-4 py-2 cursor-pointer hover-effect text-base max-sm:text-tiny font-semibold"
                  />
                </Link>
              ) : (
                <>
                  <Link to="/demo-request">
                    <Button
                      label="Request a demo"
                      className="bg-white text-foreground px-4 py-2 cursor-pointer hover-effect text-base max-sm:text-tiny font-semibold"
                    />
                  </Link>

                  <Button
                     onClick={handleGetStarted}
                      label="Get started"
                      className="bg-primary text-white px-4 py-2 text-base cursor-pointer bg-hover max-sm:text-tiny font-semibold"
                    /> 
                </>
              )}
            </div>
          </div>
        )}

        {/* Footer Content */}
        <div className={`${textColor}  mx-auto mt-10 flex flex-col gap-8`}>
          {/* Logo and Links Section */}
          <div className="w-full flex flex-wrap md:flex-nowrap items-center md:items-start gap-6">
            {/* Logo Section */}
            <div className="w-full md:w-1/4 flex justify-start md:justify-start">
              <Logo />
            </div>
            {/* Links Section */}
            <div className="w-full md:w-3/4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center sm:text-left">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h1
                    className={`${textColor} font-bold  text-base max-xs:text-tiny mb-2`}
                  >
                    {section.title}
                  </h1>
                  {section.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className={`${textColor} hover:text-primary cursor-pointer font-normal block text-base max-sm:text-tiny`}
                    >
                      {link.name === "Hybrid" ||
                      link.name === "United States" ? (
                        <>
                          {link.name}{" "}
                          <span className="text-green-700 bg-green-200 px-2 py-1 font-medium rounded-lg text-tiny ">
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
        <div className="border-t border-border-foreground my-6  mx-auto"></div>

        {/* Bottom Section */}
        <div className=" mx-auto  flex flex-col md:flex-row justify-between text-center md:text-left ">
          <p
            className={`${pColor} font-normal  text-base max-sm:text-tiny max-xs:hidden`}
          >
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
