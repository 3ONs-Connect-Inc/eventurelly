import { Link } from "react-router-dom";

export const termsLabel = (
    <>
      I agree to{" "}
      <Link to="#" className="text-primary font-bold">
        Policy
      </Link>{" "}
      and{" "}
      <Link to="#" className="text-primary font-bold">
        Terms and Conditions
      </Link>
    </>
  );
  