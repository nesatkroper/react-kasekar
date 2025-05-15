import userReduce from "./user-slice";
import meReduce from "./me-slice";
import authReduce from "./auth-slice";
import departmentReduce from "./department-slice";
import positionReduce from "./position-slice";
import customerReduce from "./customer-slice";
import customerInfoReduce from "./customerinfo-slice";
import employeeReduce from "./employee-slice";
import pcategoryReduce from "./category-slice";
import productReduce from "./product-slice";
import counterReduce from "./cart-slice";
import searchCateReduce from "./search-category-slice";
import cartReduce from "./cart-slice";
import codeReduce from "./code-slice";
import stateReduce from "./state-slice";
import cityReduce from "./city-slice";
import groupMessageReduce from "./group-message-slice";
import roleReduce from "./role-slice";
import clientCustomerReduce from "./client-cus-slice.jsx";
import inventoryReduce from "./inventory-slice";
import entryReduce from "./entry-slice";

export default {
  user: userReduce,
  me: meReduce,
  auths: authReduce,
  departments: departmentReduce,
  positions: positionReduce,
  customers: customerReduce,
  cusinfo: customerInfoReduce,
  employees: employeeReduce,
  categories: pcategoryReduce,
  products: productReduce,
  cart: cartReduce,
  searchCates: searchCateReduce,
  code: codeReduce,
  states: stateReduce,
  cities: cityReduce,
  counters: counterReduce,
  groupmessage: groupMessageReduce,
  roles: roleReduce,
  clientCus: clientCustomerReduce,
  inventory: inventoryReduce,
  entry: entryReduce,
};
