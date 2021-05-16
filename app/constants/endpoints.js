export const AUTH = 'auth';
export const POSTS = 'typicode/demo/posts';
export const USERS = 'users';
export const REGISTRATION = `users/registration`;
export const SIGN_IN = `users/login`;
export const CREATE_AD = userId => `users/${userId}/ads`;

export const DRONES = 'drones';
export const CAMERAS = 'action_cameras';
export const RACER_DRONES = 'racer_drones';
export const ACCESSORIES = `accessories`;
export const PRODUCTS = `products`;
export const ORDERS = `orders`;
export const CHANGE_PASSWORD = `user/savePassword`;
export const USERS_ID = userId => `users/${userId}`;
export const ADD_PRODUCTS = id => `add_product/${id}`;
export const DELETE_PRODUCTS = id => `delete_product/${id}`;
export const CART = userId => `users/${userId}/active_order`;
export const CONFIRM = 'confirm_order';
