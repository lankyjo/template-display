import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '../data/templates';

// Card Component (No changes)
function Card({ template, onClick }) {
  const { src, label } = template;
  return (
    <div
      onClick={onClick}
      className='group flex flex-col gap-5 aspect-[3/4] rounded-lg overflow-hidden max-h-[600px] w-full border-black/40 border cursor-pointer hover:shadow-xl transition-shadow duration-300'
    >
      <div className='flex-1 overflow-hidden '>
        <img
          src={src}
          alt={label}
          className='w-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>
      <div className='p-5 capitalize text-xl font-medium'>{label}</div>
    </div>
  );
}

// TemplateModal Component (No changes)
function TemplateModal({ template, onClose }) {
  const navigate = useNavigate(); 
  const [isShowing, setIsShowing] = useState(false);

  const handleClose = useCallback(() => {
    setIsShowing(false);
    setTimeout(onClose, 500);
  }, [onClose]);

  const handleGetTemplate = () => {
    navigate(`/form/${template.id}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [handleClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black/60' onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className={`bg-white w-full h-[95vh] max-w-7xl rounded-t-2xl shadow-xl transform transition-transform duration-500 ease-in-out ${isShowing ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className='relative flex flex-col-reverse md:flex-row h-full'>
          <button onClick={handleClose} className='absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black hover:bg-white transition' aria-label='Close modal'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' /></svg>
          </button>
          <div className='w-full lg:w-1/3 p-8 flex flex-col justify-center'>
            <h2 className='text-4xl font-bold capitalize mb-4'>{template.label}</h2>
            <p className='text-gray-600 mb-6'>This is a preview of the template. Click the button to start filling out the content form.</p>
            <button
              onClick={handleGetTemplate}
              className='px-6 py-3 rounded-lg bg-black text-white capitalize font-bold hover:bg-black/80 duration-300 cursor-pointer'
            >
              Use This Template
            </button>
          </div>
          <div className='w-full md:w-2/3  md:h-full bg-gray-100 overflow-y-auto rounded-t-2xl md:rounded-l-none md:rounded-r-2xl'>
            <img src={template.src} alt={template.label} className='w-full' />
          </div>
        </div>
      </div>
    </div>
  );
}

// HomePage Component
function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // --- THIS IS THE FIX ---
  // This effect now targets both the <html> and <body> tags to reliably disable scrolling.
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (selectedTemplate) {
      // When modal is open, disable scroll
      htmlElement.style.overflow = 'hidden';
      bodyElement.style.overflow = 'hidden';
    } else {
      // When modal is closed, restore scroll by removing the inline style
      htmlElement.style.overflow = '';
      bodyElement.style.overflow = '';
    }

    // The cleanup function ensures scrolling is restored if the component unmounts
    // while the modal is still open (e.g., user navigates away).
    return () => {
      htmlElement.style.overflow = '';
      bodyElement.style.overflow = '';
    };
  }, [selectedTemplate]); // Dependency array ensures this runs only when the modal opens or closes

  return (
    <>
      <div className='container mx-auto px-4 py-8 2xl:px-0'>
        <h1 className='text-3xl font-bold uppercase tracking-wide'>
          Featured Templates
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
          {templates.map((template) => (
            <Card
              key={template.id}
              template={template}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </div>
      </div>
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </>
  );
}

export default HomePage;