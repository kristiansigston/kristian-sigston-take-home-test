/* eslint-disable max-statements */
import axios from "axios";
import { add, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import { isEmpty } from "lodash";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset
} from "./style";
import ValuationChange from "../valuation-change";
import currencyFormat from "../../components/helpers/format-currency";

// const account = {
//   uid: "65156cdc-5cfd-4b34-b626-49c83569f35e",
//   deleted: false,
//   dateCreated: "2020-12-03T08:55:33.421Z",
//   currency: "GBP",
//   name: "15 Temple Way",
//   bankName: "Residential",
//   type: "properties",
//   subType: "residential",
//   originalPurchasePrice: 250000,
//   originalPurchasePriceDate: "2017-09-03",
//   recentValuation: { amount: 310000, status: "good" },
//   associatedMortgages: [
//     {
//       name: "HSBC Repayment Mortgage",
//       uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
//       currentBalance: -175000,
//     },
//   ],
//   canBeManaged: false,
//   postcode: "BS1 2AA",
//   lastUpdate: "2020-12-01T08:55:33.421Z",
//   updateAfterDays: 30,
// };

const Detail = ({ }) => {
  const [account, setAccount] = useState({})

  const getAccountData = async () => {
    try {
      const response = await axios.get('/api/account')
      setAccount(response.data.account)
    }
    catch (e) {
      // add logger services
      console.error(e);
      return {
        message: e.message,
      }
    }
  }

  useEffect(() => {
    getAccountData()
  }, [])

  if (isEmpty(account)) {
    // Make a nicer loading screen
    return <div>Loading</div>
  }

  let mortgage;
  const lastUpdate = new Date(account.lastUpdate);
  if (account.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }

  const { originalPurchasePrice, recentValuation, originalPurchasePriceDate } = account
  const housePriceData = {
    recentValuationAmount: recentValuation.amount,
    originalPurchasePrice,
    originalPurchasePriceDate
  }

  return (
    <Inset>
      <AccountSection>
        {/* Perhaps pass in the text as title */}
        <AccountLabel>Estimated Value</AccountLabel>
        {/* This is quite busy. I would perhaps hide the logic inside a convert to a readable value function */}
        {/* probably within the component itself */}
        <AccountHeadline>
          {currencyFormat(account.recentValuation.amount)}
        </AccountHeadline>
        <AccountList>
          <AccountListItem><InfoText>
            {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
          </InfoText></AccountListItem>
          <AccountListItem><InfoText>
            {`Next update ${format(
              add(lastUpdate, { days: account.updateAfterDays }),
              "do MMM yyyy"
            )}`}
          </InfoText></AccountListItem>
        </AccountList>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Property details</AccountLabel>
        <RowContainer>
          {/* AccountList = textArray={[name, bankName, postcode]} />*/}
          <AccountList>
            {/* I would pass in the text values as an array here and map over them */}
            {/* [name, bankName, postcode].map(text => <AcountListItem><InfoText>{text}</InfoText></AcountListItem>) */}
            {/* perhaps even just a return function */}
            {/* const accountListItem = (text) => <AcountListItem><InfoText>{text}</InfoText></AcountListItem>}  */}
            <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Valuation Changes</AccountLabel>
        <ValuationChange housePriceData={housePriceData} />
      </AccountSection>
      {mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList>
              <AccountListItem><InfoText>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(account.associatedMortgages[0].currentBalance)
                )}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>{account.associatedMortgages[0].name}</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      )}
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};


export default Detail;
