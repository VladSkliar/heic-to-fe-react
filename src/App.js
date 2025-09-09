import React, {useState} from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Input,
    Button,
    useToast
} from '@chakra-ui/react';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleConvert = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('https://heicto.onrender.com/convert/heic-to-jpeg/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = selectedFile.name.replace(/\.heic$/i, '.jpg');
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast({
                title: "Conversion successful",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Conversion failed",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.md" centerContent py={10}>
            <VStack spacing={6} textAlign="center">
                <Heading>Convert HEIC to JPG</Heading>
                <Text>Simple HEIC to JPG Converter</Text>
                <Box
                    border="2px"
                    borderColor="blue.500"
                    p={6}
                    borderRadius="md"
                    w="100%"
                >
                    <VStack spacing={4}>
                        <Button
                            as="label"
                            htmlFor="file-upload"
                            colorScheme="blue"
                            cursor="pointer"
                        >
                            Select HEIC File
                            <Input
                                id="file-upload"
                                type="file"
                                accept=".heic,.HEIC"
                                onChange={handleFileChange}
                                display="none"
                            />
                        </Button>
                        {selectedFile && (
                            <Text fontSize="sm">
                                Selected file: {selectedFile.name}
                            </Text>
                        )}
                        <Button
                            colorScheme="blue"
                            isDisabled={!selectedFile || isLoading}
                            onClick={handleConvert}
                            isLoading={isLoading}
                            loadingText="Converting..."
                        >
                            Convert to JPG
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default App;