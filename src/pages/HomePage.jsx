import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "../data/templates";
import { Box, Button, Card, Center, Flex, Image, ScrollArea, Stack, Text, Title } from "@mantine/core";

function CardComp({ template, onClick }) {
  const { src, label } = template;
  return (
    <Card
      maw={300}
      onClick={onClick}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section className="relative group">
        <Box className="overflow-hidden! h-[150px]">
          <Image src={src} alt={label} />
        </Box>
        <Center className="absolute group-hover:opacity-100 duration-500 xl:opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button bg={'orange'}>Preview</Button>
        </Center>
      </Card.Section>

      <Title order={6} mt="md">{label}</Title>
    </Card>
  );
}

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
    const handleKeyDown = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [handleClose]);

  return (
    <Box
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
      onClick={handleClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full h-[95vh] rounded-t-2xl shadow-xl transform transition-transform duration-500 ease-in-out ${
          isShowing ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="relative flex flex-col-reverse md:flex-row h-full">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black hover:bg-white transition"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Stack gap={16} p={32} justify="center" className="md:w-1/4!">
            <Title order={3} className="text-2xl font-bold capitalize mb-4">{template.label}</Title>
            <Text c={'dimmed'}>This is a preview of the template. Click the button to start filling out the content form.</Text>
            <Button onClick={handleGetTemplate} className="px-6 py-3 rounded-lg bg-black! text-white capitalize font-bold hover:bg-black/80! duration-300 cursor-pointer">Use This Template</Button>
          </Stack>
          {/* IMAGE */}
          <ScrollArea className="w-full md:w-3/4 md:h-full rounded-t-2xl md:rounded-l-none md:rounded-r-2xl">
            <img src={template.src} alt={template.label} className="w-full pointer-events-none" />
          </ScrollArea>
        </div>
      </Box>
    </Box>
  );
}

function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (selectedTemplate) {
      htmlElement.style.overflow = "hidden";
      bodyElement.style.overflow = "hidden";
    } else {
      htmlElement.style.overflow = "";
      bodyElement.style.overflow = "";
    }

    return () => {
      htmlElement.style.overflow = "";
      bodyElement.style.overflow = "";
    };
  }, [selectedTemplate]);

  return (
    <>
      <Box className="container mx-auto px-4 py-8 2xl:px-0">
        <Title order={1} mb={20} tt={'uppercase'}>
          Featured Templates
        </Title>
        <Flex gap={16} wrap={'wrap'}>
          {templates.map((template) => (
            <CardComp
              key={template.id}
              template={template}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </Flex>
      </Box>
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
