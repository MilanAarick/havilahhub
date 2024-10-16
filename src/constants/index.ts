import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms";

type ConstantsProps = {
  //   landingPageMenu: MenuProps[];
  signUpForm: AuthFormProps[];
  signInForm: AuthFormProps[];

  // groupPageMenu: GroupMenuProps[]
};

export const CONSTANTS: ConstantsProps = {
  //   landingPageMenu: LANDING_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
};
