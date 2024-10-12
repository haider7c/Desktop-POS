import { createSlice } from "@reduxjs/toolkit";

// Retrieve form details from localStorage
const savedFormDetails = localStorage.getItem("formDetails")
  ? JSON.parse(localStorage.getItem("formDetails"))
  : {
      items: [
        {
          description: "",
          riceRate: "",
          safiWeight: "0",
          emptyBag: "",
          quantity: "1",
          weightBag: "0",
          kgWeight: "0",
        },
      ],
      notes: "",
      terms: "",
      labourPerBag: "",
      vehicleReg: "",
      transpExp: "",
      amountPaid: "",
      subtotal: "",
      total: "",
      balanceDue: "",
      serialNumb: "",
      billTo: "",
      phone: "",
      date: "",
    };

// Create the slice
const invoiceForm = createSlice({
  name: "invoiceForm",
  initialState: {
    formDetails: savedFormDetails, // Use the retrieved details
  },
  reducers: {
    addFormData(state, action) {
      state.formDetails = action.payload;
      // Save form details to localStorage
      localStorage.setItem("formDetails", JSON.stringify(action.payload));
    },
  },
});

// Export the action and reducer
export const { addFormData } = invoiceForm.actions;
export default invoiceForm.reducer;
