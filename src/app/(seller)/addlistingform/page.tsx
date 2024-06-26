"use client";
import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepOne from "../../components/steps/step1";
import StepTwo from "../../components/steps/step2";
import StepThree from "../../components/steps/step3";
import { profileApiservive } from "@/app/apiService";
import { useSelector, useDispatch } from "react-redux";
import sellermiddleware from "../sellermiddleware";
import { toast } from "react-toastify";
const steps = ["Listing detail", "Images Upload", "Location Add"];

const HorizontalNonLinearStepper = () => {
  const token = useSelector((state: any) => state.auth.token.access);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [formData, setFormData] = useState<any>({
    title: "",
    address: "",
    city: "",
    description: "",
    extrafacility: "",
    rental_choice: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    sale_type: "",
    home_type: "",
    country: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value; 

    if (name === "bedrooms" || name === "bathrooms") {
      const parsedValue = parseFloat(value);
      if (parsedValue < 1 || parsedValue > 10) {
        toast.error(
          `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must be between 1 and 10`
        );
        return; 
      }
      newValue = parsedValue; 
    }

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: newValue,
    }));
    if (name === "price") {
      const parsedValue = parseFloat(value);
      if (parsedValue < 1000 || parsedValue > 1000000000) {
        toast.error("Price must be between 1000 and 1000000000");
        return;
      }
      newValue = parsedValue;
    }
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData: any) => ({
        ...prevData,
        [fieldName]: file,
      }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => {
      const newFormData = {
        ...prev,
      };
      newFormData[name] = value;
      return newFormData;
    });
  };
  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () =>
    Object.keys(completed).length === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    if (isLastStep()) {
      sendDataToBackend();
    } else {
      handleNext();
    }
  };

  const sendDataToBackend = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await profileApiservive.post(
        "/app2/ManageListingView/",
        formDataToSend,
        token
      );
      if (response.data) {
        toast.success("successfully created");
      }
    }catch (error: any) {
      if (error?.response?.data) {
        const responseData: Record<string, string[]> = error.response.data.error;
        const errorMessages = Object.entries(responseData)
          .map(([key, value]: [string, string[] | string]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(", ")}`;
            } else {
              return `${key}: ${value}`;
            }
          })
          .join("\n");
        toast.error(errorMessages);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
    
    
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        className="shadow-md shadow-[#7ab7da] bg-white w-full h-10"
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}></Typography>

            <div className="flex items-center justify-center h-full mt-13">
              <Button
                onClick={handleReset}
                className="bg-sky-800 text-white p-2 "
              >
                Reset
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep === 0 && (
                <StepOne formData={formData} handleChange={handleChange} />
              )}
              {activeStep === 1 && (
                <StepTwo handleImageChange={handleImageChange} />
              )}
              {activeStep === 2 && (
                <StepThree
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }} variant="outlined">
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    onClick={handleComplete}
                    variant="outlined"
                    color="success"
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};

export default sellermiddleware(HorizontalNonLinearStepper);
