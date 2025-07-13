import { motion } from "framer-motion";


const OurMission = () => {
  return (
    <div className="mb-10">
      <h2 className="mt-5 text-4xl text-center">🌟<b className="font-[kapakana] text-5xl text-[#607f33]"> Our Mission</b></h2>
      <div style={container} className="grid grid-cols-1 gap-8 px-4 py-16 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          
        {infoData.map(({ emoji, hueA, hueB, title, desc }, i) => (

          <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={i} title={title} desc={desc} />

        ))}
      </div>
    </div>



  )
}

function Card({ emoji, hueA, hueB, i, title, desc }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}

    >
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants}  >
        <div className="flex flex-col items-center">
          <div className="mb-4 text-6xl">{emoji}</div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 ">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{desc}</p>
          </div>
        </div>


      </motion.div>
    </motion.div>
  )
}

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const hue = (h) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container = {
  margin: "-60px  auto",
  maxWidth: 1200,
  paddingBottom: 100,
  width: "100vw",



}

const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
  fontSize: 164,
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
}

/**
 * ==============   Data   ================
 */



const infoData = [
  {
    emoji: "❤️",
    title: "Care for Every Life",
    desc: "We believe every animal deserves love, care, and a second chance.",
    hueA: 340,
    hueB: 10
  },
  {
    emoji: "🌱",
    title: "Sustainable Adoption",
    desc: "We promote responsible and sustainable pet adoption in every home.",
    hueA: 20,
    hueB: 40
  },
  {
    emoji: "🤝",
    title: "Community First",
    desc: "We engage and educate our community to make lasting change.",
    hueA: 60,
    hueB: 90
  },
  {
    emoji: "🐾",
    title: "Pawtection",
    desc: "We ensure all pets get a safe and loving environment to thrive.",
    hueA: 80,
    hueB: 120
  },
  {
    emoji: "🏡",
    title: "Home for All",
    desc: "Our goal is to find a forever home for every rescued pet.",
    hueA: 100,
    hueB: 140
  },
  {
    emoji: "📚",
    title: "Educate & Empower",
    desc: "We believe in empowering people with knowledge about pet care.",
    hueA: 205,
    hueB: 245
  },
  {
    emoji: "🚑",
    title: "Medical Help",
    desc: "We provide medical support for abandoned and sick animals.",
    hueA: 260,
    hueB: 290
  },
  {
    emoji: "🔄",
    title: "Rescue & Rehabilitate",
    desc: "We rescue, treat, and rehome abandoned pets with care.",
    hueA: 290,
    hueB: 320
  }
];



export default OurMission;



