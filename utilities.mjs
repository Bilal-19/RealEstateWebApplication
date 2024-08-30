const preventBrowserRefresh = (event) => event.preventDefault();


const formInputValidation = (elem, errorID, successMessage, errorMessage) => {
    if (elem.checkValidity() && elem.value !== "") {
        elem.style.border = "thin solid green";
        document.getElementById(errorID).textContent = successMessage;
        document.getElementById(errorID).style.color = "green";
    } else {
        elem.style.border = "thin solid red";
        document.getElementById(errorID).textContent = errorMessage;
        document.getElementById(errorID).style.color = "red";
    }
};



export { preventBrowserRefresh, formInputValidation }