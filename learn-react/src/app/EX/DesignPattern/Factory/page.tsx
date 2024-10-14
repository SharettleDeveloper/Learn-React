type ButtonType = "primary" | "secondary" | "danger";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

interface StyleButtonProps extends ButtonProps {
  type: ButtonType;
}

const PrimaryButton = ({ label, onClick }: ButtonProps) => (
  <button style={{ backgroundColor: "blue", color: "white" }} onClick={onClick}>
    {label}
  </button>
);

const SecondButton = ({ label, onClick }: ButtonProps) => (
  <button style={{ backgroundColor: "gray", color: "black" }} onClick={onClick}>
    {label}
  </button>
);

const DangerButton = ({ label, onClick }: ButtonProps) => (
  <button style={{ backgroundColor: "red", color: "white" }} onClick={onClick}>
    {label}
  </button>
);

const ButtonFactory = (type: ButtonType, props: ButtonProps) => {
  switch (type) {
    case "primary":
      return <PrimaryButton {...props} />;
    case "secondary":
      return <SecondButton {...props} />;
    case "danger":
      return <DangerButton {...props} />;
  }
};
