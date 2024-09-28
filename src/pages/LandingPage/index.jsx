import HeroComponent from "../../components/Hero";
import NavbarComponent from "../../components/Navbar";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <HeroComponent className="flex-grow" />
    </div>
  );
};

export default LandingPage;
