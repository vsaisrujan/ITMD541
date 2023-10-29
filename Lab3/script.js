document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tip-form");
    const billTotal = document.getElementById("bill-total");
    const tipPercentage = document.getElementById("tip-percentage");
    const tipAmount = document.getElementById("tip-amount");
    const totalBill = document.getElementById("total-bill");
    const tip = document.getElementById("tip");

    form.addEventListener("input", ToUpdateTip);

    function ToUpdateTip() {
        const billInputValue = billTotal.value;
        const tipValue = parseFloat(tip.value);

        if (billInputValue === "") {
            clearFields();
            return;
        }

        if (!isNumeric(billInputValue)) {
            alert("Please enter a valid number for the Bill Total.");
            clearFields();
            return;
        }

        const bill = parseFloat(billInputValue);

        tipPercentage.value = tipValue;
        const tipValueDecimal = (tipValue / 100) * bill;
        tipAmount.value = tipValueDecimal.toFixed(2);
        totalBill.value = (bill + tipValueDecimal).toFixed(2);
    }

    function clearFields() {
        billTotal.value = "";
        tipPercentage.value = "";
        tipAmount.value = "";
        totalBill.value = "";
    }

    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
});
