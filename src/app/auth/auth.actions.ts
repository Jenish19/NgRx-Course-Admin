import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const login = createAction(
  "[Login Page] User Login", //[source of the action] event or the command action corresponds to
  props<{ user: User }>()
)

export const logout = createAction(
  "[Top Menu] Logout",
  // no need of payload for logout
)


