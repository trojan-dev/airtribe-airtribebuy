import { Button, Flex } from "@mantine/core";
const FilterAndSort = () => {
  return (
    <Flex align="center" justify="flex-start" gap={10}>
      <Button>Add Filter</Button>
      <Button>Sort</Button>
    </Flex>
  );
};

export default FilterAndSort;
