import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

const AddBusiness = () => {
  const [formData, setFormData] = useState({
    pinFile: null,
    idFile: null,
    financialFile: null,
    documentsFile: null,
    videoFile: null,
    videoLink: "",
    reasonForFunding: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allRequiredFilled = [
      formData.pinFile,
      formData.idFile,
      formData.financialFile,
      formData.documentsFile,
      formData.videoFile,
      formData.videoLink,
      formData.reasonForFunding,
    ].every((field) => field !== null && field !== "");

    setIsFormValid(allRequiredFilled);
  }, [formData]);

  const handleFileChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("pinFile", formData.pinFile);
    data.append("idFile", formData.idFile);
    data.append("financialFile", formData.financialFile);
    data.append("documentsFile", formData.documentsFile);
    data.append("videoFile", formData.videoFile);
    data.append("videoLink", formData.videoLink);
    data.append("reasonForFunding", formData.reasonForFunding);

    console.log("Form data submitted:", formData);
  };

  const [isFeeSet, setIsFeeSet] = useState(false);
  const [coverFile, setCoverFile] = useState(null);

  const handleSwitchChange = () => {
    setIsFeeSet(!isFeeSet);
  };

  const handleFileChangeCover = (e) => {
    setCoverFile(e.target.files[0]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Add Business</h2>
        <h3 className="text-md font-semibold mb-3 dark:text-gray-300">
          Business Information
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Inputs */}
          {[
            {
              label: "Business Title",
              type: "text",
              placeholder: "Business Title*",
            },
            { label: "Contact", type: "text", placeholder: "Contact*" },
            {
              label: "Yearly Turnover",
              type: "text",
              placeholder: "Yearly Turnover*",
            },
            { label: "Email", type: "email", placeholder: "Email (Optional)" },
            { label: "Location", type: "text", placeholder: "Location*" },
            {
              label: "Director's Passport/ID No.",
              type: "text",
              placeholder: "Director's Passport/ID No.*",
            },
            { label: "Share", type: "text", placeholder: "Share" },
            {
              label: "Individual/Company Tax PIN",
              type: "text",
              placeholder: "Individual/Company Tax PIN*",
            },
          ].map((input, idx) => (
            <div className="flex flex-col" key={idx}>
              <label className="text-xs font-medium dark:text-gray-200">
                {input.label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                required={input.label !== "Email" && input.label !== "Share"}
              />
            </div>
          ))}

          {/* Select Input */}
          <div className="flex flex-col">
            <label className="text-xs font-medium dark:text-gray-200">
              Select Category*<span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
              required
            >
              <option value="" disabled hidden>
                Select Category*
              </option>
              <option value="Business Planning">Business Planning</option>
              <option value="IT">IT</option>
              <option value="Legal Project Management">
                Legal Project Management
              </option>
              <option value="Branding and Design">Branding and Design</option>
              <option value="Auto">Auto</option>
              <option value="Finance, Accounting & Tax Marketing">
                Finance, Accounting & Tax Marketing
              </option>
              <option value="Tax Marketing">Tax Marketing</option>
              <option value="Public Relations">Public Relations</option>
              <option value="Project/Asset Management">
                Project/Asset Management
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Textarea Input */}
          <div className="flex flex-col">
            <label className="text-xs font-medium dark:text-gray-200">
              Details*<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Details*"
              className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
              required
            />
          </div>

          {/* File Input */}
          <div className="flex flex-col">
            <label className="text-xs font-medium dark:text-gray-200">
              Cover*<span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg flex items-center justify-between mt-1 dark:bg-gray-900 transition-all duration-200">
              <span className="dark:text-white text-sm">
                {coverFile ? coverFile.name : "Cover*"}
              </span>
              <label
                htmlFor="upload-cover"
                className="flex items-center cursor-pointer"
              >
                <FiUpload className="text-lg dark:text-gray-300" />
                <input
                  id="upload-cover"
                  type="file"
                  className="hidden"
                  required
                  onChange={handleFileChangeCover}
                />
              </label>
            </div>
          </div>

          {/* Conditional Rendering for Amount */}
          {isFeeSet && (
            <div className="flex flex-col">
              <label className="text-xs font-medium dark:text-gray-200">
                Amount
              </label>
              <input
                type="text"
                placeholder="Amount"
                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
              />
            </div>
          )}

          {/* Toggle Switch */}
          <div className="col-span-2 flex items-center space-x-4 mt-4">
            <label className="text-xs font-medium dark:text-gray-200">
              Set fee for investors to view your full business data?
            </label>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="fee-switch"
                checked={isFeeSet}
                onChange={handleSwitchChange}
                className="sr-only"
              />
              <label
                htmlFor="fee-switch"
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`relative w-10 h-5 rounded-full border transition-colors duration-300 ${
                    isFeeSet
                      ? "bg-dark-green border-dark-green"
                      : "bg-light-green border-light-green"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-green rounded-full shadow transform transition-transform duration-300 ${
                      isFeeSet ? "translate-x-full" : ""
                    }`}
                  />
                </div>
                <span className="ml-2 text-sm dark:text-gray-200">
                  {isFeeSet ? "Yes" : "No"}
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Upload Fields */}
          {[
            { label: "PIN Certificate", field: "pinFile" },
            { label: "ID/Passport", field: "idFile" },
            { label: "Financial Statements", field: "financialFile" },
            { label: "Documents", field: "documentsFile" },
            { label: "Video (if applicable)", field: "videoFile" },
          ].map((fileInput, idx) => (
            <div className="flex flex-col" key={idx}>
              <label className="text-xs font-medium dark:text-gray-200">
                {fileInput.label}
                <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg flex items-center justify-between mt-1 dark:bg-gray-900 transition-all duration-200">
                <span className="dark:text-white text-sm">
                  {formData[fileInput.field]
                    ? formData[fileInput.field].name
                    : fileInput.label}
                </span>
                <label
                  htmlFor={`upload-${fileInput.field}`}
                  className="flex items-center cursor-pointer"
                >
                  <FiUpload className="text-lg dark:text-gray-300" />
                  <input
                    id={`upload-${fileInput.field}`}
                    type="file"
                    className="hidden"
                    required
                    onChange={(e) => handleFileChange(e, fileInput.field)}
                  />
                </label>
              </div>
            </div>
          ))}

          {/* Video Link */}
          <div className="flex flex-col col-span-2">
            <label className="text-xs font-medium dark:text-gray-200">
              Video Link (Optional)
            </label>
            <input
              type="text"
              name="videoLink"
              placeholder="Video Link (Optional)"
              value={formData.videoLink}
              onChange={handleInputChange}
              className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
            />
          </div>

          {/* Reason for Funding */}
          <div className="flex flex-col col-span-2">
            <label className="text-xs font-medium dark:text-gray-200">
              Reason for Funding*
            </label>
            <textarea
              name="reasonForFunding"
              placeholder="Reason for Funding*"
              value={formData.reasonForFunding}
              onChange={handleInputChange}
              className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
              required
            />
          </div>

          <div className="col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className={`btn btn-primary py-2 px-10 max-w-xs rounded-full ${
                isFormValid ? "" : "cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
