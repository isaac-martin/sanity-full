import React, { useState, useEffect } from "react";
import Hero from "./hero";
import InfoRows from "./InfoRows";
import CTAColumns from "./cta-columns";
import CTA from "./cta";
import Pricing from "./pricing";
import { TopWave, BottomWave } from "./wave";

const Experiment = props => {
  // Pretend everything in here is using the experiment ID to fetch data from
  // split or optimizely or whatever
  const [experimentBucket, setExperimentBucket] = useState(null);

  const simulateExperimentData = () => {
    const random1or2 = Math.floor(Math.random() * Math.floor(2));

    setExperimentBucket(random1or2 === 1 ? "control" : "experiment");
  };

  const buildData = (experimentBucket, experiment, control) => {
    const data = experimentBucket === "control" ? control : experiment;
    return data
      .filter(c => !c.disabled)
      .map((c, i) => {
        let el = null;
        switch (c._type) {
          case "pricing":
            el = <Pricing key={c._key} {...c} />;
            break;
          case "infoRows":
            el = <InfoRows key={c._key} {...c} />;
            break;
          case "hero":
            el = <Hero key={c._key} {...c} />;
            break;
          case "experiment":
            el = <Experiment key={c._key} {...c} />;
            break;
          case "ctaColumns":
            el = <CTAColumns key={c._key} {...c} />;
            break;
          case "ctaPlug":
            el = <CTA key={c._key} {...c} />;
            break;
          case "uiComponentRef":
            switch (c.name) {
              case "topWave":
                el = <TopWave />;
                break;
              case "bottomWave":
                el = <BottomWave />;
                break;
              default:
                break;
            }
            break;
          default:
            el = null;
        }
        return el;
      });
  };

  useEffect(() => {
    const experiement = setTimeout(() => {
      simulateExperimentData();
      console.log("Experiment Data Fetched After 1 second");
    }, 1000);
    return () => clearTimeout(experiement);
  }, []);

  console.log("Experiment Value", experimentBucket);

  const { control, experiment } = props;
  return (
    <div className="pt-24">
      {experimentBucket ? (
        <>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setExperimentBucket("experiment")}
          >
            Set To Experiment
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setExperimentBucket("control")}
          >
            Set To Control
          </button>
          {buildData(experimentBucket, experiment, control)}
        </>
      ) : (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
      )}
    </div>
  );
};

export default Experiment;
