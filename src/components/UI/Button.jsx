import styled from "styled-components";

const Button = ({
  children,
  variant = "contained",
  borderStyle = "rounded",
  ...restProps
}) => {
  return (
    <ButtonStyle variant={variant} borderStyle={borderStyle} {...restProps}>
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button`
  background: ${props => (props.variant === "contained" ? "#8A2B06" : "#fff")};
  border-radius: ${props => (props.borderStyle === "rounded" ? "20px" : "6px")};
  font-weight: 600;
  padding: 10px 32px;
  color: ${props => (props.variant === "contained" ? "#fff" : "#8A2B06")};
  display: flex;
  align-items: center;
  border: ${props => (props.variant === "contained" ? "none" : "1px solid #8A2B06")};
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;
