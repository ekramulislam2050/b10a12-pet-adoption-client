import img1 from "../../assets/Pet-Care-img/care-1.png"
import img2 from "../../assets/Pet-Care-img/care-2.png"
import Marquee from "react-fast-marquee";
const PetCareTipsDetails = () => {
    const petCareTips = [
        {
            title: "Regular Health Checkups",
            desc: "The first step to maintaining your pet’s health is regular veterinary checkups. Pets should visit the vet at least once or twice a year for illness detection, growth tracking, and dental health. Younger pets need more visits for vaccinations; older pets need checks for arthritis and other issues.",
            emoji: "🩺",
            tip: "To reduce vet anxiety, get your pet used to car rides and carriers early."
        },
        {
            title: "Proper Food and Water",
            desc: "Providing nutritious food and clean water is crucial. Diets should be suited to your pet’s age, breed, and health. Dogs need high protein and fiber, cats need taurine. Dehydration, especially in cats, can lead to kidney issues.",
            emoji: "🍲",
            tip: "Clean bowls daily and follow a regular feeding schedule."
        },
        {
            title: "Exercise and Play",
            desc: "Exercise is essential for both physical and mental health. Dogs need walks and games like fetch; cats enjoy toys like laser pointers. Active pets are healthier and better behaved.",
            emoji: "🎾",
            tip: "Spend at least 30 minutes playing daily to boost mental health and bonding."
        },
        {
            title: "Maintain Hygiene",
            desc: "Grooming helps prevent infections and keeps your pet comfortable. Regular brushing, bathing (as advised), nail trimming, ear cleaning, and dental care are all important. Also clean their bedding and litter boxes frequently.",
            emoji: "🧼",
            tip: "Clean pets = clean home + happy pet."
        },
        {
            title: "Vaccination and Medication",
            desc: "Vaccines protect your pet from deadly diseases. Start early and follow booster schedules. Deworming and tick/flea control are a must. Always maintain health records.",
            emoji: "💉",
            tip: "Keep a vaccination & medication diary to stay on track."
        },
        {
            title: "Love and Attention",
            desc: "Pets thrive on affection. Talk to, cuddle, and interact with your pet daily. Lack of attention can lead to anxiety and destructive behavior.",
            emoji: "❤️",
            tip: "Daily love builds trust, calmness, and joy in pets."
        },
        {
            title: "Avoid Harmful Items",
            desc: "Keep toxic foods (chocolate, onions, grapes), chemicals, and small/sharp objects away. These can poison or harm pets. Educate children too.",
            emoji: "🚫",
            tip: "Child-proof your home — for pets too!"
        },
        {
            title: "Comfortable Sleeping Space",
            desc: "A soft, quiet, draft-free space helps pets rest well. Sick or older pets may need special bedding. Sleep is vital for their mood and health.",
            emoji: "🛏️",
            tip: "Good rest = good health + behavior."
        }
    ];

    return (
        <div className="bg-[#fffcf0] flex flex-col items-center">
            <div className="flex flex-col items-center mt-5">
                <img src={img1} alt="img1" className="w-[20%]" />
                <h1 className="sm:text-5xl font-semibold font-[kapakana] text-[#e48d11] text-4xl">Pet Care Tips - Detailed Guide</h1>
                <img src={img2} alt="img2" className="w-[20%]" />
            </div>
            {/* marquee-------------- */}
            <Marquee speed={50}   className="py-5 ">
                <span className="text-3xl tracking-wide text-pink-500 sm:text-4xl ">
                    🐾 🐶 🐱 🐕 🐈 🐇 🦴 🛁 🛏️ 🥎 🧼 🧴 🩺 🍖 🥕 🐟 🍼 🍗 🍚 💧 👩‍⚕️ 👨‍⚕️ 🏥 🏡 🌿 💕 ❤️ 💖 💝 😻 😽 😸 🌈
                </span>
            </Marquee>
            <div className="grid   max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3  w-[95%] bg-[#fef2d0] py-5 px-10 rounded-xl">
                {
                    petCareTips.map((data, index) => <div key={index} className="p-6 text-center text-gray-800 transition shadow-md bg-[#ffffff] bg-opacity-90 rounded-xl hover:shadow-lg ">
                        <span className="text-4xl"> {data.emoji}</span>
                        <h1 className="mb-2 text-xl font-semibold">{data.title}</h1>
                        <p className="text-sm text-gray-600">{data.desc}</p>
                        <p className="text-sm text-gray-600">{data.tip}</p>
                    </div>)
                }

            </div>




        </div>
    );
};

export default PetCareTipsDetails;