//const BACK_IP = process.env.REACT_APP_BACKEND_IP || "keypax-api.sytes.net" ;
const BACK_IP = process.env.REACT_APP_BACKEND_IP || "localhost" ;
//const BACK_PROTOCOL = process.env.REACT_APP_HTTP_PROTOCOL || "https" ;
const BACK_PROTOCOL = process.env.REACT_APP_HTTP_PROTOCOL || "http" ;
//const BACK_PORT = process.env.REACT_APP_BACKEND_PORT || "443" ;
const BACK_PORT = process.env.REACT_APP_BACKEND_PORT || "8080" ;
const BASE_URL = BACK_PROTOCOL + "://" + BACK_IP + ":" + BACK_PORT + "/";
const BASE_PUBLIC = "public/";
const BASE_PRIVATE = "private/";

const Routes = {
  URL_SIGNUP: BASE_URL + BASE_PUBLIC + "signup/",
  URL_LOGIN: BASE_URL + BASE_PUBLIC + "login/",
  URL_2FA: BASE_URL + BASE_PUBLIC + "2fa/",
  URL_CATEGORY: BASE_URL + BASE_PRIVATE + "category/",
  URL_INFO: BASE_URL + BASE_PRIVATE + "info/",
  URL_CATEGORY_LIST: BASE_URL + BASE_PRIVATE + "categories/",
  URL_INFO_LIST: BASE_URL + BASE_PRIVATE + "infos/",
  URL_FILE: BASE_URL + BASE_PRIVATE + "file"
};

export default Routes;  