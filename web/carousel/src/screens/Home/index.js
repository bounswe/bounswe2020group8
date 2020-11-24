import ProductTable from "../../components/Product/ProductTable"

export default function Home() {
  const productList = [
    {
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_TR?wid=892&hei=820&&qlt=80&.v=1582326712648",
      name: "Macbook Pro 16 inch",
      price: 2199.99,
    },
    {
     imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_.jpg",
     name: "PlayStation 4 Pro 1TB",
     price: 399.99, 
    },
    {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/418Ty89Cf3L._SX160_QL100_AC_SCLZZZZZZZ_.jpg",
      name: "Samsung Galaxy Tab S6 Lite 10.4",
      price: 249.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/31DQ1NOBi4L._SX160_QL100_AC_SCLZZZZZZZ_.jpg",
      name: "Bose Noise Cancelling Wireless Bluetooth Headphones 700",
      price: 339.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51TVrxhgLaL._SX160_QL100_AC_SCLZZZZZZZ_.jpg",
      name: "Sony X800H 43 Inch TV",
      price: 448.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81fstJkUlaL._AC_SL1500_.jpg",
      name: "ASUS F512DA-EB51 VivoBook 15",
      price: 14.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71y%2BUGuJl5L._SL1500_.jpg",
      name: "DualSense Wireless Controller ",
      price: 69.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/91S1PIX%2ByWL._AC_SL1500_.jpg",
      name: "SAMSUNG 870 QVO SATA III 2.5\" SSD",
      price: 199.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/318TG3aNKpL._AC_US218_.jpg",
      name: "To Kill a Mockingbird",
      price: 14.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg",
      name: "OTG USB Pen Drive WANSENDA",
      price: 8.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61BhxjpQn6L._AC_SL1500_.jpg",
      name: "Arlo VMC2030-100NAS Essential Spotlight Camera",
      price: 99.99, 
     },
     {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg",
      name: "Introducing Fire TV Stick Lite with Alexa Voice Remote Lite",
      price: 18.99, 
     }, 
  ];

  return (
    <div className="App">
      <header className="App-header">
        <ProductTable productList={productList} columnSize={3} />
      </header>
    </div>
  );
}
