const returnMessages = {
  ERR_UNDEFINED: {
    code: -1,
    iconName: "Error",
    titles: {
      tr: "Hata",
      en: "Error",
    },
    messages: {
      tr: "Bir hata oluştu. Lütfen daha sonra tekrar dene.",
      en: "Error occurred. Please try again later.",
    },
  },
  ERR_DEVICE_ID_IS_NULL: {
    code: 1,
    messages: {
      en: "Error occurred. Please restart and try again later.",
    },
  },
  ERR_INSUFFICIENT_TOKEN: {
    code: 2,
    messages: {
      en: "Insufficient token.",
    },
    isFatal: true,
  },
  ERR_INVALID_PASSWORD: {
    code: 3,
    messages: {
      en: "Password is invalid",
    },
  },
  ERR_EMAIL_IS_INVALID: {
    code: 4,
    messages: {
      en: "Email is invalid",
    },
  },
  ERR_EMAIL_AND_PASSWORD_DOES_NOT_MATCH: {
    code: 5,
    messages: {
      en: "Email and password does not match",
    },
  },
  ERR_CLIENT_ACCOUNT_BANNED: {
    code: 6,
    messages: {
      en: "You are banned. Please try to contact us",
    },
  },
  ERR_NEW_PASSWORD_IS_INVALID: {
    code: 7,
    messages: {
      en: "Passwords do not match",
    },
  },
  ERR_CLIENT_TYPE_IS_INVALID: {
    code: 8,
    messages: {
      en: "Client type is invalid",
    },
  },
  ERR_CLIENT_IS_ALREADY_REGISTERED: {
    code: 9,
    messages: {
      en: "Client is already registered",
    },
  },
  ERR_CLIENT_DOES_NOT_EXIST: {
    code: 10,
    messages: {
      en: "Client does not exist",
    },
  },
  ERR_PASSWORDS_DO_NOT_MATCH: {
    code: 11,
    messages: {
      en: "Passwords do not match",
    },
  },
  ERR_SEND_EMAIL_FAILED: {
    code: 12,
    messages: {
      en: "Verification email could not be sent",
    },
  },
  ERR_NAME_EMPTY: {
    code: 13,
    messages: {
      en: "Client name cannot be empty",
    },
  },
  ERR_LAST_NAME_EMPTY: {
    code: 14,
    messages: {
      en: "Client last name cannot be empty",
    },
  },
  ERR_REGISTERED_WITH_GOOGLE: {
    code: 15,
    messages: {
      en: "This account is registered with Google.",
    },
  },
  ERR_INVALID_GOOGLE_ID: {
    code: 16,
    messages: {
      en: "Google id must be string",
    },
  },
  ERR_GOOGLE_ID_DOES_NOT_MATCH: {
    code: 17,
    messages: {
      en: "Google id does not match",
    },
  },
  ERR_CLIENT_EMAIL_IS_NOT_VERIFIED: {
    code: 18,
    messages: {
      en: "Client email is not verified, please verify your email",
    },
  },
  ERR_COMPANY_NAME_EMPTY: {
    code: 19,
    messages: {
      en: "Company name cannot be empty",
    },
  },
  ERR_COMPANY_DOMAIN_EMPTY: {
    code: 20,
    messages: {
      en: "Company domain name cannot be empty",
    },
  },
  ERR_VALIDATION_ERROR: {
    code: 99,
    messages: {
      tr: "Validasyon hatası",
      en: "Validation error.",
    },
  },
};

const messages = {
  RETURN_MESSAGES: returnMessages,
};

module.exports = messages;
