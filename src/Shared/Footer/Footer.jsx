import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/logo.png.png'

const Footer = () => {

    const links = <>

        <li className="hover:text-[#A47149]"><NavLink to={"/"}>Home</NavLink></li>
        <li className="hover:text-[#A47149]"><NavLink to={"/petListing"}>PetListing</NavLink></li>
        <li className="hover:text-[#A47149]"><NavLink to={"/donationCampaigns"}>Donation Campaigns</NavLink></li>
       <li className="hover:text-[#A47149]"><NavLink >Contact</NavLink></li>

    </>
    return (
        <footer className="bg-[#FADADD] text-[#333333] py-8 mt-10 border-t border-[#A47149]/20">
            <div className="grid grid-cols-1 gap-8 px-4 mx-auto text-sm max-w-7xl md:grid-cols-3">
                <div>
                    <img src={logo} alt="adoptNest logo" className="w-14 h-14 border shadow-md border-[#A47149] rounded-full   object-contain p-1" />
                    <h2 className="text-lg font-bold text-[#A47149] mb-2">AdoptNest</h2>
                    <p>Find homes for animals with love.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-[#A47149] mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                       {links}
                       
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-[#A47149] mb-2">Contact Us</h3>
                    <p>Email: hello@adoptnest.com</p>
                    <p>Phone: +880-1234-567890</p>
                    <p>Location: Dhaka, Bangladesh</p>
                </div>
            </div>
            <div className="text-center text-xs mt-6 text-[#555]">
                © {new Date().getFullYear()} AdoptNest. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
