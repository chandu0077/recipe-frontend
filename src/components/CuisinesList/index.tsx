import { Icon, Flex, Text, Tag, Button } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CuisinesList = () => {
  const router = useRouter();
  const [allCuisines, setAllCuisines] = useState<[]>();
  const [selectedCuisines, setSelectedCuisines] = useState<String[] | null>(
    null,
  );

  const getAllCuisines = async () => {
    const accessToken = localStorage.getItem("token");
    axios
      .get(`http://api.recipefau.life/api/cuisine`, {
        headers: {
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        setAllCuisines(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   Take id to the fn
  // create a global state for selectedCuisines
  // ['12q34q23213', 'qwrqrqwrqwrfsar23r234', 'wqrqwr2fsaf']
  //
  const addCuisine = (cuisineId: string) => {
    if (selectedCuisines) {
      setSelectedCuisines([...selectedCuisines, cuisineId]);
    } else {
      setSelectedCuisines([cuisineId]);
    }
  };

  const addCuisinesToUser = () => {
    // API call to api/user/add-cuisine post the selectedCuisines array
    // after success, take user to /reciperoute on frontned.
    const accessToken = localStorage.getItem("token");
    axios
      .post(
        `http://api.recipefau.life/api/user/add-cuisine/`,
        selectedCuisines,
        {
          headers: {
            "auth-token": accessToken,
          },
        },
      )
      .then(function () {
        router.push("/route-recipe");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAllCuisines();
  }, []);

  return (
    <>
      <Flex
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
        h="90vh"
        mx="auto"
        maxW="600px"
        w="full"
      >
        <Text
          textAlign={"center"}
          color={"white"}
          fontSize={"3xl"}
          fontWeight={"semibold"}
        >
          Add all the cuisines that interest's you!!
        </Text>
        <Flex
          gap={"22px"}
          justify={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          mt="12"
        >
          {allCuisines &&
            allCuisines.length > 0 &&
            allCuisines.map((cuisine: any, idx) => (
              // onClick => fn(cuisine._id)
              <Tag
                cursor={
                  selectedCuisines?.includes(cuisine._id)
                    ? "not-allowed"
                    : "pointer"
                }
                onClick={() =>
                  selectedCuisines?.includes(cuisine._id)
                    ? null
                    : addCuisine(cuisine._id)
                }
                key={idx}
                px="4"
                py="2"
              >
                <Icon
                  as={
                    selectedCuisines?.includes(cuisine._id)
                      ? FaCheckCircle
                      : AiFillPlusCircle
                  }
                  color="black"
                  mr="2"
                  zIndex={50}
                  boxSize="4"
                />
                <Text fontSize={"lg"}>{cuisine.name}</Text>
              </Tag>
            ))}
        </Flex>
        <Button
          color={"white"}
          backgroundColor={"black"}
          fontSize={"1xl"}
          p="4"
          mt={"36px"}
          onClick={addCuisinesToUser}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};
export default CuisinesList;
