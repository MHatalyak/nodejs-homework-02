import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

import { bodyChecker } from "../../middlewares/index.js";

import { validator } from "../../decorators/index.js";

import { contactAddSchema } from "../../schemas/contacts-scema.js";

const contactsAddValidate = validator(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post(
  "/",
  bodyChecker,
  contactsAddValidate,
  contactsController.addContact
);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  bodyChecker,
  contactsAddValidate,
  contactsController.updateContactById
);

export default contactsRouter;
