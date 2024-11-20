"use client";
import { Flex } from "@chakra-ui/react";
import CuisinesList from "@/components/CuisinesList";
export default function HomePage() {
  return (
    <>
      <Flex
        w={"100%"}
        h="100vh"
        style={{ backgroundColor: "#ff5200" }}
        justifyContent={"flex-start"}
        direction={"column"}
      >
        <CuisinesList />
      </Flex>
    </>
  );
}
