import styled from "styled-components";

export const HousePrice = styled.span`
  font-size: ${(props) => props.theme.typography.m.fontSize};
  font-weight: bold;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.neutral[900]};
`

export const PurchaseValues = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width:${(props) => props.theme.breakpoints.m}px) {
    min-width:10em;
  };
`

export const PurchasePercent = styled.p`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  padding-left: 5px
`

export const RowFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

`

export const Highlighted = styled.p`
  border-radius: 5em;
  padding: 0 0.5em 0 0.5em;
  background: red; 
  ${({ positive }) => positive && `
    background: #c2f7e1;
  `};

`