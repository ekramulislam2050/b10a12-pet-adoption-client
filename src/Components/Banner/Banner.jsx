import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import poster1 from "../../assets/poster2/8007710.jpg"
import poster2 from "../../assets/poster2/3881996.jpg"
import poster3 from "../../assets/poster2/5503177.jpg"
import poster4 from "../../assets/poster2/6819370.jpg"



const Banner = () => {

    return (


        <Carousel showArrows={true} >
            {/* poster-1------------- */}
            <div style={{ width: "100%", height: "70vh", background: "#fff0d3", }}>
                <img src={poster1} style={{
                    height: "100%", width: "100%", objectFit: "contain"
                }} />

            </div>
            {/*  poster2------------------- */}
            <div style={{ width: "100%", height: "70vh", background: "#486cda", }}>
                <img src={poster2} style={{ height: "100%", width: "100%", objectFit: "contain" }} />

            </div>
            {/*  poster3-------------- */}
            <div style={{ width: "100%", height: "70vh", background: "#ffcc57" }}>
                <img src={poster3} style={{ height: "100%", width: "100%", objectFit: "contain" }} />

            </div>
          

            {/*  poster4--------------------- */}
            <div style={{ width: "100%", height: "70vh", background: "#f3e5da" }}>
                <img src={poster4} style={{ height: "100%", width: "100%", objectFit: "contain" }} />

            </div>

           

        </Carousel>


    );
};

export default Banner;