import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useIconColor } from "../../hooks/useIconColor";

const TeamBonding: React.FC<{ handleNavigation: (title: string) => void }> = ({
  handleNavigation,
}) => {
  const { textColor } = useIconColor();
  
  return (
    <div className="flex flex-col items-center py-10 px-6 max-xs:px-0">
      <div className="w-full bg-pink  mx-auto py-10 px-6 rounded-lg flex flex-col items-center gap-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8   font-bold mb-4 ">
            Elevate Your Team Bonding Experience
          </h2>
          <p className="font-normal text-base  md:text-xl max-sm:text-tiny">
            Choose your account type to get started
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-md:-mt-4">
          <Card
            image="/images/ppl/p1.jpeg"
            title="Corporate Admin"
            description="Manage your company's event operations effortlessly."
            buttonText="Next"
            imageClassName="rounded-full w-24 h-24"
            textAlignment="center"
            onClick={() => handleNavigation("Corporate Admin")}
          />

          <Card
            image="/images/ppl/p2.jpeg"
            title="Corporate Member"
            description="Join your company's event team and collaborate seamlessly."
            buttonText="Next"
            imageClassName="rounded-full w-24 h-24"
            textAlignment="center"
            onClick={() => handleNavigation("Corporate Member")}
          />
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-15">
        <h2
          className={` ${textColor} text-4xl  font-bold max-sm:text-big max-xs:text-mid mb-4`}
        >
          Join our team as an Event Architect
        </h2>
        <Link to="#">
          <Button
            label="Join Now"
            className="bg-white rounded-lg border text-black border-border-gray hover-effect "
          />
        </Link>
      </div>
    </div>
  );
};

export default TeamBonding;
