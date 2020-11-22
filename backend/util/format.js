exports.formatClientToken = function ({ tokenCode, client }) {
  return { tokenCode, client: exports.formatClient(client) };
};

exports.formatClient = function ({ _id, email, type, name, lastName }) {
  return {
    id: _id.toString(),
    name,
    lastName,
    email,
    type,
  };
};
