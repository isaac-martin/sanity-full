import React, { useState, useEffect } from "react";
import Hero from "./hero";
import InfoRows from "./InfoRows";
import CTAColumns from "./cta-columns";
import CTA from "./cta";
import Pricing from "./pricing";
import { TopWave, BottomWave } from "./wave";

// These will come from the SDK
const OptimizelyVariation = ({ children, isVariationActive }) => (
  <div>{isVariationActive && children}</div>
);
const OptimizelyExperiment = ({ children }) => <div>{children}</div>;

const Experiment = props => {
  const { variations, experimentId } = props;
  const variationsOpts = variations.map(vari => vari.variationID);
  // Pretend everything in here is using the experiment ID to fetch data from
  // split or optimizely or whatever
  const [experimentBucket, setExperimentBucket] = useState(null);

  const simulateExperimentData = () => {
    const random = Math.floor(Math.random() * Math.floor(variationsOpts.length));

    setExperimentBucket(variationsOpts[random]);
  };

  const buildData = data => {
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
  console.log("Props", props);

  return (
    <div className="pt-24">
      {experimentBucket ? (
        <>
          {variations.map(vari => (
            <button
              className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
              onClick={() => setExperimentBucket(vari.variationID)}
            >
              Set To {vari.variationID}
            </button>
          ))}
          <OptimizelyExperiment experiment={experimentId}>
            {variations.map(vari => (
              <OptimizelyVariation
                variaton={vari.variationID}
                // isVariationActive is a prop we use to simulate what the optimizely components do
                isVariationActive={vari.variationID === experimentBucket}
              >
                {buildData(vari.data)}
              </OptimizelyVariation>
            ))}
          </OptimizelyExperiment>
        </>
      ) : (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
      )}
    </div>
  );
};

export default Experiment;
