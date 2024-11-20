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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginForm } from "@/utils/forms/loginForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginForm),
    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ILoginForm = yup.InferType<typeof loginForm>;

  const onSubmit = (data: ILoginForm) => {
    // console.log("process.env.API_URL", process.env.API_URL);
    // console.log("process.env.custom", process.env.customKey);

    axios
      // .post(`${process.env.API_URL}/api/user/login`, {
      .post(`http://api.recipefau.life/api/user/login`, {
        data,
      })
      .then(function (response: any) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        if (response.data.user.isAdmin) {
          router.push("/admin");
        }
        if (response.data.user.cuisines.length > 0) {
          router.push("/recipe-route");
        } else {
          router.push("/user");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      backgroundColor={"white"}
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={"row"}
    >
      <Flex
        w="50%"
        justify={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Text color="orange" fontSize={"4xl"} fontWeight={"semibold"} mb="6">
          Login
        </Text>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            mt="4"
            mb="4"
            backgroundColor={"orange"}
            color="white"
            textAlign={"center"}
            type="submit"
          >
            Login
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
