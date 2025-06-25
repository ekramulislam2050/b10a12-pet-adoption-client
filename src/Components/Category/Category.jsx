
import cat from "../../assets/category icon/icons8-cat-face-48.png"
import dog from "../../assets/category icon/icons8-dog-100.png"
import rabbit from "../../assets/category icon/icons8-rabbit-48.png"
import fish from "../../assets/category icon/icons8-fish-60.png"
import leaf from "../../assets/logo/leaf213.jpg"

const Category = () => {
  return (



    <div className="py-10 text-center">


      <div className="relative flex justify-center md:h-[130px]  items-center mt-8">
        <h2 className="text-[#A47149] font-semibold text-center  mb-8 text-4xl md:text-7xl absolute -top-9 "
          style={{ fontFamily: "kapakana,sens-serif" }}
        >Explore Your Cute Pet Categories</h2>

        <img src={leaf} alt="leaf" className='h-full' />
      </div>





      {/* name of each tab group should be unique */}
      <div className="justify-center tabs tabs-lift">
        <label className="tab">
          <input type="radio" name="my_tabs_4" />
          <img src={cat} className="w-[30px]" />
          <span className="text-[#A47149] font-semibold text-[16px]">Cats</span>
        </label>
        <div className="p-6 tab-content bg-base-100 border-base-300">Tab content 1</div>

        <label className="tab">
          <input type="radio" name="my_tabs_4" defaultChecked />
          <img src={dog} className="w-[30px]" />
          <span className="text-[#A47149] font-semibold text-[16px]">dogs</span>
        </label>
        <div className="p-6 tab-content bg-base-100 border-base-300">Tab content 2</div>

        <label className="tab">
          <input type="radio" name="my_tabs_4" />
          <img src={rabbit} className="w-[30px]" />
          <span className="text-[#A47149] font-semibold text-[16px]">Rabbit</span>
        </label>
        <div className="p-6 tab-content bg-base-100 border-base-300">Tab content 3</div>
        <label className=" tab">
          <input type="radio" name="my_tabs_4" />
          <img src={fish} className="w-[30px]" />
          <span className="text-[#A47149] font-semibold text-[16px]">Fish</span>
        </label>
        <div className="p-6 tab-content bg-base-100 border-base-300">Tab content 4</div>
      </div>
    </div>

  );
};

export default Category;