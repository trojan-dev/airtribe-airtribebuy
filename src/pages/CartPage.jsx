import { Text, Box, Stack, Flex, Card, Image, SimpleGrid } from "@mantine/core";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  if (!cart) {
    return <p>Loading cart...</p>;
  }
  return (
    <Stack align="flex-start" gap={10}>
      <Text fz={25} fw={600}>
        My Cart
      </Text>
      <SimpleGrid cols={3}>
        {cart?.map((cartItem) => (
          <Card key={cartItem.product.id} p={20} shadow="md" radius="sm">
            <Flex gap={20}>
              <Image
                src={cartItem.product.image}
                w={100}
                h={100}
                fit="contain"
              />
              <Flex direction="column">
                <Text fz={20} fw={600}>
                  {cartItem.product.title}
                </Text>
                <Text fz={18} fw={500}>
                  Rs. {cartItem.product.price}
                </Text>
                <Text fz={20} fw={500}>
                  {cartItem.quantity}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default CartPage;
