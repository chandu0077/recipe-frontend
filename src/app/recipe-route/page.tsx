"use client";
import {
  Flex,
  Text,
  Button,
  Avatar,
  Tag,
  Image,
  Icon,
  ListItem,
  List,
  ListIcon,
} from "@chakra-ui/react";
import { IoLogOut } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  Box,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  DrawerFooter,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  const [userData, setUserData] = useState<any>();
  const [userFavouriteCuisines, setUserFavouriteCuisines] = useState<any>();
  const [userFavouriteRecipes, setUserFavouriteRecipes] = useState<any>();
  const [cuisineFeed, setCuisineFeed] = useState<any>();
  const [likedRecipes, setLikedRecipes] = useState<String[]>([]);

  const getProfileData = async () => {
    const accessToken = localStorage.getItem("token");
    axios
      .get(`http://api.recipefau.life/api/user`, {
        headers: {
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const profileOpen = () => {
    onOpen();
    getProfileData();
  };

  const getUserFavouriteCuisines = () => {
    const accessToken = localStorage.getItem("token");
    axios
      .get(`http://api.recipefau.life/api/user/fav-cuisines`, {
        headers: {
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        setUserFavouriteCuisines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserFavoriteRecipes = async () => {
    const accessToken = localStorage.getItem("token");
    axios
      .get(`http://api.recipefau.life/api/user/fav-recipes`, {
        headers: {
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        setUserFavouriteRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserFeeds = async () => {
    const accessToken = localStorage.getItem("token");
    axios
      .get(`http://api.recipefau.life/api/user/get-cuisine-feed`, {
        headers: {
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setCuisineFeed(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createALike = (recipeId: string) => {
    const accessToken = localStorage.getItem("token");
    const data = {};
    axios
      .post(
        `http://api.recipefau.life/api/user/add-fav-recipe/${recipeId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": accessToken,
          },
        },
      )
      .then(function (response) {
        getUserFeeds();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteALike = (recipeId: string) => {
    const accessToken = localStorage.getItem("token");
    const data = {};
    axios
      .delete(`http://api.recipefau.life/api/user/del-fav-recipe/${recipeId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        getUserFeeds();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeOrUnlikeARecipe = async (recipeId: any, recipeLiked: boolean) => {
    recipeLiked ? deleteALike(recipeId) : createALike(recipeId);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  useEffect(() => {
    getUserFeeds();
  }, []);

  return (
    <>
      <Flex
        boxShadow={"0 10px 15px rgba(0, 0, 0, 0.2)"}
        h="auto"
        backgroundColor={"white"}
        direction={"column"}
      >
        <Flex
          w="full"
          maxW={"1240px"}
          mx="auto"
          justifyContent={"space-between"}
          direction={"row"}
          p="2"
        >
          <Flex direction={"column"} alignItems={"start"}>
            <Text color={"black"} fontSize={"xl"} fontWeight={"bold"}>
              Recipe Route
            </Text>
            <Text color={"black"} fontSize={"lg"} fontWeight={"normal"}>
              Gateway to your favorite{" "}
              <span style={{ color: "#ff5200" }}>recipes...</span>
            </Text>
          </Flex>
          <Flex
            w="300px"
            direction={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Button
              cursor={"pointer"}
              color={"black"}
              borderRadius={"3xl"}
              backgroundColor={"#ff5200"}
            >
              Fav Cuisine
            </Button>
            <Button
              cursor={"pointer"}
              color={"black"}
              borderRadius={"3xl"}
              backgroundColor={"#ff5200"}
            >
              Recipe
            </Button>
            <Avatar
              onClick={profileOpen}
              cursor={"pointer"}
              size="sm"
              name="Sage"
              src="https://bit.ly/dan-abramov"
            />
            {userData && (
              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      gap={"4"}
                    >
                      <Avatar
                        size="md"
                        name="Sage"
                        src="https://bit.ly/dan-abramov"
                      />
                      <Flex
                        justifyContent={"center"}
                        direction={"column"}
                        alignItems={"start"}
                      >
                        <Text fontSize={"large"}>{userData.name}</Text>
                        <Text fontSize={"large"}>{userData.email}</Text>
                      </Flex>
                    </Flex>

                    <Accordion allowMultiple>
                      <AccordionItem mt="4">
                        <h2>
                          <AccordionButton onClick={getUserFavouriteCuisines}>
                            <Box as="span" mt="2" flex="1" textAlign="left">
                              Favourite Cuisine
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>

                        <AccordionPanel pb={2}>
                          <Flex
                            justifyContent={"space-between"}
                            flexWrap={"wrap"}
                          >
                            {userFavouriteCuisines &&
                              userFavouriteCuisines.map(
                                (favouriteCuisines: any, idx: any) => (
                                  <Tag key={idx} cursor={"poniter"}>
                                    <Text fontSize={"md"}>
                                      {favouriteCuisines.name}
                                    </Text>
                                  </Tag>
                                ),
                              )}
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <h2>
                          <AccordionButton onClick={getUserFavoriteRecipes}>
                            <Box as="span" flex="1" textAlign="left">
                              Favourite Recipe
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {userFavouriteRecipes &&
                            userFavouriteRecipes.map(
                              (favRecipes: any, idx: any) => (
                                <Flex
                                  key={idx}
                                  p="2"
                                  direction={"column"}
                                  justifyContent={"center"}
                                >
                                  <Text
                                    color={"black"}
                                    fontSize={"lg"}
                                    fontWeight={"normal"}
                                  >
                                    {favRecipes}
                                  </Text>
                                </Flex>
                              ),
                            )}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </DrawerBody>
                  <DrawerFooter>
                    <List>
                      <ListItem
                        fontSize={"md"}
                        onClick={logout}
                        cursor={"pointer"}
                        p="2"
                      >
                        <ListIcon as={IoLogOut} mb="0.5" color="black.500" />
                        Logout
                      </ListItem>
                    </List>
                    {/* <Button colorScheme="blue">Save</Button> */}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </Flex>
        </Flex>
      </Flex>
      {cuisineFeed && (
        <Box w="full" h={"auto"} maxW={"1240px"} mx="auto" mt={"36px"}>
          {/* <CardBody> */}
          <Flex
            justifyContent={"space-between"}
            direction={"column"}
            flexWrap={"wrap"}
            mb="8px"
          >
            {cuisineFeed.map((cuisine: any, idx: any) => (
              <Box key={idx} w="full" gap={"6"} h="auto" p="2">
                <Text color={"black"} fontSize={"2xl"} fontWeight={"bold"}>
                  {cuisine.name}
                </Text>
                <Flex
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  flexWrap={"wrap"}
                  gap="2"
                >
                  {cuisine.recipes.map((recipe: any, idx: any) => (
                    <Card
                      direction={"column"}
                      justifyContent={"space-between"}
                      key="idx"
                      mb="12"
                      w="32%"
                    >
                      <Box w="full" h="auto">
                        <Image src="img/dal.jpg"></Image>
                      </Box>
                      <Flex
                        mt="2"
                        direction={"row"}
                        justifyContent={"space-between"}
                        p="4"
                      >
                        <Text
                          color={"black"}
                          fontSize={"lg"}
                          fontWeight={"semibold"}
                        >
                          {recipe.title}
                        </Text>

                        <Icon
                          as={recipe.isFavorite ? FaHeart : CiHeart}
                          color="orange"
                          zIndex={50}
                          cursor={"pointer"}
                          boxSize="6"
                          onClick={() =>
                            likeOrUnlikeARecipe(recipe._id, recipe.isFavorite)
                          }
                        />
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
}
