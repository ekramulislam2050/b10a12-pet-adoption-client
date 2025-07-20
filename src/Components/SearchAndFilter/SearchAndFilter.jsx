import { useEffect, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchAndFilter = ({ availablePets }) => {
    const [searchTxt, setSearchTxt] = useState("")
    const [category, setCategory] = useState("All")
    const [filterResult, setFilterResult] = useState([])
    const [descending, setDescending] = useState(true)
    const [sort, setSort] = useState([])
    // search handler--------
    const handleChange = (e) => {
        const text = e.target.value
        setSearchTxt(text)
    }

    //   filtering-------------
    useEffect(() => {
        const result = availablePets.filter(pet => {
            const searchedPet = pet.name.toLowerCase().includes(searchTxt.toLowerCase())
            const petCategory = category === "All" || pet.category === category
            return searchedPet && petCategory
        }

        )
        setFilterResult(result)
    }, [searchTxt, category])

    // sorting--------------
    useEffect(() => {
        const result = [...filterResult].sort((a, b) => {
            return descending
                ? new Date(b.postedDate) - new Date(a.postedDate)
                : new Date(a.postedDate) - new Date(b.postedDate)

        })
        setSort(result)
    }, [filterResult, descending])



    return (
        <div >
            <h1 className=" text-5xl flex justify-center text-[#A47149] font-[kapakana] font-semibold tracking-wide py-5">
                📦Available <span className="mt-2 ml-3 font-sans text-2xl text-red-500 animate-ping">{category}</span>
            </h1>
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
                    <input type="search" required placeholder="Search" onChange={handleChange} />
                </label>
            </div>
            <div className="flex justify-between px-1 py-3 ">
                {/* category dropdown--------------- */}
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="m-1 text-md btn">Category ⬇️</div>
                    <ul tabIndex={0} className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52">
                        <li><a onClick={() => setCategory("All")}>All</a></li>
                        <li><a onClick={() => setCategory("Cat")}>Cats</a></li>
                        <li><a onClick={() => setCategory("Dog")}>Dogs</a></li>
                        <li><a onClick={() => setCategory("Rabbit")}>Rabbits</a></li>
                        <li><a onClick={() => setCategory("Fish")}>Fish</a></li>
                    </ul>
                </div>

                {/* sort icon------------- */}
                <div className="btn" onClick={() => setDescending(!descending)}>
                    <FaSortAmountDown className="text-xl text-blue-500 " />Sort
                </div>

            </div>
            {/* available now section--------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    sort.length > 0 ? (
                        sort.map((pet, index) => <div key={index} className="mb-5">
                            <div className='flex justify-center h-full '>
                                <div className=" w-[90%] shadow-xl card border border-[#F3D6C2] bg-white hover:border-[#A47148]  group  h-full " >
                                    <div className=" card-body">
                                        {/* img------------------ */}

                                        <div className='w-full h-[200px] px-10  '>
                                            <img src={pet.image} alt="petImg" className='object-cover w-full h-full rounded-xl' />
                                        </div>

                                        {/* pet name--------------- */}
                                        <div>
                                            <p className='text-5xl font-semibold text-center text-[#A47149]  font-[kapakana] group-hover:font-sans transition-all duration-500 group-hover:text-4xl'>{pet.name}</p>
                                            <p className="text-lg">🎂 Age: {pet.age}</p>
                                            <p className="text-lg">📍 Location: {pet.location}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className='flex justify-start text-2xl font-semibold text-orange-600 font-[kapakana] tracking-wide'>📅 {pet.postedDate.split("T")[0]}</span>
                                            <Link to={`/petDetails/${pet._id}`}>
                                                <span className='flex justify-end text-xl text-blue-600 cursor-pointer animate-bounce hover:underline'>  👉 Details</span>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>)
                    ) : (
                        <div className="col-span-3 mt-10 text-2xl font-semibold text-center text-red-500 ">
                            <h2 className="text-5xl animate-bounce">  ❌Pet not found</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SearchAndFilter;