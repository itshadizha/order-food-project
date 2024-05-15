import { createContext, useReducer } from "react";
import { BASE_URL } from "../utils/general";
export const MealContext = createContext();

const initState = {
  meals: [],
  basket: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_MEALS":
      return {
        ...state,
        meals: action.payload,
      };

    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: action.payload,
      };

    default:
      return state;
  }
};

export const MealProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const getBasket = async () => {
    try {
      const response = await fetch(`${BASE_URL}/basket`);
      const data = await response.json();

      dispatch({ type: "ADD_TO_BASKET", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getMeals = async () => {
    try {
      const response = await fetch(`${BASE_URL}/meals`);
      const data = await response.json();
      dispatch({ type: "ADD_TO_MEALS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const addToBasket = async (item) => {
    console.log("test");
    try {
      await fetch(`${BASE_URL}/basket`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json",
        },
      });
      getBasket();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseBasket = async (item) => {
    try {
      await fetch(`${BASE_URL}/basket/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...item, amount: item.updatedAmount }),
        headers: {
          "Content-type": "application/json",
        },
      });
      getBasket();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBasketMeal = async (id) => {
    try {
      await fetch(`${BASE_URL}/basket/${id}`, {
        method: "DELETE",
      });
      getBasket();
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    addToBasket,
    state,
    getMeals,
    getBasket,
    increaseBasket,
    deleteBasketMeal,
  };

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};
