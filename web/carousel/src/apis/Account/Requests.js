import { configConsumerProps } from "antd/lib/config-provider";
import services from "../services";

// This piece of code assumes that the functions are used for "addresses" or "credit cards"

const TOKEN = localStorage.getItem("token");

const getElements = (field, setState) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  services
    .get("customer/me", config)
    .then((res) => {
      console.log(res.data.data[field]);
      const list = res.data.data[field];
      setState(list);
    })
    .catch((err) => console.log(err));
};

const patchField = async (field, list, setState) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const res = await services.patch("customer/me", { [field]: list }, config);
  setState(res.data.data[field]);
  console.log(res);
};

const handleAddItem = (field, setState, currentList, newItem) => {
  console.log(`Add new ${field}`, currentList, newItem);
  const newList = [...currentList, { ...newItem }];
  patchField(field, newList, setState)
    .then()
    .catch((err) => {
      alert("Failed to add");
      console.log(err, "field to add: ", newList);
    });
};

const handleRemoveItem = (field, setState, currentList, id) => {
  console.log(`Delete ${field}`, currentList, id);

  const newList = currentList.filter((item) => item._id !== id);
  console.log(`New ${field}`, newList);

  patchField(field, newList, setState)
    .then()
    .catch((err) => {
      alert("Failed to remove");
      console.log(err);
    });
};

const handleUpdateItem = (field, setState, currentList, updatedItem) => {
  const newList = currentList.map((item) => {
    if (item._id === updatedItem._id) {
      return updatedItem;
    } else {
      return item;
    }
  });

  console.log("Updated List", updatedItem, newList);

  patchField(field, newList, setState)
    .then()
    .catch((err) => {
      alert("Failed to update");
      console.log(err);
    });
};

export { getElements, handleAddItem, handleRemoveItem, handleUpdateItem };
