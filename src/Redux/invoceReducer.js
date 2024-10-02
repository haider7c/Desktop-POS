import { createSlice } from "@reduxjs/toolkit";

// Retrieve form details from localStorage
const savedFormDetails = localStorage.getItem("formDetails")
  ? JSON.parse(localStorage.getItem("formDetails"))
  : {
      image: null,
      items: [
        {
          description: "",
          quantity: "1",
          rate: "",
          amount: "",
        },
      ],
      notes: "",
      terms: "",
      discount: "",
      percentageDiscount: "",
      tax: "",
      shipping: "",
      amountPaid: "",
      subtotal: "",
      total: "",
      balanceDue: "",
      currency: "",
      serialNumb: "",
      addressFrom: "",
      billTo: "",
      shipTo: "",
      date: "",
      payterms: "",
      dueDate: "",
      poNumber: "",
      companyName: "",
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
