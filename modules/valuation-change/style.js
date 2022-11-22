import styled from "styled-components";

export const ValuationData = styled.div`
  // line-height: 1.6;
  // font-size: ${(props) => props.theme.typography.m.fontSize};
  // color: ${(props) => props.theme.colors.neutral[900]};
  // margin-bottom: ${(props) => props.theme.space.s};
  `;

export const HousePrice = styled.span`
  font-size: ${(props) => props.theme.typography.m.fontSize};
  font-weight: bold;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.neutral[900]};
`

export const ValuationContainer = styled.div`
  // line-height: 1.6;
  // font-size: ${(props) => props.theme.typography.m.fontSize};
  display: flex;
  justify-content: space-between;
`

export const PurchaseValues = styled.p`
  display: flex;
  sflex-direction: row;
`

export const PurchaseText = styled.p`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  `

export const PurchasePercent = styled.p`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  padding-left: 5px
`

export const Highlighted = styled.p`
  border-radius: 5em;
  padding: 0 0.5em 0 0.5em;
  background: red; 
  ${({ positive }) => positive && `
  background: #c2f7e1;
`}
`