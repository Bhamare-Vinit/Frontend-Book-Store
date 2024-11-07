import axios from "axios";
// http://127.0.0.1:8000/user/register/

const bookUrl = "http://127.0.0.1:8000/book/";
// const token = localStorage.getItem("access");

export const getBook = async (data) => {
  // console.log("token:", token);

  let response = await axios.get(bookUrl + "books/", {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};

const userUrl = "http://127.0.0.1:8000/user/";
export const signUp = async (data) => {
  // console.log("Ise data mil raha he ky?;:", data);
  let response = await axios.post(userUrl + "register/", data);
  // console.log("Kuch responce mil raha he ky? :", response.data);
  return response;
};

export const signIn = async (data) => {
  console.log("Im in sign in api");
  let response = await axios.post(userUrl + "login/", data);
  localStorage.setItem("access", response.data.data.access);
  console.log("done out of sign in api");
  return response;
};

const token = localStorage.getItem("access");

const cartUrl = "http://127.0.0.1:8000/cart/carts/";
export const getCart = async (t) => {
  console.log("start of get cart--------", t);
  // let response = await axios.get(bookUrl, data);
  let response = await axios.get(cartUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${t}`,
    },
  });
  return response;
};

export const addToCart = async (data) => {
  const token = localStorage.getItem("access");
  let response = await axios.post(cartUrl, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getWishlist = async (t) => {
  // console.log("token:", token);

  let response = await axios.get(bookUrl + "books/wishlist/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${t}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};

export const addToWish = async (data, t) => {
  try {
    const token = localStorage.getItem("access");
    let response = await axios.post(
      bookUrl + `books/${data.book_id}/add_to_wishlist/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      }
    );
    console.log("book updated to wishlist", response.data);
    return response;
  } catch (error) {
    console.error("Error adding book to wishlist", error);
    throw error;
  }
};
export const removeFromWish = async (data, t) => {
  try {
    // const token = localStorage.getItem("access");
    let response = await axios.post(
      bookUrl + `books/${data.book_id}/remove_from_wishlist/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      }
    );
    console.log("book removed from wishlist", response.data);
    return response;
  } catch (error) {
    console.error("Error removing book from wishlist", error);
    throw error;
  }
};
export const orderConfirm = async () => {
  try {
    const token = localStorage.getItem("access");
    let response = await axios.patch(cartUrl + "order_cart/",{}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {}
};

export const getordered = async (t) => {
  // console.log("token:", token);

  let response = await axios.get(cartUrl + "ordered-cart/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${t}`,
    },
  });
  console.log("Here is response:", response.data);
  return response;
};
