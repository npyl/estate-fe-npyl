import { InputAdornment, TextField } from "@mui/material";

interface OnlyNumbersInputProps {
  label: string;
  value?: number | string;
  onChange: (value: string) => void;
  adornment?: string;
}

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
  label,
  value,
  onChange,
  adornment = "",
}) => {
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, "");
    onChange(numericValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]/;
    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={handleCodeChange}
      onKeyPress={handleKeyPress}
      inputProps={{
        style: {
          height: "8px",
        },
      }}
      InputProps={{
        endAdornment: adornment ? (
          <InputAdornment position='end'>{adornment}</InputAdornment>
        ) : (
          <></>
        ),
      }}
    />
  );
};

export default OnlyNumbersInput;
