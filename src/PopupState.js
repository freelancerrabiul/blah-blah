import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const MenuItems = [
  {
    value: "Recently added",
    label: "Recently added",
  },
  {
    value: "First Name",
    label: "First Name",
  },
  {
    value: "Last Name",
    label: "Last Name",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "17ch",
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className=" popupState"
    >
      <div className="pt-2">
        <p
          className="mt-1 text-muted font-weight-light"
          style={{ fontSize: "small" }}
        >
          Short By:{" "}
        </p>
      </div>
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
          
            id="standard-select-currency"
            select
            value={currency}
            onChange={handleChange}
            InputProps={{ disableUnderline: true }}
          >
            {MenuItems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </div>
    </div>
  );
}
