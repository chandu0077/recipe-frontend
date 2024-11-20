"use client";
import dynamic from "next/dynamic";
import {
  FormErrorMessage,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  Select,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { recipeForm } from "@/utils/forms/recipeForm";
// import JoditEditor from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface Props {
  getRecipes: Function;
  isEditing: boolean;
  recipeData: any;
  setEditing: Function;
}

type IRecipeForm = yup.InferType<typeof recipeForm>;

const defaultValues: IRecipeForm = {
  title: "",
  description: "",
  cuisine: "",
};

const CreateRecipe: React.FC<Props> = ({
  getRecipes,
  isEditing,
  recipeData,
  setEditing,
}) => {
  const router = useRouter();
  const values = isEditing ? recipeData[0] : defaultValues;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allCuisines, setAllCuisines] = useState<any>();
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: "Start typings...",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<IRecipeForm>({
    resolver: yupResolver(recipeForm),
    mode: "onChange",
    reValidateMode: "onChange",
    values: values,
  });

  const createRecipe = (data: IRecipeForm) => {
    const accessToken = localStorage.getItem("token");
    console.log("data", data);
    axios
      .post(`http://api.recipefau.life/api/recipe/`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset(defaultValues);
        getRecipes();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editRecipe = (data: IRecipeForm) => {
    const accessToken = localStorage.getItem("token");
    axios
      .put(`http://api.recipefau.life/api/recipe/${data._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        reset(defaultValues);
        getRecipes();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCuisines = async () => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://api.recipefau.life/api/cuisine/`,
        {
          headers: {
            "auth-token": accessToken,
          },
        },
      );
      setAllCuisines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: IRecipeForm) => {
    isEditing ? editRecipe(data) : createRecipe(data);
  };
  const createRecipeandEdit = () => {
    onOpen();
  };
  useEffect(() => {
    if (isEditing) {
      createRecipeandEdit();
      // getAllCuisines();
      // onOpen();
    }
    getAllCuisines();
  }, [isEditing]);

  const onModalCloseHandler = () => {
    setEditing(false);
    onClose();
  };

  console.log("isValid", isValid);
  console.log("errors", errors);
  return (
    <>
      <Button textAlign={"center"} type="submit" onClick={createRecipeandEdit}>
        Create Recipe
      </Button>
      <Modal onClose={onModalCloseHandler} size={"full"} isOpen={isOpen}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent
          p="8"
          mx="auto"
          mt="10%"
          backgroundColor={"white"}
          borderRadius={"20px"}
          width={"50%"}
        >
          <Box display="flex" justifyContent={"space-between"} w="100%">
            <Text
              width="300px"
              display={"block"}
              fontSize={"22px"}
              fontWeight={700}
            >
              {isEditing ? "Edit" : "Create"} A Recipe
            </Text>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  border="1px solid lightgrey"
                  borderRadius="12px"
                  p="4"
                  placeholder="Title"
                  {...register("title")}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Recipe</FormLabel>
                <Input
                  border="1px solid lightblack"
                  borderRadius="12px"
                  p="4"
                  type="text"
                  placeholder="Recipe:"
                  {...register("recipe")}
                />
                <FormErrorMessage>{`${errors?.recipe?.message}`}</FormErrorMessage>
              </FormControl> */}

              <FormControl mt="4">
                <FormLabel>Recipe</FormLabel>
                <JoditEditor
                  config={config}
                  value={getValues("description")}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {
                    setValue("description", newContent, {
                      shouldValidate: true,
                    });
                  }}
                />
                <FormErrorMessage>{`${errors?.description?.message}`}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Cuisines:</FormLabel>
                <Select
                  placeholder="Select Cuisine"
                  value={getValues(`cuisine`)}
                  onChange={(e) => {
                    setValue("cuisine", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                >
                  {allCuisines &&
                    allCuisines.length > 0 &&
                    allCuisines.map((cuisine: any, key: string) => (
                      <option
                        key={key}
                        value={cuisine._id}
                        selected={
                          cuisine._id === getValues("cuisine") ? true : false
                        }
                      >
                        {cuisine.name.charAt(0).toUpperCase() +
                          cuisine.name.slice(1)}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <Button
                mt="3"
                background="black"
                color="white"
                px="12"
                py="6"
                borderRadius="12px"
                type="submit"
                // isValid: true
                isDisabled={!isValid}
                _disabled={{ background: "lightgrey" }}
                _hover={{
                  bg: "white.500",
                  _disabled: {
                    backgroundColor: "red",
                    cursor: "not-allowed",
                  },
                }}
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateRecipe;
