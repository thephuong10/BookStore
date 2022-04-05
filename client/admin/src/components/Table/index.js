import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Search } from "@mui/icons-material";
import {
  Paper,
  TableContainer,
  Table as TableElm,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  InputBase,
  Checkbox,
  Box,
  Typography,
  Pagination,
} from "@mui/material";
import variables from "../../utils/styles/variables";
import useStyles from "./styles";
import ButtonIcon from "../ButtonIcon";
import SelectBase from "../SelectBase";
import colorVariants from "../../constants/variantColorBtn";
import Sorter from "../Sorter";
import { isObject, isArray } from "../../utils/utils";
import mixin from "../../utils/styles/mixin";
import NotFoundEnity from "../../assets/images/not-found-entity.png";

let classes;
const Table = ({
  dataGrid = {
    bodyData: [],
    headData: [],
    checkboxSelection: false,
    editRow: false,
    paging: {
      count: 0,
      page: 0,
      onChange: () => {},
      limit: {},
      // limit:{
      //   onChange: () => {},
      //   options:[]
      // }
    },
    onDeleteRows: () => {},
    onEditRow: () => {},
    sx: {},
  },
  sort = {},
  search = {},
  sx = {},
  // sort = {
  //   options: [],
  //   onChange: () => {},
  // },
  // search = {
  //   onChange: () => {},
  // },
}) => {
  classes = useStyles();
  const girdElm = useRef();
  useEffect(() => {
    if (!girdElm.current.querySelector(":scope > *")) {
      girdElm.current.remove();
    }
  }, []);

  return (
    <Paper className={classes["tablePaper"]} sx={sx}>
      <Grid
        container
        ref={girdElm}
        sx={{
          margin: "16px 0 20px 0",
        }}
      >
        {isObject(sort) ? <SortTable {...sort} /> : <></>}
        {isObject(search) ? <SearchTable {...search} /> : <></>}
      </Grid>
      {isObject(dataGrid) ? <MainTable {...dataGrid} /> : <></>}
    </Paper>
  );
};

export default React.memo(Table);

const SortTable = (props) => {
  const { options, onChange, sx } = props;
  const handleOnChange = (sort) => {
    onChange && onChange(sort);
  };
  return (
    <Grid item md={6} sx={sx}>
      <Sorter
        sx={{
          justifySelf: "flex-end",
        }}
        onChange={handleOnChange}
        menu={options}
      />
    </Grid>
  );
};

const SearchTable = (props) => {
  const { onChange, sx } = props;
  const timeOutId = useRef(null);
  const handleOnChange = (e) => {
    const value = e.target.value;
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    timeOutId.current = setTimeout(() => {
      onChange && onChange(value);
    }, 500);
  };
  return (
    <Grid item md={6} sx={sx}>
      <Paper
        className={classes["tableSearch"]}
        sx={{
          justifySelf: "flex-start",
        }}
      >
        <InputBase
          onInput={handleOnChange}
          sx={{
            flex: 1,
            height: "100%",
          }}
          placeholder="Nhập nội dung muốn tìm..."
        />
        <Search
          sx={{
            marginLeft: "5px",
          }}
        />
      </Paper>
    </Grid>
  );
};
const validateCheckAll = (arr) =>
  arr.filter((i) => !i.disable).every((c) => c.active);
const MainTable = (props) => {
  const {
    bodyData,
    headData,
    checkboxSelection,
    editRow,
    paging,
    onDeleteRows,
    onEditRow,
    sx,
  } = props;
  const [checkboxes, setCheckboxes] = useState(() => []);
  const [checkAll, setCheckAll] = useState(() => validateCheckAll(checkboxes));
  useEffect(() => {
    if (isArray(bodyData) && checkboxSelection) {
      const result = bodyData.map(({ id, disable, active }, j) => ({
        id: id || j,
        active: active || false,
        disable: disable || false,
      }));
      setCheckboxes(() => [...result]);
      setCheckAll(() => validateCheckAll(result));
    }
  }, [bodyData]);

  const handleCheckAll = () => {
    const result = !checkAll;
    setCheckAll(() => result);
    setCheckboxes((oldValue) =>
      oldValue.map((item) => ({
        ...item,
        active: !item.disable ? result : item.active,
      }))
    );
  };
  const handleCheckOne = (id) => () => {
    const currentElm = checkboxes.find((i) => i.id === id);
    currentElm.active = !currentElm.active;
    const result = [...checkboxes];
    setCheckboxes(() => result);
    console.log(result.filter((i) => !i.disable));
    setCheckAll(() => validateCheckAll(result));
  };
  const handleDelete = () => {
    onDeleteRows(
      checkboxes.filter((i) => i.active && !i.disable).map((i) => i.id)
    );
  };
  const handleEditRow = (id) => () => {
    onEditRow(id);
  };
  return (
    <TableContainer
      sx={{
        overflow: "hidden",
        ...sx,
      }}
    >
      {!isArray(bodyData) ? (
        <div className={classes["tableEmpty"]}>
          <img src={NotFoundEnity} alt="" />
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: variables.colors.danger,
            }}
          >
            Không có sản phẩm nào
          </Typography>
        </div>
      ) : (
        <>
          <TableElm>
            <TableHead>
              <TableRow>
                {checkboxSelection && (
                  <TableCell
                    sx={{
                      width: "60px",
                      minWidth: "auto !important",
                    }}
                  >
                    <Checkbox checked={checkAll} onClick={handleCheckAll} />
                  </TableCell>
                )}
                {headData.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
                {editRow ? (
                  <TableCell
                    sx={{
                      width: "60px",
                      minWidth: "auto !important",
                    }}
                  >
                    <Typography
                      sx={{
                        ...mixin.textOverFlowMultiline(2),
                      }}
                    >
                      Thao tác
                    </Typography>
                  </TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {bodyData.map((item) => (
                <TableRow key={item.id}>
                  {checkboxSelection && (
                    <TableCell
                      sx={{
                        width: "60px",
                        minWidth: "auto !important",
                      }}
                    >
                      <Checkbox
                        checked={Boolean(
                          checkboxes.find((c) => c.id === item.id)?.active
                        )}
                        disabled={Boolean(
                          checkboxes.find((c) => c.id === item.id)?.disable
                        )}
                        onClick={handleCheckOne(item.id)}
                      />
                    </TableCell>
                  )}
                  {!isArray(item.rows) ? (
                    <></>
                  ) : (
                    item.rows.map((cell) => (
                      <TableCell key={cell.field}>{cell.renderCell}</TableCell>
                    ))
                  )}
                  {!editRow ? (
                    <></>
                  ) : (
                    <TableCell
                      sx={{
                        width: "60px",
                        minWidth: "auto !important",
                      }}
                    >
                      <ButtonIcon
                        onClick={handleEditRow(item.id)}
                        icon={EditIcon}
                        sx={{
                          "& svg": {
                            width: "25px",
                            height: "25px",
                          },
                        }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableElm>
          <Grid
            container
            justifyContent={"flex-end"}
            sx={{
              margin: "2rem 0 0.625rem 0",
            }}
          >
            {!checkboxSelection ? (
              <></>
            ) : (
              <Grid
                item
                md={8}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                {checkboxes.filter((i) => i.active && !i.disable).length ? (
                  <Box
                    sx={{
                      paddingLeft: "0.625rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        marginLeft: "0.5rem",
                        fontWeight: 500,
                      }}
                    >
                      Đã chọn
                      <strong>
                        {` ${
                          checkboxes.filter((i) => i.active && !i.disable)
                            .length
                        } `}
                      </strong>
                      đối tượng
                    </Typography>
                    <DeleteIcon
                      onClick={handleDelete}
                      sx={{
                        color: variables.colors.text,
                        transition: "0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          color: variables.colors.danger,
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <></>
                )}
                {isObject(paging.limit) ? (
                  <Box
                    sx={{
                      paddingRight: "0.625rem",
                      display: "flex",
                      alignItems: "center",
                      margin: "0 16px 0 auto",
                    }}
                  >
                    <SelectBase
                      values={paging.limit.options}
                      onChange={paging.limit.onChange}
                      position="top"
                    />
                  </Box>
                ) : (
                  <></>
                )}
              </Grid>
            )}
            {!isObject(paging) ? (
              <></>
            ) : (
              <Grid
                item
                md={4}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <PaginationTable {...paging} />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </TableContainer>
  );
};
const PaginationTable = ({ count, onChange, page }) => {
  const handleOnChange = (e, p) => {
    if (p !== page) {
      onChange && onChange(p);
    }
  };
  return (
    <Pagination
      className={classes["tablePaging"]}
      count={count}
      variant="outlined"
      onChange={handleOnChange}
      page={page}
    />
  );
};
