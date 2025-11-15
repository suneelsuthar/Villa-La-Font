// @ts-ignore
import React from "react";
import { FiCalendar } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoMdCard } from "react-icons/io";


const Stepper = ({ steps, currentStep }:any) => {
  return (
    <div className="b-steps d-flex align-items-center mb-5">
      {steps.map((step:any, index:any) => (
        <React.Fragment key={index}>
          <div className="steps-section">
            <div
              className={`b-step ${
                index === currentStep ? "b-active" : "steps"
              } ${index < currentStep ? "b-completed" : ""}`}
            >
              {index === 0 && (
                <FiCalendar
                  fontSize={20}
                  // color={index === currentStep ? "#2C3E50" : "#99A1AF"}
                />
              )}
              {index === 1 && (
                <FiUser
                  fontSize={20}
                  // color={index === currentStep ? "#2C3E50" : "#99A1AF"}
                />
              )}
              {index === 2 && (
                <IoMdCard
                  fontSize={20}
                  // color={index === currentStep ? "#2C3E50" : "#99A1AF"}
                />
              )}
              {/* <div className="b-step-number">{index + 1}</div> */}
            </div>
            <div className="b-step-text">{step}</div>
          </div>

          {index < steps.length - 1 && <div className="b-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
