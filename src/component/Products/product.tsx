import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import productStore from "./MOBXProductsStore";
import { Card, Image, Text, Button, Group, Pagination, Loader, Input, Select } from "@mantine/core";
import '@mantine/core/styles.css';

const OrderForm = observer(() => {
  useEffect(() => {
    productStore.fetchProducts();
    console.log("Loaded Products:", productStore.products); // Konsolda mahsulotlarni tekshirish
  }, []);
  

  const categories = [
    { value: "", label: "All Categories" },
    { value: "beauty", label: "Beauty" },
    { value: "fragrances", label: "Fragrances" },
    { value: "furniture", label: "Furniture" },
    { value: "groceries", label: "Groceries" },
    { value: "accessories", label: "Accessories" },
    { value: "watches", label: "Watches" },
  ];

  return (
    <>
      <h1>Products</h1>

      

      {productStore.isLoading ? (
        <Loader size="lg" />
      ) : (
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    margin: "40px",
    padding: "40px",
  }}
>
  {productStore.products.map((product) => (
    <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.images && product.images[0] ? product.images[0] : ""}
          alt={product.name}
          height={160}
          fit="cover"
        />
      </Card.Section>
      <Text weight={500} size="lg" mt="md">
        {product.name}
      </Text>
      <Text size="xl" weight={700} color="blue" mt="md">
        ${product.price}
      </Text>
      <Text size="xl" weight={700} color="blue" mt="md">
        {product.title}
      </Text>

    </Card>
  ))}
</div>

      )}

      {!productStore.isLoading && (
        <Pagination
          total={Math.ceil(productStore.totalProducts / productStore.limit)}
          onChange={(page) => productStore.setPage(page)}
        />
        
      )}
    </>
  );
});

export default OrderForm;
