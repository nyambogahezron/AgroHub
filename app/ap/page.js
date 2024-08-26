import Navbar from '../../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div class='main' id='mainContent'>
        <h1>Unlocking Carbon Removal on a Gigaton Scale</h1>
        <p>
          Boomitra uses satellite and AI technology to measure, report, and
          verify soil carbon credits across the globe.
        </p>
        <p>Lets work together to scale climate action.</p>
        <div class='cta-buttons'>
          <button>Project Partners</button>
          <button>Carbon Credit Buyers</button>
          <button>Growers</button>
        </div>
      </div>
      <div class='features-section'>
        <h2>OUR TECHNOLOGY</h2>
        <p>Boomitra is transforming the future of soil carbon.</p>
        <p>
          Our hardware-free process ushers in the next generation of
          high-quality, cost-efficient, and scalable soil carbon credits – an
          essential part of mitigating climate change.
        </p>
        <div class='features'>
          <div class='feature'>
            {/* <img src="satellite.png" alt="Satellite"> */}
            <h3>
              100+ Multispectral Satellites combined with ground truth data
            </h3>
          </div>
          <div class='feature'>
            {/* <img src="ai.png" alt="AI"> */}
            <h3>Proprietary AI and deep learning predictions</h3>
          </div>
          <div class='feature'>
            {/* <img src="plant.png" alt="Plant"> */}
            <h3>
              Remote measurement of soil organic carbon, moisture and nutrient
              levels (NPK)
            </h3>
          </div>
        </div>
        <a href='#' class='learn-more'>
          Learn more →
        </a>
      </div>
      {/* <!-- Why Boomitra Section --> */}
      <section class='why-boomitra'>
        <h1>Why Boomitra?</h1>
        <div class='features'>
          <div class='feature'>
            {/* <img src="certificate-icon.png" alt="Third-party certified credits icon"> */}
            <h2>Third-party certified credits</h2>
            <p>
              Every credit sold undergoes third-party certification against the
              highest international standards for nature-based carbon removal
              credits.
            </p>
          </div>
          <div class='feature'>
            {/* <img src="farmer-icon.png" alt="Farmer-First Revenue Model icon"> */}
            <h2>Farmer-First Revenue Model</h2>
            <p>
              The majority of revenue generated from the sale of each credit
              goes directly to the farmer, rancher, or landowner – the key
              drivers of carbon sequestration.
            </p>
          </div>
          <div class='feature'>
            {/* <img src="access-icon.png" alt="Accessible to All Farms icon"> */}
            <h2>Accessible to All Farms</h2>
            <p>
              We work with landowners of all sizes to make carbon finance
              accessible, from 0.5-acre smallholder farms to large ranches of
              100,000+ acres and all sizes in between.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
