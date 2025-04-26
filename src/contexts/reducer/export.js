import userReduce from "./user-slice";
import authReduce from "./auth-slice";
import departmentReduce from "./department-slice";
import positionReduce from "./position-slice";
import customerReduce from "./customer-slice";
import employeeReduce from "./employee-slice";
import pcategoryReduce from "./product-category-slice";
import productReduce from "./product-slice";
import counterReduce from "./cart-slice";
import searchCateReduce from "./search-category-slice";
import cartReduce from "./cart-slice";
import codeReduce from "./code-slice";
import stateReduce from "./state-slice";
import cityReduce from "./city-slice";
import groupMessageReduce from "./group-message-slice";

export default {
  user: userReduce,
  auths: authReduce,
  departments: departmentReduce,
  positions: positionReduce,
  customers: customerReduce,
  employees: employeeReduce,
  pcategories: pcategoryReduce,
  products: productReduce,
  cart: cartReduce,
  searchCates: searchCateReduce,
  code: codeReduce,
  states: stateReduce,
  cities: cityReduce,
  counters: counterReduce,
  groupmessage: groupMessageReduce,
};
