import React from "react";
import { SidebarStyled, SidebarItemStyled } from "./styles";
import Pricefilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import Authororpubliccompanyfilter from "./AuthorOrPublicCompanyFilter";
const Sidebar = () => {
  return (
    <SidebarStyled>
      <SidebarItemStyled>
        <RatingFilter />
      </SidebarItemStyled>
      <SidebarItemStyled>
        <Pricefilter />
      </SidebarItemStyled>
      <SidebarItemStyled>
        <Authororpubliccompanyfilter keySlug="author" />
      </SidebarItemStyled>
      <SidebarItemStyled>
        <Authororpubliccompanyfilter keySlug="publicCompany" />
      </SidebarItemStyled>
    </SidebarStyled>
  );
};

export default Sidebar;
