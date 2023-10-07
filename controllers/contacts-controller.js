import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";

import { controlWrapper } from "../decorators/index.js";

const listContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

export default {
  listContacts: controlWrapper(listContacts),
  getContactById: controlWrapper(getContactById),
  addContact: controlWrapper(addContact),
  updateContactById: controlWrapper(updateContactById),
  removeContact: controlWrapper(removeContact),
};
