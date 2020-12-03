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

exports.formatCustomer = function ({ _id, email, type, name, lastName }) {
  return {
    id: _id.toString(),
    name,
    lastName,
    email,
    type,
  };
};

exports.formatVendor = function ({
  _id,
  email,
  type,
  name,
  lastName,
  companyName,
  companyDomainName,
}) {
  return {
    id: _id.toString(),
    name,
    lastName,
    email,
    type,
    companyName,
    companyDomainName,
  };
};
