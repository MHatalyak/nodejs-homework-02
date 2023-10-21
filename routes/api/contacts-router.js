import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

import {
  authenticate,
  bodyChecker,
  idChecker,
} from "../../middlewares/index.js";

import { validator } from "../../decorators/index.js";

import {
  contactAddSchema,
  updateStatusContactSchema,
} from "../../models/contacts.js";

const contactsAddValidate = validator(contactAddSchema);
const updateStatusContactValidate = validator(updateStatusContactSchema);

const contactsRouter = express.Router();
contactsRouter.use(authenticate);
contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", idChecker, contactsController.getContactById);

contactsRouter.post(
  "/",
  bodyChecker,
  contactsAddValidate,
  contactsController.addContact
);

contactsRouter.delete(
  "/:contactId",
  idChecker,
  contactsController.removeContact
);

contactsRouter.put(
  "/:contactId",
  idChecker,
  bodyChecker,
  contactsAddValidate,
  contactsController.updateContactById
);

contactsRouter.patch(
  "/:contactId/favorite",
  idChecker,
  bodyChecker,
  updateStatusContactValidate,
  contactsController.updateStatusContact
);

export default contactsRouter;
