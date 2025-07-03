//**
// *.bg-[#FFF1F4]
// * formik and Yup
//  */


import leaf from "../../assets/logo/leaf213.jpg";

const Heading = ({ headingMsg }) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 mt-8">
      {/* Text */}
      <h2
        className="text-[#A47149] font-semibold text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4"
        style={{ fontFamily: "kapakana, sans-serif" }}
      >
        {headingMsg}
      </h2>

      {/* Image */}
      <img
        src={leaf}
        alt="leaf"
        className="w-full max-w-[600px] h-auto object-contain"
      />
    </div>
  );
};

export default Heading;



