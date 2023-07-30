let str = "";
const buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (event) => {
    const inputValue = event.target.innerHTML;
    const inputBar = document.querySelector(".input_bar");

    if (inputValue === "=") {
      if (str === "") {
        inputBar.value = "";
      } else {
        try {
          if (str.includes("^")) {
            let base, exponent;

            if (str.includes("(") && str.includes(")")) {
              base = str.split("^")[0].split("(").slice(-1)[0];
              exponent = str.split("^")[1].split(")")[0];
              const result = Math.pow(Number(base), Number(exponent));
            str = str.replace(`(${base}^${exponent})`, result.toString());
            } else {
              const caretIndex = str.indexOf("^");
              base = str.substring(0, caretIndex);
              exponent = str.substring(caretIndex + 1);
              const result = Math.pow(Number(base), Number(exponent));
            str = str.replace(`${base}^${exponent}`, result.toString());
            }

          } else if (str.includes("%")) {
            let number = str.split("%")[0];
            if (number.includes("(")){
              number = number.split("(").slice(-1)[0];
              const percent1 = Number(number) / 100;
              str = number.split("(").slice(-2)[0] + "(" + percent1 + str.split("%")[1];
            }
            else {
              const percent = Number(number) / 100;
              str = percent + str.split("%")[1];
            }
          } else if (str.includes("√")) {
            const number = str.split("√")[1];
            str = str.replace(`√${number}`, Math.sqrt(Number(number)).toString());
          } else {
            str = eval(str);
          }
          inputBar.value = str;
        } catch (error) {
          inputBar.value = "Error";
          return;
        }
        str = parseFloat(str).toFixed(2);
        inputBar.value =str.toString();
      }
    } else if (inputValue === "AC") {
      str = "";
      inputBar.value = str;
    } else if (inputValue === "Clear") {
      str = str.substring(0, str.length - 1);
      inputBar.value = str;
    } else {
      str += inputValue;
      inputBar.value = str;
    }
  });
});
