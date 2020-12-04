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

exports.formatCustomer = function ({
  _id,
  email,
  name,
  lastName,
  addresses,
  phoneNumber,
  birthday,
}) {
  return {
    id: _id.toString(),
    name,
    lastName,
    email,
    addresses,
    phoneNumber,
    birthday,
  };
};

exports.formatVendor = function ({
  _id,
  email,
  companyName,
  companyDomainName,
  aboutCompany,
  address,
  location,
  IBAN,
}) {
  return {
    id: _id.toString(),
    email,
    companyName,
    companyDomainName,
    aboutCompany,
    address,
    location,
    IBAN,
  };
};
