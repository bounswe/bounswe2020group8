const mongooseConfig = require("../mongoose_config");
const Config = require("../config");
const mongoose = require("mongoose");
const Vendor = require("../models/vendor");
const MainProduct = require("../models/mainProduct");
const Product = require("../models/product");
const ProductRequest = require("../models/productRequest");
const Customer = require("../models/customer");
const ClientToken = require("../models/clientToken");
const Comment = require("../models/comment");

before(async () => {
  if (Config.env == "test") {
    console.log(Config.env);
    mongooseConfig.connect(Config);
  } else {
    console.log("ENVIRONMENT IS NOT TEST");
    return 1;
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const collections = await mongoose.connection.collections;
  keys = Object.keys(collections);
  console.log(keys);
  for (let key of keys) {
    await mongoose.connection.db.dropCollection(key, function (err, result) {
      if (err) {
        console.log("error delete collection");
      } else {
        console.log("delete collection success");
      }
    });
  }

  await Vendor.create(
    {
      _id: "600e8cdf61dde8365eec6421",
      aboutCompany: null,
      IBAN: null,
      phoneNumber: null,
      isSuspended: false,
      isActive: true,
      googleID: null,
      __type: "Vendor",
      email: "test@test123.com",
      password: "64b90f1dc7c125686f5b8e1b062e0dea6bb41d5cb4ba0007329b8819cf558093",
      name: "test1",
      lastName: "test2",
      companyName: "testCompany",
      companyDomainName: "testCompany.com",
      locations: [
        {
          _id: "600e8cdf61dde8365eec6422",
          latitude: 1,
          longitude: 2,
        },
      ],
      createdAt: 1611566303661,
      updatedAt: 1611566303906,
      notifications: [],
      __v: 0,
      verifyEmailToken: "1611566303903bd13e352be2da4d27acd5125ea701be632b155a0",
      isVerified: true,
    },
    {
      _id: "60166169b8d9852d99890afd",
      aboutCompany: null,
      IBAN: null,
      phoneNumber: null,
      isSuspended: false,
      isActive: true,
      isVerified: true,
      googleID: null,
      __type: "Vendor",
      email: "testuser2@test2.com",
      password: "d9fa5cbe9a856de9fa2d309af59842e1e146297fb3ecbc528f0f4383a690519e",
      name: "testuser2",
      lastName: "lastname2",
      companyName: "company2",
      companyDomainName: "company2.com",
      locations: [
        {
          _id: "60166169b8d9852d99890afe",
          latitude: 14,
          longitude: 16,
        },
      ],
      createdAt: 1612079465214,
      updatedAt: 1612079465310,
      notifications: [],
      verifyEmailToken: "1612079465307f00639521b457b8b047b3e08c43d0f53da4f830d",
    },
    {
      _id: "6016701fcce630376a770b3e",
      aboutCompany: null,
      IBAN: null,
      phoneNumber: null,
      isSuspended: false,
      isActive: true,
      googleID: null,
      __type: "Vendor",
      email: "deleter@test2.com",
      password: "64b90f1dc7c125686f5b8e1b062e0dea6bb41d5cb4ba0007329b8819cf558093",
      name: "testuser2",
      lastName: "lastname2",
      companyName: "company2",
      companyDomainName: "company2.com",
      locations: [
        {
          _id: "6016701fcce630376a770b3f",
          latitude: 14,
          longitude: 16,
        },
      ],
      createdAt: 1612083231318,
      updatedAt: 1612083231399,
      notifications: [],
      verifyEmailToken: "161208323139763c187631d8ac58b4abc245c1ae6a0ad6f2e07ea",
      isVerified: true,
    }
  );

  await Customer.create(
    {
      _id: "5fea8047161e5428c3caa3ba",
      isSuspended: false,
      isActive: true,
      googleID: null,
      __type: "Customer",
      email: "yavuz_kaya@gmail.com",
      isVerified: true,
      shoppingLists: [],
      addresses: [],
      creditCards: [],
      name: "Yavuz",
      lastName: "Kaya",
      verifyEmailToken: "1609203854634a27c895fd71d9f5f711bf5a04074831267396f21",
      searchHistory: [
        {
          tags: ["phone"],
          _id: "600bdd723b42739c1cb71cc8",
        },
        {
          tags: ["tablet", "blue"],
          _id: "6010371fada7b4a2dde74721",
        },
      ],
      addresses: [
        {
          _id: "5ffdf1ab47d221c5ce0b07ec",
          addressName: "Gumusplaa Mah.",
          name: "asdf",
          city: "Istanbul",
          state: "Marmara",
          zipCode: "31212",
          phone: "1231231231",
          addressLine: "coool",
        },
      ],
    },
    {
      _id: "5fea808e161e5428c3caa3c5",
      isSuspended: false,
      isActive: true,
      googleID: null,
      __type: "Customer",
      email: "derya@twzhhq.online",
      password: "d9fa5cbe9a856de9fa2d309af59842e1e146297fb3ecbc528f0f4383a690519e", //123456Abc
      name: "Derya",
      lastName: "Caliskan",
      isVerified: true,
      shoppingLists: [
        {
          _id: "6016e33228e37485bdfe8fb0",
          title: "My First List",
          wishedProducts: [
            {
              _id: "6016e33228e37485bdfe8fb1",
              productId: "60165ad88f88f5252633eb85",
              vendorId: "600e8cdf61dde8365eec6421",
            },
          ],
        },
      ],
      addresses: [],
      creditCards: [],
      currentConversations: [],
      verifyEmailToken: "1609203854634a27c895fd71d9f5f711bf5a04074831267396f61",
    }
  );
  await MainProduct.create(
    {
      _id: "60165a978f88f5252633eb82",
      tags: ["tablet"],
      title: "Apple ipad",
      rating: 0,
      numberOfRating: 0,
      parameters: [
        { values: ["64G", "16G", "256G"], name: "size" },
        {
          values: ["blue", "red", "yellow"],
          name: "color",
        },
      ],
      description: "Description",
      brand: "Apple",
      category: "electronics",
      isConfirmed: false,
    },
    {
      _id: "6016600d3f8c8a2caca3e18a",
      tags: ["computer", "laptop", "notebook"],
      title: "Apple MacBook Air",
      parameters: [
        { values: ["64G", "16G", "256G"], name: "size" },
        {
          values: ["blue", "red", "yellow"],
          name: "color",
        },
      ],
      description: "Description",
      rating: 0,
      numberOfRating: 0,
      brand: "Apple",
      soldAmount: 0,
      category: "electronics",
      isConfirmed: false,
    },
    {
      _id: "60166db6deb9ea352d8e64a4",
      tags: ["computer", "laptop", "notebook"],
      title: "Apple MacBook Pro",
      parameters: [
        { values: ["64G", "16G", "256G"], name: "size" },
        {
          values: ["blue", "red", "yellow"],
          name: "color",
        },
      ],
      description: "Description",
      rating: 0,
      numberOfRating: 0,
      brand: "Apple",
      soldAmount: 0,
      category: "electronics",
      isConfirmed: false,
    },
    {
      _id: "60167074cce630376a770b40",
      tags: ["computer", "laptop", "notebook"],
      title: "Monster Laptop",
      parameters: [
        { values: ["64G", "16G", "256G"], name: "size" },
        {
          values: ["blue", "red", "yellow"],
          name: "color",
        },
      ],
      description: "Description",
      rating: 0,
      numberOfRating: 0,
      brand: "Monster",
      soldAmount: 0,
      category: "electronics",
      isConfirmed: false,
    }
  );
  await Product.create(
    {
      _id: "60165ad88f88f5252633eb85",
      tags: ["tablet", "256gb", "red", "apple", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "red" },
      ],
      vendorSpecifics: [
        {
          _id: "60165ad88f88f5252633eb88",
          vendorID: "600e8cdf61dde8365eec6421",
          price: 600,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "60165a978f88f5252633eb82",
      default: {
        vendorID: "600e8cdf61dde8365eec6421",
        price: 600,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Apple",
      category: "electronics",
    },
    {
      _id: "60165b378f88f5252633eb89",
      tags: ["tablet", "blue", "256gb", "apple", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "blue" },
      ],
      vendorSpecifics: [
        {
          _id: "60165b378f88f5252633eb8c",
          vendorID: "600e8cdf61dde8365eec6421",
          price: 550,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "60165a978f88f5252633eb82",
      default: {
        vendorID: "600e8cdf61dde8365eec6421",
        price: 600,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Apple",
      category: "electronics",
    },
    {
      _id: "601660253f8c8a2caca3e18d",
      tags: ["computer", "laptop", "notebook", "blue", "256gb", "apple", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "blue" },
      ],
      vendorSpecifics: [
        {
          _id: "601660253f8c8a2caca3e190",
          vendorID: "600e8cdf61dde8365eec6421",
          price: 1500,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "6016600d3f8c8a2caca3e18a",
      default: {
        vendorID: "600e8cdf61dde8365eec6421",
        price: 1500,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Apple",
      category: "electronics",
    },
    {
      _id: "60166ddcdeb9ea352d8e64a7",
      tags: ["computer", "laptop", "notebook", "red", "256gb", "apple", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "red" },
      ],
      vendorSpecifics: [
        {
          _id: "60166ddcdeb9ea352d8e64aa",
          vendorID: "60166169b8d9852d99890afd",
          price: 2500,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "60166db6deb9ea352d8e64a4",
      default: {
        vendorID: "60166169b8d9852d99890afd",
        price: 2500,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Apple",
      category: "electronics",
    },
    {
      _id: "6016709dcce630376a770b43",
      tags: ["computer", "laptop", "notebook", "red", "256gb", "monster", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "red" },
      ],
      vendorSpecifics: [
        {
          _id: "6016709dcce630376a770b46",
          vendorID: "6016701fcce630376a770b3e",
          price: 2002,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
        {
          _id: "601671b6c9e00738c303b47d",
          vendorID: "600e8cdf61dde8365eec6421",
          price: 3000,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "60167074cce630376a770b40",
      default: {
        vendorID: "6016701fcce630376a770b3e",
        price: 2002,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Monster",
      category: "electronics",
    },
    {
      _id: "601670a8cce630376a770b47",
      tags: ["computer", "laptop", "notebook", "blue", "256gb", "monster", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "blue" },
      ],
      vendorSpecifics: [
        {
          _id: "601670a8cce630376a770b4a",
          vendorID: "6016701fcce630376a770b3e",
          price: 2000,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
        {
          _id: "601696b972283a5f329a809b",
          vendorID: "60166169b8d9852d99890afd",
          price: 2500,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "60167074cce630376a770b40",
      default: {
        vendorID: "6016701fcce630376a770b3e",
        price: 2000,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Monster",
      category: "electronics",
    }
  );

  await ProductRequest.create(
    {
      _id: "6016a5b4da58dc6cdca96653",
      type: "UPDATE_PRODUCT",
      status: "PENDING",
      vendorID: "600e8cdf61dde8365eec6421",
      oldValue: "60165b378f88f5252633eb89",
      newValue: {
        vendorSpecifics: {
          _id: "60165b378f88f5252633eb8c",
          vendorID: "600e8cdf61dde8365eec6421",
          price: 500,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test Cargo",
        },
      },
      messageFromAdmin: null,
    },
    {
      _id: "6016a5bada58dc6cdca92456",
      type: "ADD_EXISTING_PRODUCT",
      status: "PENDING",
      vendorID: "600e8cdf61dde8365eec6421",
      oldValue: "600e8cdf61dde8365eec6421",
      newValue: {
        vendorSpecifics: {
          vendorID: "600e8cdf61dde8365eec6421",
          price: 2000,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test Cargo",
        },
        photos: ["photo1"],
      },
      messageFromAdmin: null,
    },
    {
      _id: "6016a5bada58dc6cdca92982",
      type: "ADD_EXISTING_PRODUCT",
      status: "PENDING",
      vendorID: "600e8cdf61dde8365eec6421",
      oldValue: "600e8cdf61dde8365eec6421",
      newValue: {
        vendorSpecifics: {
          vendorID: "600e8cdf61dde8365eec6421",
          price: 1100,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test",
        },
        photos: ["photo2"],
      },
      messageFromAdmin: null,
    }
  );
  await Comment.create(
    {
      _id: "5fea85cd161e5428c3caa3cf",
      mainProductId: "60165a978f88f5252633eb82",
      customerId: "5fea8047161e5428c3caa3ba",
      text: "I really liked the product, cool!",
    },
    {
      _id: "5fea85cd161e5428c3caa3d4",
      mainProductId: "60165a978f88f5252633eb82",
      customerId: "5fea808e161e5428c3caa3c5",
      text: "Amazing product, 100% verified by myself!",
    }
  );
  await ClientToken.create(
    {
      _id: "6016bf5244524d8464eefc5b",
      tokenCode: "1612103506501709301c478126aa53b8d45290833fd6ed151a9f2",
      client: "5fea808e161e5428c3caa3c5",
      createdAt: 1612103506501,
      updatedAt: 1612103506501,
    },
    {
      _id: "6016bf5244524d8464eefc5c",
      tokenCode: "161210350673083a8e3e91350e2d915429d061382c48f1121e9c0",
      client: "60166169b8d9852d99890afd",
      createdAt: 1612103506730,
      updatedAt: 1612103506730,
    }
  );
});
