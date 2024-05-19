import React from "react";

const CustomInput = (props) => {
    const {type , name, placeholder, classname, value, onChnage, onBlur,disabled } = props;
    return (
        <div>
        <input 
        type={type}
        name= {name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onChnage}
        onBlur={onBlur}
        disabled={disabled}
        />
       
    </div>

   );  
};

export default CustomInput;