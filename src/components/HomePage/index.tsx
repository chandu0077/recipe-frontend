"use client";

import {
  Button,
  Text,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

export default function Homepage() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    // <Flex
    //   h={"100vh"}
    //   justify={"space-evenly"}
    //   alignItems={"center"}
    //   direction={"column"}
    // >
    <Flex
      w={"100%"}
      h="100vh"
      style={{ backgroundColor: "#ff5200" }}
      justifyContent={"flex-start"}
      direction={"column"}
    >
      <Flex
        justify={"space-between"}
        w={"full"}
        alignItems={"center"}
        direction={"row"}
        mt={"12px"}
      >
        <Text color="white" fontSize={"3xl"} fontWeight={"semibold"}>
          Receipe Route...
        </Text>
        <Flex justifyContent={"center"} gap="4">
          <Button borderRadius={"3xl"}>
            <Link href="/signup">Signup</Link>
          </Button>
          <Button borderRadius={"3xl"}>
            <Link href="/login">Login</Link>
          </Button>
        </Flex>
      </Flex>
      <Flex
        justify={"center"}
        w={"full"}
        alignItems={"center"}
        direction={"row"}
        mt="94px"
      >
        <Text
          color="white"
          textAlign={"center"}
          fontSize={"4xl"}
          fontWeight={"bold"}
        >
          Gateway to mouth watering recipes
          {String.fromCodePoint(parseInt("0x1F924", 16))}
          <br />
          walk
          {String.fromCodePoint(parseInt("0x1F6B6 0200D 02642 0FE0F", 16))} in
          to find out...
        </Text>
      </Flex>
      {/* <InputGroup
        size="md"
        borderRadius={"xl"}
        maxW={"400px"}
        mt="4"
        mx={"auto"}
      >
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Search a recipe or cuisine..."
          backgroundColor={"white"}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="2.5rem"
            size="md"
            backgroundColor={"black"}
            color={"white"}
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup> */}
    </Flex>
    // </Flex>
  );
}
