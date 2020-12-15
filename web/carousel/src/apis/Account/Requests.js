import API from "./AccountAPI";

// This piece of code assumes that the functions are used for "addresses" or "credit cards"

const TOKEN = localStorage.getItem("token");

const getElements = (field, setState) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  API.get("customer/me", config)
    .then((res) => {
      console.log(res);
      const list = res.data.data[field] || [];
      setState(list);
    })
    .catch((err) => console.log(err));
};

const patchField = async (field, list) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const res = await API.patch("customer/me", { field: list }, config);
  console.log(res);
};

const handleAddItem = (field, setState, currentList, newItem) => {
  const newList = [...currentList, newItem];
  patchField(field, newList)
    .then(() => setState(newList))
    .catch((err) => {
      alert("Failed to add");
      console.log(err);
    });
};

const handleRemoveItem = (field, setState, currentList, id) => {
  const newList = currentList
    .filter((item) => item.id !== id)
    .map((item) => {
      if (item.id < id) {
        return item;
      } else {
        return { ...item, id: item.id - 1 };
      }
    });

  patchField(field, newList)
    .then(() => setState(newList))
    .catch((err) => {
      alert("Failed to remove");
      console.log(err);
    });
};

const handleUpdateItem = (field, setState, currentList, updatedItem) => {
  const newList = currentList.map((item) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });

  patchField(field, newList)
    .then(() => setState(newList))
    .catch((err) => {
      alert("Failed to update");
      console.log(err);
    });
};

export { getElements, handleAddItem, handleRemoveItem, handleUpdateItem };
