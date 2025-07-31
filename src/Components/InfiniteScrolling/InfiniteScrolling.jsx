import { motion, useScroll } from "framer-motion";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import DonationCampaignsUi from "../DonationCampaignsUI/DonationCampaignsUi";


const InfiniteScrolling = ({ data, type }) => {
  // console.log(availablePets)
  const { scrollYProgress } = useScroll()

  return (
    <div>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 2,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
          zIndex: 50,
        }}
      />
      <Content data={data} type={type} />
    </div>
  );
};

export default InfiniteScrolling;

/**
 * ==============   Utils   ================
 */

function Content({ data, type }) {
  return (
    <div className="flex flex-col ">
      {type === "availablePets" && (
        <SearchAndFilter data={data}></SearchAndFilter>
      )}
      {type === "cdcData" && (
        <DonationCampaignsUi data={data}></DonationCampaignsUi>
      )}

    </div>
  )
}
