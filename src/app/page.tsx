import { Box } from "@chakra-ui/react";
import Homepage from "@/components/HomePage";

export default function Home() {
  return (
    <Box
      // backgroundColor={"orange.400"}
      width="full"
      height="auto"
      overflow={"hidden"}
      // maxW="1240px"
    >
      <Homepage />
    </Box>
  );
}
