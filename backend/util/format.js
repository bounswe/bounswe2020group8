exports.formatClientToken = function ({ tokenCode, client }) {
  return { tokenCode, client: exports.formatClient(client) };
};

exports.formatClient = function ({ _id, email, type }) {
  return {
    id: _id.toString(),
    email,
    type
  };
};
