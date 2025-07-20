import { motion, useScroll } from "framer-motion";
 
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";


const InfiniteScrolling = ({ availablePets }) => {
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
      <Content availablePets={availablePets} />
    </div>
  );
};

export default InfiniteScrolling;

/**
 * ==============   Utils   ================
 */

function Content({ availablePets }) {
  return (
    <div className="flex flex-col ">
     
      {/* search and filter------------------- */}
       <SearchAndFilter availablePets={availablePets}></SearchAndFilter>
      
    </div>
  )
}
