import Icon from "./Icon";
import VercelLogo from "~icons/logos/vercel.jsx";

const Footer = () => {
  return (
    <div className="w-20 h-20 bg-red-700">
      <Icon height="25" icon="ic:round-facebook" width="25" />
      testing
      <VercelLogo fill="currentColor" height={16} width={72} />
    </div>
  );
};

export default Footer;
