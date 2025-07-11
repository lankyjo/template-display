import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "../data/templates";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Image,
  ScrollArea,
  Stack,
  Text,
  Title,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import GTranslate from "../../components/TranslateBtn";

// CardComp remains the same as it was correct.
function CardComp({ template, onClick }) {
  const { src, label } = template;
  return (
    <Card
      maw={{ base: "100%", md: 300 }}
      onClick={onClick}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
    >
      <Card.Section className="relative group">
        <Box className="overflow-hidden! h-[150px]">
          <Image src={src} alt={label} />
        </Box>
        <Center className="absolute group-hover:opacity-100 duration-500 xl:opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button bg={"orange"}>Preview</Button>
        </Center>
      </Card.Section>
      <Title order={6} mt="md">
        {label}
      </Title>
    </Card>
  );
}

function TemplatePreviewModal({ opened, close, template }) {
  const navigate = useNavigate();

  const handleGetTemplate = () => {
    if (template) {
      navigate(`/form/${template.id}`);
      close();
    }
  };

  if (!template) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      size="100%" 
      padding={0}
      withCloseButton={false}
    >
      <div className="relative flex flex-col-reverse lg:flex-row h-dvh overflow-hidden">
        <button
          onClick={close}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black hover:bg-white transition"
          aria-label="Close modal"
        >
          ❌
        </button>

        {/* Left side content */}
        <Stack gap={16} p={32} justify="center" className="lg:w-1/4!">
          <Title order={3} className="text-2xl font-bold capitalize mb-4">
            {template.label}
          </Title>
          <Text c={"dimmed"}>
            This is a preview of the template. Click the button to start filling
            out the content form.
          </Text>
          <Button
            onClick={handleGetTemplate}
            className="px-6 py-3 rounded-lg bg-black! text-white capitalize font-bold hover:bg-black/80! duration-300"
          >
            Use This Template
          </Button>
        </Stack>

        {/* Right side image preview */}
        <ScrollArea className="w-full lg:w-3/4 md:h-full">
          <img
            src={template.src}
            alt={template.label}
            className="w-full pointer-events-none"
          />
        </ScrollArea>
      </div>
    </Modal>
  );
}

function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  // This function handles opening the modal and setting the selected template.
  const handleCardClick = (template) => {
    setSelectedTemplate(template);
    open();
  };

  return (
    <>
      <Box className="container mx-auto px-4 py-8 2xl:px-0">
        <Title order={1} mb={20} tt={"uppercase"}>
          Featured Templates
        </Title>
        <GTranslate/>
        <Flex gap={16} wrap={"wrap"}>
          {templates.map((template) => (
            <CardComp
              key={template.id}
              template={template}
              onClick={() => handleCardClick(template)}
            />
          ))}
        </Flex>
      </Box>

      <TemplatePreviewModal
        opened={opened}
        close={close}
        template={selectedTemplate}
      />
    </>
  );
}

export default HomePage;