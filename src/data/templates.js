export const templates = [
  {
    id: 'template-1', 
    src: '/temp1.png',
    label: 'Organizer landing page',
  },
  {
    id: 'template-2',
    src: '/temp2.png',
    label: 'Event Landing Page',
  },
];


export const findTemplateById = (id) => {
  return templates.find(template => template.id === id);
};