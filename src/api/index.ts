import authService from './services/authService';
import fileService from './services/fileService';
import orderService from './services/orderService';
import paymentService from './services/paymentService';
import userService from './services/userService';


const API = {
    auth: authService,
    file: fileService,
    order: orderService,
    payment: paymentService,
    user: userService,
};

export default API;