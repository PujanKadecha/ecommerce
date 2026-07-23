const Address = require("../models/address.model");

const addAddress = async (userId, addressData) => {
  const addressCount = await Address.countDocuments({ user: userId });

  if (addressCount === 0) {
    addressData.isDefault = true;
  }

  if (addressData.isDefault) {
    await Address.updateMany(
      {
        user: userId,
        isDefault: true,
      },
      {
        isDefault: false,
      },
    );
  }

  const address = await Address.create({
    ...addressData,
    user: userId,
  });

  return address;
};

const getAddress = async (userId) => {
  const address = await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  return address;
};

const getAddressById = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    const error = new Error("Address Not Found");
    error.statusCode = 404;
    throw error;
  }

  return address;
};

const updateAddress = async (userId, addressId, addressData) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    throw error;
  }

  if (addressData.isDefault === true) {
    await Address.updateMany(
      {
        user: userId,
        isDefault: true,
      },
      {
        isDefault: false,
      },
    );
  }

  Object.assign(address, addressData);
  await address.save();
  return address;
};

const deleteAddress = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;

    throw error;
  }
  const wasDefault = address.isDefault;
  await address.deleteOne();
  if (wasDefault) {
    const nextAddress = await Address.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });
    if (nextAddress) {
      nextAddress.isDefault = true;
      await nextAddress.save();
    }
  }
};

const setDefaultAddress = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    throw error;
  }
  await Address.updateMany(
    {
      user: userId,
      isDefault: true,
    },
    {
      isDefault: false,
    },
  );

  address.isDefault = true;
  await address.save();
  return address;
};

module.exports = {
  addAddress,
  getAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};
