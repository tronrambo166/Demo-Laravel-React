import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';

const AddService = ({ connected, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    location: '',
    lat: '',
    lng: '',
    details: '',
    image: null,
    pin: null,
    identification: null,
    video: null,
    document: null,
    link: ''
  });
  const [messages, setMessages] = useState({ success: '', error: '' });
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0]
      }));
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle uploads
  const handleUploadImage = async () => {
    if (!formData.image) return;
    const data = new FormData();
    data.append('image', formData.image);

    try {
      await axios.post('/upload/image', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUploadPin = async () => {
    if (!formData.pin) return;
    const data = new FormData();
    data.append('pin', formData.pin);

    try {
      await axios.post('/upload/pin', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading pin:', error);
    }
  };

  const handleUploadIdentification = async () => {
    if (!formData.identification) return;
    const data = new FormData();
    data.append('identification', formData.identification);

    try {
      await axios.post('/upload/identification', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading identification:', error);
    }
  };

  const handleUploadVideo = async () => {
    if (!formData.video) return;
    const data = new FormData();
    data.append('video', formData.video);

    try {
      await axios.post('/upload/video', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleUploadDocument = async () => {
    if (!formData.document) return;
    const data = new FormData();
    data.append('document', formData.document);

    try {
      await axios.post('/upload/document', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call individual upload handlers
    await Promise.all([
      handleUploadImage(),
      handleUploadPin(),
      handleUploadIdentification(),
      handleUploadVideo(),
      handleUploadDocument()
    ]);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'image' && key !== 'pin' && key !== 'identification' && key !== 'video' && key !== 'document') {
        data.append(key, formData[key]);
      }
    });

    try {
      console.log(Array.from(data.entries())); // Log form data as an array
      const response = await axios.post('/create-service', data);
      setMessages({ success: response.data.success || '', error: '' });
      navigate('/some-page'); // Replace '/some-page' with the desired path
    } catch (error) {
      setMessages({ success: '', error: error.response?.data?.error || 'An error occurred' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Success Message */}
      {messages.success && (
        <div className="bg-blue-100 text-blue-700 border border-blue-300 rounded-lg px-4 py-3 mb-4">
          <p className="font-semibold">{messages.success}</p>
          <button
            type="button"
            className="float-right text-blue-500 hover:text-blue-700"
            onClick={() => setMessages({ ...messages, success: '' })}
          >
            &times;
          </button>
        </div>
      )}

      {/* Error Message */}
      {messages.error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-4">
          <p className="font-semibold">{messages.error}</p>
          <button
            type="button"
            className="float-right text-red-500 hover:text-red-700"
            onClick={() => setMessages({ ...messages, error: '' })}
          >
            &times;
          </button>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4 text-center">Add Service</h3>

      {connected === 0 ? (
        <div className="w-full max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <p className="text-center text-gray-700 mb-4">
            Before adding a business, you must onboard to Jitume Stripe platform to receive business milestone payments.
          </p>
          <a
            href={`/connect-stripe/${userId}`}
            className="block text-center bg-gray-200 border border-gray-400 rounded py-2 px-4 hover:bg-gray-300"
          >
            Connect to Stripe
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Service Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Service Title"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Price*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Price"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Services*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="" disabled hidden>Select a category</option>
                <option value="Business Planning">Business Planning</option>
                <option value="IT">IT</option>
                <option value="Legal Project Management">Legal Project Management</option>
                <option value="Branding and Design">Branding and Design</option>
                <option value="Auto">Auto</option>
                <option value="Finance, Accounting & Tax Marketing">Finance, Accounting & Tax Marketing</option>
                <option value="Tax Marketing">Tax Marketing</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Project/Asset Management">Project/Asset Management</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Enter a location..."
              />
              <input type="hidden" name="lat" value={formData.lat} />
              <input type="hidden" name="lng" value={formData.lng} />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Details*</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              rows="4"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Provide details about your service"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Service Image*</label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              {formData.image && (
                <section>
                  File details:
                  <ul>
                    <li>Name: {formData.image.name}</li>
                    <li>Type: {formData.image.type}</li>
                    <li>Size: {formData.image.size} bytes</li>
                  </ul>
                </section>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Service Pin*</label>
              <input
                id="pin"
                type="file"
                name="pin"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              {formData.pin && (
                <section>
                  File details:
                  <ul>
                    <li>Name: {formData.pin.name}</li>
                    <li>Type: {formData.pin.type}</li>
                    <li>Size: {formData.pin.size} bytes</li>
                  </ul>
                </section>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Identification*</label>
              <input
                id="identification"
                type="file"
                name="identification"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              {formData.identification && (
                <section>
                  File details:
                  <ul>
                    <li>Name: {formData.identification.name}</li>
                    <li>Type: {formData.identification.type}</li>
                    <li>Size: {formData.identification.size} bytes</li>
                  </ul>
                </section>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Business Video*</label>
              <input
                id="video"
                type="file"
                name="video"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              {formData.video && (
                <section>
                  File details:
                  <ul>
                    <li>Name: {formData.video.name}</li>
                    <li>Type: {formData.video.type}</li>
                    <li>Size: {formData.video.size} bytes</li>
                  </ul>
                </section>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Additional Document*</label>
            <input
              id="document"
              type="file"
              name="document"
              onChange={handleFileChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {formData.document && (
              <section>
                File details:
                <ul>
                  <li>Name: {formData.document.name}</li>
                  <li>Type: {formData.document.type}</li>
                  <li>Size: {formData.document.size} bytes</li>
                </ul>
              </section>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Additional Link*</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter URL"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </form>
      )}
    </div>
  );
};

export default AddService;
