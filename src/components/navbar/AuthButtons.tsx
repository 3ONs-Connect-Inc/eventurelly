import { Link } from "react-router-dom";
import Button from "../ui/Button";

const AuthButtons = ({ handleLogout, isLoggedIn }: { handleLogout: () => void; isLoggedIn: boolean }) => (
    <>
      {isLoggedIn ? (
        <Button
          label="Log Out"
          onClick={handleLogout}
          className="bg-primary text-white font-semibold rounded-lg font-inter border border-border-gray bg-hover cursor-pointer"
        />
      ) : (
        <div className="flex gap-4">
          <Link to="/sign-in">
            <Button
              label="Log In"
              className="text-primary bg-white rounded-lg border font-semibold font-inter border-border-gray hover-effect cursor-pointer"
            />
          </Link>
          <Link to="/sign-up">
            <Button
              label="Sign Up"
              className="bg-primary text-white border-0 rounded-lg font-semibold font-inter  bg-hover cursor-pointer"
            />
          </Link>
        </div>
      )}
    </>
  );
  export default AuthButtons;