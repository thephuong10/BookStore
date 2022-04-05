import React, { useEffect, useRef, useState } from "react";
import authorApi from "../../../../../apis/authorApi";
import publicCompanyApi from "../../../../../apis/publicCompanyApi";
import List, { ListItem } from "../../../../../components/List";
import Typography from "../../../../../components/Typography";

import { useHistory } from "react-router-dom";

import { removeUrlParam, setLocation } from "../../../../../utils/handleUrl";
import queryString from "query-string";
const CASE_SLUG = {
  author: {
    title: "Tác giả",
    fetch: authorApi.getAll,
  },
  publicCompany: {
    title: "Nhà xuất bản",
    fetch: publicCompanyApi.getAll,
  },
};
const Authororpubliccompanyfilter = ({ keySlug = "" }) => {
  const rootElm = useRef(CASE_SLUG[keySlug]);
  const [entities, setEntities] = useState([]);
  const history = useHistory();
  const param = queryString.parse(history.location.search)[keySlug];
  useEffect(() => {
    (async () => {
      const data = await rootElm.current.fetch();
      setEntities(() => [
        ...data.map((item) => ({ ...item, active: param == item.id })),
      ]);
    })();
  }, []);
  const handleOnChange = (checked, id) => {
    const current = entities.find((i) => i.id == id);
    const oldActive = entities.find((i) => i.active);
    current.active = checked;
    if (!checked) {
      history.replace(removeUrlParam(history, keySlug));
    } else {
      oldActive && (oldActive.active = false);
      history.replace(
        setLocation(history, {
          key: keySlug,
          value: id,
        })
      );
    }
    setEntities(() => [...entities]);
  };
  return (
    <>
      <Typography
        css={`
          padding: 8px 0;
        `}
      >
        {rootElm.current.title}
      </Typography>
      <List
        css={`
          padding: 0;
          max-height: 230px;
          overflow-x: hidden;
          overflow-y: auto;
        `}
      >
        {Array.isArray(entities) && entities.length ? (
          <>
            {entities.map((item, index) => (
              <ListItem
                key={index}
                hover={false}
                css={`
                  padding: 8px 5px;
                  flex-shrink: 0;
                  & > input:hover {
                    cursor: pointer;
                  }
                `}
              >
                <input
                  type="checkbox"
                  onChange={(e) => handleOnChange(e.target.checked, item.id)}
                  checked={item.active}
                />
                <Typography
                  css={`
                    padding: 0;
                    display: flex;
                    align-items: center;
                    margin-left: 5px;
                    font-size: 15px;
                    line-height: 1.4;
                  `}
                >
                  {item.name}
                </Typography>
              </ListItem>
            ))}
          </>
        ) : (
          <></>
        )}
      </List>
    </>
  );
};

export default Authororpubliccompanyfilter;
