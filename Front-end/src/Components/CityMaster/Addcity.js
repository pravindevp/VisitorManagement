import axios from "axios";
import React, { useState, useEffect } from "react"; // Add useState and useEffect
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddCity = () => {
  const navigate = useNavigate();
  const [plant, setPlant] = useState([]); // Define plant state

  useEffect(() => {
    // Fetch plant data when the component mounts
    async function fetchPlantData() {
      try {
        const response = await axios.get("https://localhost:7252/api/Plant"); // Assuming you have an endpoint to fetch plant data
        setPlant(response.data); // Update the plant state with the fetched data
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    }

    fetchPlantData();
  }, []);

  return (
    <div className="Container mt-5">
      <div className="col-md-6">
        <h4>Create City</h4>

        <Formik
          initialValues={{
            cityname: "",
            citycode: "",
            plantid: "", // Add plantid field
            status: "",
          }}
          validationSchema={Yup.object({
            cityname: Yup.string().required("City Name is required"),
            citycode: Yup.number()
              .typeError("City Code must be a number")
              .required("City Code is required"),
            plantid: Yup.number() // Validate plantid as a number
              .typeError("Plant ID must be a number")
              .required("Plant ID is required"),
            status: Yup.number()
              .typeError("Status must be a number")
              .required("Status is required"),
          })}
          onSubmit={async (values) => {
            try {
              let reqData = { CityMaster: values };
              console.log(reqData);
              const response = await axios.post(
                "https://localhost:7252/api/City/Create",
                reqData
              );
              console.log(response);
              if (response.data && response.data.success) {
                alert("City saved successfully");
                console.log("City saved successfully");
                // Optionally, you can redirect to a different page or update the UI as needed
              } else {
                console.error("Error: Unable to save city");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="cityname" className="form-label">
                  City Name
                </label>
                <Field
                  type="text"
                  id="cityname"
                  name="cityname"
                  className="form-control"
                  placeholder="Enter City Name"
                />
                <ErrorMessage
                  name="cityname"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="citycode" className="form-label">
                  City Code
                </label>
                <Field
                  type="number"
                  id="citycode"
                  name="citycode"
                  className="form-control"
                  placeholder="Enter City Code"
                />
                <ErrorMessage
                  name="citycode"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="countryid" className="form-label">
                  country id 
                </label>
                <Field
                  as="select"
                  id="plantid"
                  name="plantid"
                  className="form-control"
                >
                  <option value="">Select Plant</option>
                  {plant.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <Field
                  type="number"
                  id="status"
                  name="status"
                  className="form-control"
                  placeholder="Enter Status"
                />
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/citylist")}
                >
                  Back to City List
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCity;
