exports.formatClientToken = function ({ tokenCode, client }) {
  return { tokenCode, client: exports.formatClient(client) };
};

exports.formatClient = function ({ _id, email, type, name, lastName, isActive, isSuspended }) {
  return {
    _id: _id.toString(),
    name,
    lastName,
    email,
    type,
    isActive,
    isSuspended,
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
  creditCards,
  isActive,
  isSuspended,
}) {
  return {
    data: {
      _id: _id.toString(),
      name,
      lastName,
      email,
      addresses,
      phoneNumber,
      birthday,
      creditCards,
      isActive,
      isSuspended,
    },
  };
};

exports.formatVendor = function ({
  _id,
  email,
  companyName,
  companyDomainName,
  aboutCompany,
  address,
  locations,
  IBAN,
  isActive,
  isSuspended,
}) {
  return {
    data: {
      _id: _id.toString(),
      email,
      companyName,
      companyDomainName,
      aboutCompany,
      address,
      locations,
      IBAN,
      isActive,
      isSuspended,
    },
  };
};
