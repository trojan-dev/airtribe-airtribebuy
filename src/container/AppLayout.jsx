import { useNavigate } from "react-router-dom";
import { AppShell, Burger, Button, Flex, Text, TextInput } from "@mantine/core";
import { Outlet, NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart, IconUserHexagon } from "@tabler/icons-react";
// import FilterAndSort from "../components/FilterAndSort";
const AppLayout = () => {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p="sm">
        <Flex h="100%" align="center" gap={10}>
          <Flex flex={1}>
            <NavLink to="/products">
              <Text fz={20} fw={600}>
                AirtribeBuy
              </Text>
            </NavLink>
          </Flex>
          <TextInput visibleFrom="sm" placeholder="Search product" flex={1} />
          <Flex visibleFrom="sm" gap={10} ml="auto">
            {/* <Indicator inline label={totalCartItems} size={16}> */}
            <Button
              onClick={() => navigate("/products/cart")}
              variant="white"
              visibleFrom="sm"
            >
              <IconShoppingCart />
            </Button>
            {/* </Indicator> */}
            <Button variant="white" visibleFrom="sm">
              <IconUserHexagon />
            </Button>
          </Flex>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar hiddenFrom="sm" p="md">
        Navbar
      </AppShell.Navbar>

      <AppShell.Main>
        {/* <FilterAndSort /> */}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
