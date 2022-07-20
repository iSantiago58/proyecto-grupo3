import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDays, subDays } from "date-fns";

const Busqueda = {
  place: { label: "" },
  dates: [
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ],
  priceFrom: 0,
  priceTo: 0,
  apiCargada: false,
};
export const DefaultBusqueda = {
  place: { label: "" },
  dates: [
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ],
  priceFrom: 0,
  priceTo: 0,
  apiCargada: false,
};
const dateTimeReviver = function (key, value) {
  var a;
  var b;
  if (typeof value === "string") {
    a = /\/Date\((\d*)\)\//.exec(value);
    if (a) {
      return new Date(+a[1]);
    }
  } else if (typeof value === "array") {
    value.array.forEach(function (part, index, theArray) {
      if (typeof part === "object") {
        Object.entries(part).forEach(([key2, value2]) => {
          b = /\/Date\((\d*)\)\//.exec(value2);
          if (b) {
            part.key2 = new Date(+b[1]);
          }
        });
        value[index] = part;
      }
    });
  }

  return value;
};
function getStorageValue(key, defaultValue) {
  // getting stored value}
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved, dateTimeReviver);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [
    value,
    setValue,
    function (field, value) {
      setValue((obj) => {
        return {
          ...obj,
          [field]: value,
        };
      });
    },
  ];
};
