import {
  Typography,
  List,
  ListItem,
  ClickAwayListener,
  Box,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useStyles from "./styles";
import { classnames } from "../../utils/handleClassnames";

const sorters = [
  {
    icon: ArrowDownwardIcon,
    orderBy: "desc",
    title: "gỉảm dần",
  },
  {
    icon: ArrowUpwardIcon,
    orderBy: "asc",
    title: "tăng dần",
  },
];
const ORDER_BY_CASE = {
  asc: "tăng dần",
  desc: "giảm dần",
};
let classes;
const createOptions = (options) =>
  Array.isArray(options)
    ? options.map((item, index) => ({
        ...item,
        id: item.id || index + 1,
        active: item.active || false,
      }))
    : [];
const Sorter = ({
  menu = [],
  sx = null,
  label = "Sắp xếp theo",
  onChange = null,
  className = "",
  name = "",
  reset = null,
}) => {
  const dropdownRef = useRef();
  const firstRender = useRef(true);
  const dropdownHeight = useRef(0);
  const dropdownStatus = useRef(false);
  const [options, setOptions] = useState(() => createOptions(menu));
  classes = useStyles();
  useEffect(() => {
    const liElm = dropdownRef.current.querySelector("li");
    liElm && (dropdownHeight.current = liElm.offsetHeight * menu.length);
    !firstRender.current && setOptions(createOptions(menu));
    firstRender.current && (firstRender.current = false);
  }, [menu]);

  const handleCloseDropdown = () => {
    if (dropdownStatus.current) {
      dropdownStatus.current = false;
      dropdownRef.current.style.height = 0;
    }
  };
  const handleShowDropdown = () => {
    const height = dropdownStatus.current ? 0 : dropdownHeight.current;
    dropdownStatus.current = !dropdownStatus.current;
    dropdownRef.current.style.height = `${height}px`;
  };

  const handleOnChangeSelected = async (element) => {
    let flag = false;
    dropdownRef.current.style.height = 0;
    dropdownStatus.current = false;
    await (async () => {
      let oldElm = options.find((item) => item.active);
      let newElm = options.find((item) => item.id === element.id);
      if (!element.active) {
        element.active = true;
        flag = true;
        if (oldElm) {
          oldElm.orderBy = null;
          oldElm.active = false;
        }
        if (!element.orderBy) {
          element.orderBy = "asc";
        }
        newElm.orderBy = element.orderBy;
        newElm.active = element.active;
        setOptions([...options]);
      } else {
        if (element.orderBy !== oldElm.orderBy) {
          flag = true;
          newElm.orderBy = element.orderBy;
          setOptions([...options]);
        }
      }
    })();
    if (flag) {
      const selectedElm = options.find((item) => item.active);
      onChange && onChange(selectedElm);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleCloseDropdown}>
      <Box name={name} sx={sx} className={`${classes["select"]} ${className}`}>
        <div onClick={handleShowDropdown} className={classes["selectSelected"]}>
          <Typography
            noWrap
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            {options.every((item) => !item.active)
              ? label
              : createSelected(options.find((item) => item.active))}
          </Typography>
          <ArrowDropDownIcon
            sx={{
              marginLeft: "5px",
            }}
          />
        </div>
        <List ref={dropdownRef} className={classes["selectDropdown"]}>
          {options.map((item) => {
            const element = { ...item };
            return (
              <ListItem
                onClick={() => handleOnChangeSelected(element)}
                className={classnames({
                  active: element.active,
                })}
                key={element.id}
              >
                <Typography
                  noWrap
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  {element.title}
                </Typography>
                <SortActions parent={element} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </ClickAwayListener>
  );
};

const SortActions = ({ parent }) => {
  const handleOnClick = (item) => {
    if (
      !parent.orderBy ||
      (parent.orderBy && parent.orderBy !== item.orderBy)
    ) {
      parent.orderBy = item.orderBy;
    }
  };
  return (
    <div className={classes["selectDropdownSorter"]}>
      {sorters.map((item, index) => (
        <Box
          onClick={() => handleOnClick(item)}
          key={index}
          component={item.icon}
          className={classnames({
            active: parent.orderBy && parent.orderBy === item.orderBy,
          })}
        ></Box>
      ))}
    </div>
  );
};

export default Sorter;

const createSelected = (item) => {
  const noteContent = item.orderBy ? `(${ORDER_BY_CASE[item.orderBy]})` : "";
  return `${item.title} ${noteContent}`;
};
