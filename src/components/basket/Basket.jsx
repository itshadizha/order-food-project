import styled from "styled-components";
import Modal from "../UI/Modal";
import BasketItem from "./BasketItem";
import TotalAmount from "./TotalAmount";
import Button from "../UI/Button";
import { useContext } from "react";
import { MealContext } from "../../context/MealContext";

const Basket = ({ onClose }) => {
  const { state } = useContext(MealContext);

  console.log(state.basket[0])

  return (
    <Modal onClose={onClose}>
      <MealContainer>
        {state.basket && state.basket.length > 0
          ? state.basket.map((item) => <BasketItem key={item.id} {...item} />)
          : null}
      </MealContainer>
      <TotalAmount />
      <ButtonsContainer>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained">Order</Button>
      </ButtonsContainer>
    </Modal>
  );
};

export default Basket;

const MealContainer = styled("div")`
  max-height: 250px;
  overflow: hidden;
  overflow-y: auto;
`;

const ButtonsContainer = styled("div")`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;
