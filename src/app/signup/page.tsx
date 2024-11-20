"use client";

import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signupForm } from "@/utils/forms/signupForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupForm),
    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ISignupForm = yup.InferType<typeof signupForm>;

  const onSubmit = (data: ISignupForm) => {
    console.log("data", data);
    axios
      .post(`http://api.recipefau.life/api/user/register`, {
        data,
      })
      .then(function (response) {
        router.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={"row"}
      backgroundColor={"white"}
    >
      <Flex
        w="50%"
        justify={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Text color="orange" fontSize={"4xl"} fontWeight={"semibold"} mb="6">
          Signup
        </Text>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel textColor={"orange"}>Name</FormLabel>
            <Input
              type="text"
              borderColor={"orange.500"}
              {...register("name")}
            />
            <Text>{errors?.name?.message}</Text>
            <FormHelperText color={"orange"}>
              We will never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel color={"orange"}>Email address</FormLabel>
            <Input
              borderColor={"orange.500"}
              type="email"
              {...register("email")}
            />
            <Text>{errors?.email?.message}</Text>
            <FormHelperText color={"orange"}>
              We will never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel color={"orange"}>Password</FormLabel>
            <Input
              borderColor={"orange.500"}
              type="password"
              {...register("password")}
            />
            <Text>{errors?.password?.message}</Text>
          </FormControl>
          <FormControl>
            <Checkbox {...register("isAdmin")} color={"orange.300"}>
              isAdmin?
            </Checkbox>
          </FormControl>

          <Button
            mt="4"
            mb="4"
            backgroundColor={"orange"}
            color="white"
            textAlign={"center"}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Flex>
      <Flex w="46%" justify={"center"} alignItems={"center"}>
        <Image
          align={"right"}
          boxSize="650px"
          src="img/passtaa.jpg"
          alt="pasta"
        />
      </Flex>
    </Flex>
  );
}
