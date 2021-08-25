import React, { useState, useEffect } from "react";
import * as styled from "./Sidebar.styles";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  //Props
  const {
    sidebarHeader = {
      fullName: "",
      shortName: "",
      openIcon: "",
      closeIcon: "",
    },
    menuItems = [],
  } = props;

  //Needed to indicate active as Im using a div and not a link
  const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
  const [isSidebarOpen, setSidebarState] = useState(true);
  const [header, setHeader] = useState(sidebarHeader.fullName);
  const [headerIcon, setHeaderIcon] = useState(sidebarHeader.closeIcon);

  //Updates Header Text
  useEffect(() => {
    //A mess
    function headerOpen() {
      setHeader(sidebarHeader.fullName);
      setHeaderIcon(sidebarHeader.closeIcon);
    }

    function headerClose() {
      setHeader(sidebarHeader.shortName);
      setHeaderIcon(sidebarHeader.openIcon);
    }

    isSidebarOpen ? headerOpen() : headerClose();
  }, [isSidebarOpen, sidebarHeader]);

  //Updates sidebar state to collapse or open
  useEffect(() => {
    const updateWindowWidth = () => {
      //Choosing 1280 here just as a measure of laptop screen width
      if (window.innerWidth < 1280) setSidebarState(false);
      else setSidebarState(true);
    };
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, [isSidebarOpen]);

  //Sets clicked items name as state value
  const handleMenuItemClick = (name) => {
    setSelectedMenuItem(name);
  };

  //Passing empty values as default props
  const menuItemsJSX = menuItems.map((item, index) => {
    const isItemSelected = selected === item.name;
    return (
      <Link to={item.to} key={index} style={{ textDecoration: "none" }}>
        <styled.MenuItem
          key={index}
          isSidebarOpen={isSidebarOpen}
          selected={isItemSelected}
          onClick={() => handleMenuItemClick(item.name)}
        >
          <styled.Icon
            isSidebarOpen={isSidebarOpen}
            src={isItemSelected ? item.iconSelected : item.icon}
          />
          <styled.Text isSidebarOpen={isSidebarOpen}>{item.name}</styled.Text>
        </styled.MenuItem>
      </Link>
    );
  });

  return (
    <styled.SidebarContainer isSidebarOpen={isSidebarOpen}>
      <styled.SidebarHeaderContainer>
        <styled.SidebarHeader>
          {header}
          <styled.SidebarHeaderIcon
            isSidebarOpen={isSidebarOpen}
            src={headerIcon}
            onClick={() => setSidebarState(!isSidebarOpen)}
          />
        </styled.SidebarHeader>
      </styled.SidebarHeaderContainer>
      <styled.MenuItemContainer isSidebarOpen={isSidebarOpen}>
        {menuItemsJSX}
      </styled.MenuItemContainer>
    </styled.SidebarContainer>
  );
};

export default Sidebar;
