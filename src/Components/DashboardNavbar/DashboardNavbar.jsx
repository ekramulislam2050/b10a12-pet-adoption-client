

const DashboardNavbar = () => {
    return (
        <div className="shadow-sm navbar bg-gradient-to-l from-[#0e5a4d] to-[#054560]    ">
            <div className="navbar-start">
            
            </div>
            <div className="navbar-center">
                <a className="text-xl text-[#ffffff]  btn-ghost">User Dashboard</a>
            </div>
            <div className="navbar-end ">
                <div className="dropdown text-[#ffffff]  ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="right-0 p-2 mt-3 shadow menu menu-sm dropdown-content  bg-[#0e5a4d]  rounded-box z-1 w-52 border border-[#07c19f]">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default DashboardNavbar;