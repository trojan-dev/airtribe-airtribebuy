import { Box, SimpleGrid, Image, Card, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useGetAllProducts } from "../services/useProductServices";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, loading] = useGetAllProducts();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Box w="100%">
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 4, lg: 4, xl: 4 }}>
        {products.map((product) => {
          return (
            <Card
              onClick={() => navigate(`/products/${product.id}`)}
              className="product-card"
              shadow="sm"
              radius="md"
              key={product.id}
            >
              <Flex
                gap={20}
                p={10}
                direction="column"
                justify="center"
                align="center"
              >
                <Box w="100%">
                  <Image
                    h={200}
                    fit="contain"
                    src={product.image}
                    alt="Product image"
                  />
                </Box>
                <Text fz={15} fw={600}>
                  {product.title}
                </Text>
                <Text fz={10} fw={400}>
                  {product.description}
                </Text>
                <Text fz={20} fw={800}>
                  ₹{Number(product.price).toFixed(2)}
                </Text>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
