import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import productStore from "./MOBXProductsStore";
import { Card, Image, Pagination, Loader, Text } from "@mantine/core";
import '@mantine/core/styles.css';

const OrderForm = observer(() => {
  useEffect(() => {
    productStore.fetchProducts();
    console.log("Loaded Products:", productStore.products); // Konsolda mahsulotlarni tekshirish
  }, []);

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
    <Card key={product.id} withBorder>
      <Card.Section>
        <Image
          src={product.images && product.images[0] ? product.images[0] : ""}
          alt={product.name}
          height={160}
          fit="cover"
        />
      </Card.Section>
      <Text>
        {product.name}
      </Text>
      <Text>
        ${product.price}
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
