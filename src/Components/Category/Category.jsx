
import cat from "../../assets/category icon/icons8-cat-face-48.png"
import dog from "../../assets/category icon/icons8-dog-100.png"
import rabbit from "../../assets/category icon/icons8-rabbit-48.png"
import fish from "../../assets/category icon/icons8-fish-60.png"

import { Link } from "react-router-dom"
import Heading from "../Heading/Heading"

const Category = () => {
  return (
    <div className="py-10 text-center">
           <Heading headingMsg={'Explore Your Cute Pet Categories'}></Heading>
      {/* category card-------------------- */}
      <div className="flex justify-center gap-1">

        {/* cats------------- */}
        <div className="tooltip">
          <div className="rounded-full tooltip-content bg-lime-800">
            <div className="text-xl text-orange-100 animate-bounce -rotate-10">
              Click to see Cats
            </div>
          </div>
          <Link to={"/cats"}>
            <div className="avatar ">
              <div className=" w-20 md:w-24 mask mask-hexagon-2 bg-[#628136] hover:bg-lime-600">
                <img src={cat} className="w-full p-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* dogs------------- */}
        <div className="tooltip">
          <div className="rounded-full tooltip-content bg-lime-800">
            <div className="text-xl text-orange-100 animate-bounce -rotate-10">Click to see dogs</div>
          </div>
          <Link to={"/dogs"}>
            <div className="avatar ">
              <div className=" w-20 md:w-24 mask mask-hexagon-2 bg-[#628136] hover:bg-lime-600">
                <img src={dog} className="w-full p-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* fish------------- */}
        <div className="tooltip">
          <div className="rounded-full tooltip-content bg-lime-800">
            <div className="text-xl text-orange-100 animate-bounce -rotate-10">Click to see Fish</div>
          </div>
          <Link to={"/fish"}>
            <div className="avatar ">
              <div className="w-20 md:w-24 mask mask-hexagon-2 bg-[#628136] hover:bg-lime-600">
                <img src={fish} className="w-full p-5" />
              </div>
            </div>
          </Link>
        </div>


        {/* rabbit------------- */}
        <div className="tooltip">
          <div className="rounded-full bg-lime-800 tooltip-content">
            <div className="text-xl text-orange-100 animate-bounce -rotate-10">Click to see Rabbits</div>
          </div>
          <Link to={"/rabbits"}>
            <div className="avatar ">
              <div className=" w-20 md:w-24 mask mask-hexagon-2 bg-[#628136] hover:bg-lime-600">
                <img src={rabbit} className="w-full p-5" />
              </div>
            </div>
          </Link>
        </div>


      </div>
    </div>

  );
};

export default Category;