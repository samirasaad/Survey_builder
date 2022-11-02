const Button = ({ content, handleClick, type = "button", className }) => {
  return (
    <button type={type} onClick={handleClick} className={className}>
      {content}
    </button>
  );
};

export default Button;
