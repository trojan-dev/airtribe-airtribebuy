import { useNavigate } from "react-router-dom";
import {
  AppShell,
  Burger,
  Button,
  Flex,
  Text,
  TextInput,
  Indicator,
  Modal,
  PasswordInput,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Outlet, NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { IconShoppingCart, IconUserHexagon } from "@tabler/icons-react";
// import FilterAndSort from "../components/FilterAndSort";
const AppLayout = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [openedModal, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

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
            <Indicator inline label={cart.length} size={16}>
              <Button
                onClick={() => {
                  if (!localStorage.getItem("airtribebuy-cart")) {
                    open();
                  } else {
                    navigate("/cart");
                  }
                }}
                variant="white"
                visibleFrom="sm"
              >
                <IconShoppingCart />
              </Button>
            </Indicator>
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
        <Outlet context={{ openModal: open }} />
      </AppShell.Main>
      <Modal opened={openedModal} onClose={close} title="Login User">
        <form
          onSubmit={form.onSubmit((values) => {
            localStorage.setItem("airtribebuy-cart", "dummy");
            close();
          })}
        >
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </AppShell>
  );
};

/*
  

*/

export default AppLayout;
