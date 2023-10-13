import React, { useState, useEffect } from "react";
// import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import CountryService from "../../services/Countryservice";

const UpdateCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const initialValues = {
    countryname: "",
    countrycode: "",
    countryid: 0,
    status: 0,
    createdby: null,
    createdon: null,
    modifiedby: null,
    modifiedon: null,
  };

  const [countryData, setCountryData] = useState(initialValues);
  // const [StateData, setStateData]= useState(initialValues);

  useEffect(() => {
    if (id) {
      console.log("If success:" + id);
      let reqdata = { Countryid: id };
      CountryService.CreateInitialize(reqdata)
        .then((response) => {
          // Handle the successful response
          console.log(response.data);
          console.log(response.data.countryMasterOneList);
          setCountryData(response.data.countryMasterOneList[0]);
          //const { statename, statecode, countryid, status, modifiedby, modifiedon} = response.data.stateList;

          // Set countryData using the destructured variables
          //Formik.setValues({statename, statecode, countryid, status, modifiedby, modifiedon});
        })
        .catch((error) => {
          // Handle the error
          console.error("Error:", error);
          setMessage("Error: Unable to fetch state data.");
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    // Map the status value to the database values
    //const mappedStatusValue = values.status === 1 ? 'Active' : 'Inactive';

    try {
      let reqData = { CountryMasterOne: values };
      console.log("Request Data:", reqData);

      const response = await CountryService.Update(reqData);
      console.log(response);
      console.log(response.data);

      if (response.status === 200 && response.data.transtatus.result) {
        if (window.confirm("Country updated successfully")) {
          navigate("/CountryList");
        } else {
          setMessage("Country updated successfully");
        }
        // Optionally, you can redirect to a different page or update the UI as needed
      } else {
        console.error("Error: Unable to update Country");
        setMessage("Error: Unable to update Country");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error: Unable to update Country");
    }
  };

  // const formik = Formik ({
  //   initialValues,
  //   onSubmit:handleSubmit
  // });

  return (
    <div className="container mt-5">
      <div className="col-md-6">
        <h4>Update Country</h4>
        <Formik
          initialValues={countryData}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Other form fields */}
              <div className="mb-3">
                <label htmlFor="countryname" className="form-label">
                  Country Name
                </label>
                <Field
                  type="text"
                  id="countryname"
                  name="countryname"
                  className="form-control"
                  placeholder="Enter country name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="countryid" className="form-label">
                  Country Code
                </label>
                <Field
                  type="text"
                  id="countrycode"
                  name="countrycode"
                  className="form-control"
                  placeholder="Enter Country Code"
                />
              </div>
              {/* 
            <div className="mb-3">
              <label htmlFor="countryid" className="form-label">
                Country ID
              </label>
              <Field
                type="text"
                id="countryid"
                name="countryid"
                className="form-control"
                placeholder="Enter Country ID"
              />
            </div> */}

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className="form-control"
                >
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </Field>
              </div>
              {/* 
            <div className="mb-3">
              <label htmlFor="modifiedby" className="form-label">
                Modified by
              </label>
              <Field
                type="text"
                id="modifiedby"
                name="modifiedby"
                className="form-control"
              />
            </div> */}
              {/* 
            <div className="mb-3">
              <label htmlFor="modifiedon" className="form-label">
                Modified on
              </label>
              <Field
                type="datetime-local"
                id="modifiedon"
                name="modifiedon"
                className="form-control"
              />
            </div> */}
            <div class="text-center">
              <button
                type="submit"
                className="btn btn-primary spaced-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              
              <button
          className="btn btn-secondary spaced-button"
          onClick={() => navigate("/countrylist")}
        >
          Back to Country List
        </button>
        </div>
            </Form>
          )}
        </Formik>
        <p>{message}</p>
        
      </div>
    </div>
  );
};

export default UpdateCountry;

