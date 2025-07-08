import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findTemplateById } from '../data/templates';
import NotFoundPage from './NotFoundPage';

function FormPage() {
  // --- HOOKS AT THE TOP LEVEL ---
  const { templateId } = useParams();
  const [formData, setFormData] = useState({
    heroHeader: '',
    heroSubHeader: '',
    heroText: '',
    email: '',
    phoneNumber: '',
    images: [],
    videos: [],
  });
  const [errors, setErrors] = useState({});

  // --- NON-HOOK LOGIC AND ROUTE VALIDATION ---
  const template = findTemplateById(templateId);



  // --- REAL-TIME VALIDATION FOR REQUIRED FIELDS ---
  // This effect now watches the email and phone number fields.
  useEffect(() => {
    const newErrors = { ...errors };

    // If an error for 'email' exists and the user has typed something, clear the error.
    if (newErrors.email && formData.email.trim() !== '') {
      delete newErrors.email;
    }

    // If an error for 'phoneNumber' exists and the user has typed something, clear the error.
    if (newErrors.phoneNumber && formData.phoneNumber.trim() !== '') {
      delete newErrors.phoneNumber;
    }

    // Update the errors state only if an error was cleared.
    if (Object.keys(newErrors).length !== Object.keys(errors).length) {
        setErrors(newErrors);
    }
  }, [formData.email, formData.phoneNumber, errors]); // Updated dependency array

  if (!template) {
    return <NotFoundPage />;
  }
  // --- EVENT HANDLERS ---
  const handleTextChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // --- NEW VALIDATION LOGIC ---
    // Check if email is empty.
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    }

    // Check if phone number is empty.
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    }

    // Set the errors to trigger UI updates.
    setErrors(newErrors);

    // If there are any errors, stop the submission process.
    if (Object.keys(newErrors).length > 0) {
      console.error('Validation failed:', newErrors);
      alert('Please fill out all required fields.');
      return;
    }

    // --- ON SUCCESS ---
    console.log('--- Form Submission Data ---');
    console.log('Template Chosen:', template.label, `(ID: ${template.id})`);
    console.log('Form Data:', formData);
    alert('Form data successfully logged to the console!');
  };

  // --- RENDER THE FORM ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to All Templates
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold capitalize mb-2">{template.label} Content Form</h1>
          <p className="text-gray-600 mb-8">Fill out the details below to populate your template.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="space-y-6 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-800">Hero Section</h2>
              {/* Text fields remain the same */}
              <div>
                <label htmlFor="heroHeader" className="block mb-2 font-medium text-gray-700">Hero Header</label>
                <input id="heroHeader" name="heroHeader" type="text" onChange={handleTextChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label htmlFor="heroSubHeader" className="block mb-2 font-medium text-gray-700">Hero Sub Header</label>
                <input id="heroSubHeader" name="heroSubHeader" type="text" onChange={handleTextChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label htmlFor="heroText" className="block mb-2 font-medium text-gray-700">Hero Text</label>
                <textarea id="heroText" name="heroText" onChange={handleTextChange} rows="4" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>

            <div className="space-y-6 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-800">Media Uploads (Optional)</h2>
              <div>
                {/* UPDATED: Removed "(min. 5)" from the label */}
                <label htmlFor="images" className="block mb-2 font-medium text-gray-700">Images</label>
                <input id="images" name="images" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" multiple accept="image/*" />
                {/* We can keep the count display as it's still helpful user feedback */}
                {formData.images.length > 0 && <p className="text-green-600 text-sm mt-2">{formData.images.length} image(s) selected.</p>}
              </div>
              <div>
                {/* UPDATED: Removed "(min. 3)" from the label */}
                <label htmlFor="videos" className="block mb-2 font-medium text-gray-700">Videos</label>
                <input id="videos" name="videos" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" multiple accept="video/*" />
                {formData.videos.length > 0 && <p className="text-green-600 text-sm mt-2">{formData.videos.length} video(s) selected.</p>}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Contact Information (Required)</h2>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input id="email" name="email" type="email" onChange={handleTextChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                {/* ADDED: Error display for email */}
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <input id="phoneNumber" name="phoneNumber" type="tel" onChange={handleTextChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                {/* ADDED: Error display for phone number */}
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-black text-white font-bold hover:bg-black/80 transition-colors duration-300">
                Submit Content
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;