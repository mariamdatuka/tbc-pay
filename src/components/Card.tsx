import { useNavigate } from "react-router-dom";
const Card = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/form");
  };
  return (
    <>
      <section
        className="flex items-center justify-center h-36 p-3 sm:p-7 rounded-lg cursor-pointer font-semibold shadow-md bg-white hover:shadow-xl transition-shadow easy-in duration-300"
        onClick={handleNavigation}
      >
        <h1 className="text-darkBlue font-semibold text-lg sm:text-xl">
          დაიწყე ფორმის შევსება
        </h1>
      </section>
    </>
  );
};

export default Card;
