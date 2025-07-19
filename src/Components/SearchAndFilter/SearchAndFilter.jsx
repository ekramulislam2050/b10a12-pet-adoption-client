import { FaSortAmountDown } from "react-icons/fa";

const SearchAndFilter = () => {
    return (
        <div >
            {/* search field---------------- */}
            <div className="flex justify-center">
                <label className=" input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" required placeholder="Search" />
                </label>
            </div>
            <div className="flex justify-between px-1 py-3 ">
                {/* category dropdown--------------- */}
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="m-1 text-md btn">Category ⬇️</div>
                    <ul tabIndex={0} className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>

                {/* sort icon------------- */}
                <div className="btn">
                    <FaSortAmountDown className="text-xl text-blue-500 " />Sort
                </div>

            </div>
        </div>
    );
};

export default SearchAndFilter;