import React, { useState, useEffect } from "react";
import PageBuilder from "./PageBuilder";

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

  useEffect(() => {
    const experiement = setTimeout(() => {
      simulateExperimentData();
      console.log("Experiment Data Fetched After 1 second");
    }, 1000);
    return () => clearTimeout(experiement);
  }, []);

  console.log("Experiment Value", experimentBucket);

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
                <PageBuilder data={vari.data} />
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
