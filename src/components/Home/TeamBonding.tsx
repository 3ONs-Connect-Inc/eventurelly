import Card from "../ui/Card";

const TeamBonding: React.FC<{ handleNavigation: (title: string) => void }> = ({
  handleNavigation,
}) => {
  return (
    <div className=" flex flex-col items-center  py-10">
      <div className="w-full  bg-secondary  mx-auto py-10  rounded-lg flex flex-col  items-center gap-10">
        <div className="flex flex-col items-center justify-center text-center ">
          <h2 className="text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8   font-bold mb-4 ">
            Elevate Your Team Bonding Experience
          </h2>
          <p className="font-normal text-base  md:text-xl max-sm:text-tiny">
            Choose your account type to get started
          </p>
        </div>

        <div className="flex flex-wrap justify-center max-md:-mt-4">
          <Card
            image="/images/ppl/p1.jpeg"
            title="Corporate Admin"
            description="Manage your company's event operations effortlessly."
            buttonText="Next"
           scale
            imageClassName="rounded-full w-24 h-24"
            textAlignment="center"
            onClick={() => handleNavigation("Corporate Admin")}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamBonding;
