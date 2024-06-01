import {
  Flex,
  Stack,
  Box,
  Text,
  Button,
  Image,
  SimpleGrid,
  Badge,
  Rating,
  Card,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductDetails,
  useGetAllProductsInCategory,
} from "../services/useProductServices";
import { CATEGORY } from "../constants/category";
import { notifications } from "@mantine/notifications";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, loading] = useGetProductDetails(params.productId);
  const [products] = useGetAllProductsInCategory(product.category);

  const createUserCart = () => {
    localStorage.setItem("airtribebuy-cart", JSON.stringify([]));
  };

  const getUserCart = () => {
    return JSON.parse(localStorage.getItem("airtribebuy-cart"));
  };

  const isUserCartPresent = () => {
    const userCart = localStorage.getItem("airtribebuy-cart");
    return userCart ? true : false;
  };

  const handleAddToCart = (product) => {
    // Case when cart is not present and it is being created the first time
    if (!isUserCartPresent()) {
      createUserCart();
      const userCart = getUserCart();
      userCart.push({ product: product, quantity: 1 });
      localStorage.setItem("airtribebuy-cart", JSON.stringify(userCart));
      notifications.show({
        title: "Product added to cart!",
      });
      return true;
    }

    const userCart = getUserCart();
    const productIndexInTheCart = userCart.findIndex(
      (p) => p.product.id === product.id
    );

    if (productIndexInTheCart >= 0) {
      userCart[productIndexInTheCart].quantity += 1;
    } else {
      userCart.push({ product: product, quantity: 1 });
    }

    localStorage.setItem("airtribebuy-cart", JSON.stringify(userCart));
    notifications.show({
      title: "Product added to cart!",
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Stack gap="lg" w="100%">
      <SimpleGrid
        cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
        w="100%"
      >
        <Box mah={500}>
          <Image fit="contain" h="100%" src={product.image} />
        </Box>

        <Stack gap={30}>
          <Text fz={30} fw={500}>
            {product.title}
          </Text>
          <Text c="dimmed" fz={20} fw={500}>
            {product.description}
          </Text>
          <Badge color={CATEGORY[product.category]?.color}>
            <Text fz={12} fw={500} c={CATEGORY[product.category]?.textColor}>
              {product.category}
            </Text>
          </Badge>
          <Flex align="center" gap={10}>
            {product?.rating?.rate ? (
              <Rating readOnly defaultValue={product.rating.rate} />
            ) : null}
            <Text c="dimmed" fz={20} fw={500}>
              {product?.rating?.count ?? 0} Reviews
            </Text>
          </Flex>
          <Text fz={30} fw={600}>
            ₹{Number(product.price).toFixed(2)}
          </Text>
          <Button
            onClick={() => handleAddToCart(product)}
            color="orange"
            radius="md"
            size="lg"
          >
            Add To Cart
          </Button>
        </Stack>
      </SimpleGrid>
      <Text mt={50} fz={25} fw={500}>
        People also bought
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 3, lg: 5 }}>
        {products.map((product) => (
          <Card
            onClick={() => {
              navigate(`/products/${product.id}`);
              window.location.reload();
            }}
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
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ProductDetailsPage;
