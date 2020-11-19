import ProductTable from "../../components/ProductTable";

export default function Home() {
  const productList = [
    {
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_TR?wid=892&hei=820&&qlt=80&.v=1582326712648",
      name: "Macbook Pro 16 inch",
      price: 25000.0,
    },
  ];

  for (let i = 0; i < 15; i++) {
    productList.push(productList[0]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Hi Carousel!!</p>
        <ProductTable productList={productList} columnSize={3} />
      </header>
    </div>
  );
}
