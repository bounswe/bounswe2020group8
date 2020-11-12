exports.formatClientToken = function ({ tokenCode, client }) {
  return { tokenCode, client: exports.formatClient(client) };
};

exports.formatClient = function ({ _id, email }) {
  return {
    id: _id.toString(),
    email,
  };
};
