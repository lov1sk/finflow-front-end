export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const urls = {
  AUTH: {
    POST_SIGN_IN: `${BACKEND_URL}/user/login`,
    POST_SIGN_UP: `${BACKEND_URL}/user/signUp`,
    PATCH_FORGOT_PASSWORD: `${BACKEND_URL}/user/forgotPassword`,
    PATCH_RESET_PASSWORD: `${BACKEND_URL}/user/resetPassword`,
    // TODO: forgot password
  },
  USER: {
    GET_PROFILE: `${BACKEND_URL}/user/profile`,
    PUT_UPDATE: `${BACKEND_URL}/user/update`,
  },
  TRANSACTIONS: {
    POST_CREATE_TRANSACTION: `${BACKEND_URL}/user/newTransaction`,
    DELETE_TRANSACTION: `${BACKEND_URL}/user/transaction/delete`,
    GET_TRANSACTIONS: `${BACKEND_URL}/user/transaction/findAllWithPagination`,
    GET_CATEGORIES: `${BACKEND_URL}/user/transaction/categories`,
  },
};
