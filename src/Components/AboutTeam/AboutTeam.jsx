

const AboutTeam = () => {
    const teamMembers = [
        {
            name: "Jhankar Mahbub",
            role: "CEO",
            img: "https://i.ibb.co/9kjs2qFW/Screenshot-59.png",
            bio: "Visionary leader with a strong passion for animal welfare. Jhonkar founded this platform to create a safe space for pets and animal lovers to connect and care."
        },
        {
            name: "Abdur Rkib",
            role: "COO",
            img: "https://i.ibb.co/CK8kNX0x/Screenshot-61.png",
            bio: "Expert in Node.js and MongoDB, building scalable backend systems for animal welfare solutions."
        },
        {
            name: "Md Shakil Ahammad Atik",
            role: "Senior Web Instructor",
            img: "https://i.ibb.co/jk2x0M4S/Screenshot-62.png",
            bio: "Creates intuitive interfaces that bring emotional connection between people and pets."
        },
        {
            name: "F M Zahidul Islam",
            role: "Web Instructor",
            img: "https://i.ibb.co/PX2wFNQ/Screenshot-64.png",
            bio: "Loves to build beautiful, responsive interfaces using React and Tailwind CSS."
        }
    ];

    return (
        <div className="px-4 py-10 mx-auto max-w-7xl">
            <h2 className="mb-8 text-5xl font-bold text-center text-[#65a30d]">👥 <b className="font-[kapakana] text-5xl">Meet Our Team</b></h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-md lg:flex-row-reverse"
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            className="object-cover w-40 h-40 rounded-full shadow-lg aspect-square"
                        />
                        <div className="space-y-1 text-center lg:text-left">
                            <p><b>Name:</b> {member.name}</p>
                            <p><b>Role:</b> {member.role}</p>
                            <p><b>Bio:</b> {member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AboutTeam;