"use client";
import { useRouter } from "next/navigation";
import {
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import CreateRecipe from "@/components/CreateRecipe";
import axios from "axios";
export default function HomePage() {
  const router = useRouter();

  const [recipesData, setRecipesData] = useState<any>();
  const [editing, setEditing] = useState<boolean>(false);
  const [recipeData, setRecipeData] = useState<any>();

  const getRecipes = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://api.recipefau.life/api/recipe`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      setRecipesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);

  const editRecipe = (recipeId: string) => {
    const recipe = recipesData.filter((recipe: any) => recipe._id === recipeId);
    setRecipeData(recipe);
    setEditing(true);
  };

  const deleteRecipe = async (recipeId: string) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://api.recipefau.life/api/recipe/${recipeId}`,
        {
          headers: {
            "auth-token": accessToken,
          },
        },
      );
      getRecipes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      h="100vh"
      justifyContent={"flex-start"}
      direction={"column"}
      backgroundImage={"img/recipe.jpg"}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Flex w={"full"} className="frost-effect" p="8" justifyContent={"center"}>
        <Text color="white" fontSize={"36px"} fontWeight={"bold"}>
          Welcome to Admin Panel of Recipe Route...
        </Text>
      </Flex>
      <Flex
        width="100%"
        h="100vh"
        mx="auto"
        gap="4"
        mt="4"
        justifyContent={"center"}
        direction={"row"}
      >
        <Sidebar />
        <Box w="100%" h="auto" className="frost-effect" p="6">
          <CreateRecipe
            isEditing={editing}
            getRecipes={getRecipes}
            recipeData={recipeData}
            setEditing={setEditing}
          />
          {!recipeData ||
            (recipeData.length == 0 && (
              <Text
                fontSize={"2xl"}
                textAlign={"center"}
                fontWeight={500}
                color="white"
              >
                No Recipes Added
              </Text>
            ))}
          {recipesData && recipesData.length > 0 && (
            <TableContainer mt="4">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize={"lg"} fontWeight={"semibold"} color={"white"}>
                      S.NO
                    </Th>
                    <Th fontSize={"lg"} fontWeight={"semibold"} color={"white"}>
                      Name
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recipesData.map((recipe: any, idx: any) => (
                    <Tr key={idx}>
                      <Td
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        color={"white"}
                      >
                        {idx + 1}
                      </Td>
                      <Td
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        color={"white"}
                      >
                        {recipe.title}
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            p="0"
                            _hover={{
                              backgroundColor: "transparent",
                              border: "1px solid black",
                            }}
                            bgColor="transparent"
                            as={Button}
                          >
                            <Icon
                              as={BsThreeDotsVertical}
                              color="white"
                              zIndex={50}
                              boxSize="6"
                            />
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => editRecipe(recipe._id)}>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={() => deleteRecipe(recipe._id)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
