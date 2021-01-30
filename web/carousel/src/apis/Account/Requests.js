import { message } from "antd";
import { configConsumerProps } from "antd/lib/config-provider";
import services from "../services";

// This piece of code assumes that the functions are used for "addresses" or "credit cards"

const getElements = (field, setState) => {
  const TOKEN = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  services
    .get("customer/me", config)
    .then((res) => {
      const list = res.data.data[field] || [];
      setState(list);
    })
    .catch((err) => console.log(err));
};

const patchField = async (field, list, setState) => {
  const TOKEN = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const res = await services.patch("customer/me", { [field]: list }, config);
  setState(res.data.data[field]);
};

const handleAddItem = (field, setState, currentList, newItem) => {
  const newList = [...currentList, { ...newItem }];
  patchField(field, newList, setState)
    .then()
    .catch((err) => {
      message.error("Failed to add");
    });
};

const handleRemoveItem = (field, setState, currentList, id) => {
  const newList = currentList.filter((item) => item._id !== id);

  patchField(field, newList, setState)
    .then()
    .catch((err) => {
      message.error("Failed to remove");
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

  patchField(field, newList, setState)
    .then()
    .catch((err) => {
      message.error("Failed to update");
      console.log(err);
    });
};

export { getElements, handleAddItem, handleRemoveItem, handleUpdateItem };
