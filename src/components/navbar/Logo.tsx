import { Link } from "react-router-dom";


interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <Link to="/" className={className}>
    <img
      src="/images/logo/logo-blk.png"
      alt="Logo"
      loading="lazy"
      className="h-10 md:h-8 lg:h-10 dark:hidden max-xs:w-[150px] max-xs:h-auto"
    />
    <img
      src="/images/logo/logo-wte.png"
      alt="Logo"
      loading="lazy"
      className="h-10 md:h-8 lg:h-10 hidden max-xs:w-[150px] dark:block max-xs:h-auto"
    />
  </Link>
);

export default Logo;
