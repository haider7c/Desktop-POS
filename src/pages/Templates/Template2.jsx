import React from "react";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// import logo from "../../../assets/Images/logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logoInvoiceSec: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoInvoicesub: {
    display: "flex",
    flexDirection: "col",
  },
  companyDec1: {
    display: "flex",
    flexDirection: "column",
  },
  hrLine: {
    borderBottom: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
  },
  sec2Left: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  sec2Main: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  invoiceHeading: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "",
    fontSize: 12,
    // backgroundColor: "black",
    // color: "white",
    // borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // marginVertical: 10,
  },
  invHeadingLeft: {
    display: "flex",
    flexDirection: "column",
    // gap: 20,
  },
  invHeadingRight: {
    display: "flex",
    flexDirection: "column",
    // gap: 20,
  },
  sec2Right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  poNumSec: {
    display: "flex",
    flexDirection: "row",
  },
  notesTerms: {
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
  },
  itemRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  totalsSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: 10,
  },
  invoiceSerial: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },
  poDateRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  poDateRow1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    color: "gray",
  },
  poDateRow2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },
  companySecRow: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  sec2Left1: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  sec2Left2: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  itemRow1: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "70%",
  },
  itemRow2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  totalSubSec: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  totalLeft: {
    display: "flex",
    flexDirection: "column",
    color: "gray",
  },
  totalRight: {
    display: "flex",
    flexDirection: "column",
  },
  mainDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastSec: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Create Document Component
const Template2 = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Logo and Header */}
          <View style={styles.mainDiv}>
            <View style={styles.logoInvoicesub}>
              <Text style={{ fontSize: 20, marginVertical: 10 }}>INVOICE</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}># {data?.serialNumb}</Text>
            </View>
          </View>
          {/* Billing and Invoice Details */}
          <View style={styles.sec2Main}>
            <View style={styles.sec2Left}>
              <View style={styles.companySecRow}>
                <View style={styles.sec2Left1}>
                  <Text style={{ fontSize: 10, color: "gray" }}>
                    Company Name:
                  </Text>
                  <Text style={{ fontSize: 10, color: "gray" }}>
                    Company Address:
                  </Text>
                </View>
                <View style={styles.sec2Left2}>
                  <Text style={{ fontSize: 10 }}>{data?.companyName}</Text>
                  <Text style={{ fontSize: 10 }}>{data?.addressFrom}</Text>
                </View>
              </View>
            </View>
            <View style={styles.sec2Right}>
              <View style={styles.poDateRow}>
                <View style={styles.poDateRow1}>
                  <Text style={{ fontSize: 10 }}>Date:</Text>
                </View>
                <View style={styles.poDateRow2}>
                  <Text style={{ fontSize: 10 }}>{data?.date}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.invoiceHeading}>
            <View style={styles.invHeadingLeft}>
              <Text>#</Text>
              <Text>DESCRIPTION</Text>
            </View>
            <View style={styles.invHeadingRight}>
              <Text>QUANTITY</Text>
              <Text>Rate</Text>
              <Text>AMOUNT</Text>
            </View>
          </View>
          {/* Invoice Items */}
          {data?.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemRow1}>
                <Text>{index + 1}</Text>
                <Text>{item.description}</Text>
              </View>
              <View style={styles.itemRow2}>
                <Text>{item.quantity}</Text>
                <Text>{item.rate}</Text>
                <Text>{item.amount}</Text>
              </View>
            </View>
          ))}
          {/* Horizontal Line */}
          <View style={styles.hrLine} />
          {/* Notes and Terms */}
          <View style={styles.lastSec}>
            <View style={styles.notesTerms}>
              <Text>Notes: {data?.notes}</Text>
              <Text>Terms: {data?.terms}</Text>
            </View>
            <View style={styles.totalsSection}>
              <View style={styles.totalSubSec}>
                <View style={styles.totalLeft}>
                  <Text>Subtotal:</Text>

                  <Text>Shipping:</Text>
                  <Text>Amount Paid:</Text>
                  <Text>Total:</Text>
                  <Text>Balance Due:</Text>
                </View>
                <View style={styles.totalRight}>
                  <Text>{data?.subtotal}</Text>

                  <Text>{data?.shipping}</Text>
                  <Text>{data?.amountPaid}</Text>
                  <Text>
                    {data?.total} {data?.currency}{" "}
                  </Text>
                  <Text>
                    {data?.balanceDue} {data?.currency}{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2;
