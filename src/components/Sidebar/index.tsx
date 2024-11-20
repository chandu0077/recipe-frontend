import { useRouter } from "next/navigation";
import { Box, ListItem, List, ListIcon } from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";
const Sidebar = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  return (
    <>
      <Box
        className="frost-effect"
        minH="300px"
        w="300px"
        h="fit-content"
        p="6"
      >
        <List spacing={"3"}>
          <ListItem
            fontSize={"md"}
            cursor={"pointer"}
            p="2"
            _hover={{
              backgroundColor: "white",
              boxShadow: "1px 1px 20px white",
              borderRadius: "5px",
            }}
            onClick={() => router.push("/weather")}
          >
            <ListIcon as={TiHome} mb="0.5" color="black.500" />
            Dashboard
          </ListItem>
          <ListItem
            fontSize={"md"}
            onClick={logout}
            cursor={"pointer"}
            p="2"
            _hover={{
              backgroundColor: "white",
              boxShadow: "1px 1px 20px white",
              borderRadius: "5px",
            }}
          >
            <ListIcon as={IoLogOut} mb="0.5" color="black.500" />
            Logout
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
