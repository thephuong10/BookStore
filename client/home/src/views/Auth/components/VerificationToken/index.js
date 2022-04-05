import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  VerificationTokenPaperStyled,
  VerificationTokenInputStyled,
  VerificationTokenTimerStyled,
} from "./styles";
import Typography from "../../../../components/Typography";
import useCountDown from "../../../../customs/hooks/useCountDown";
import { classnames } from "../../../../utils/handleClassname";
import Button from "../../../../components/Button";
import { ReactComponent as LockIcon } from "../../../../assets/svg/lock.svg";
import variables from "../../../../utils/styles/variables";

const VerificationToken = ({
  duration = 10 * 1000,
  onSubmit,
  onSendTo,
  loadingConfirm = false,
  loadingSendTo = false,
  error = "",
}) => {
  const [disable, setDisable] = useState({
    confirm: true,
    sendTo: true,
  });
  const tokenRef = useRef(null);
  const expriedRef = useRef(false);
  const handleCheckFullToken = useCallback((token) => {
    if (!expriedRef.current && token) {
      setDisable(() => ({
        ...disable,
        confirm: false,
      }));
      tokenRef.current = token;
    }
  }, []);
  const handleExpried = useCallback((status) => {
    expriedRef.current = status;
    var idTimeout = setTimeout(() => {
      setDisable(() => ({
        confirm: expriedRef.current,
        sendTo: !expriedRef.current,
      }));
      clearTimeout(idTimeout);
    }, 100);
  }, []);
  const handleSubmit = (type) => () => {
    if (type === "confirm") {
      if (!expriedRef.current && tokenRef.current) {
        onSubmit(tokenRef.current);
      }
    } else {
      if (expriedRef.current && tokenRef.current) {
        onSendTo(tokenRef.current);
      }
    }
  };
  return (
    <VerificationTokenPaperStyled>
      <LockIcon />
      <Typography
        fullWidth
        align="center"
        css={`
          font-size: 15px;
          line-height: 1.2;
          padding: 16px 8px;
          font-weight: bold;
          margin-bottom: 10px;
        `}
      >
        Mã xác nhận đã được gửi tới email bạn vừa đăng ký . Vui lòng tới gmail
        lấy mã và nhập tại đây
      </Typography>
      <VerificationTokenInput onChange={handleCheckFullToken} />
      <VerificationTokenTimer duration={duration} onChange={handleExpried} />
      {!error ? (
        <></>
      ) : (
        <Typography
          fullWidth
          align="center"
          css={`
            font-size: 15px;
            line-height: 1.2;
            padding: 5px;
            font-weight: bold;
            margin: 10px 0;
            color: ${variables.ui.colors.danger};
          `}
        >
          {error}
        </Typography>
      )}
      <Button
        disable={disable.confirm}
        onClick={handleSubmit("confirm")}
        loading={loadingConfirm}
        css={`
          margin: 10px 0;
          width: 100%;
          max-width: 200px;
        `}
      >
        <Typography
          fullWidth
          css={`
            padding: 0;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.1;
          `}
        >
          Xác nhận
        </Typography>
      </Button>
      <Button
        disable={disable.sendTo}
        onClick={handleSubmit("sendTo")}
        loading={loadingSendTo}
        css={`
          margin: 10px 0;
          width: 100%;
          max-width: 200px;
        `}
      >
        <Typography
          fullWidth
          css={`
            padding: 0;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.1;
          `}
        >
          Gửi lại mã
        </Typography>
      </Button>
    </VerificationTokenPaperStyled>
  );
};

export default VerificationToken;

const VerificationTokenInput = ({ onChange }) => {
  const wrapElm = useRef();
  const verificationTokenInputsRef = useRef([]);
  const [verificationTokenInputs, setVerificationTokenInputs] = useState(() =>
    Array.from(Array(5)).map((item, index) => ({
      id: index,
      active: false,
      focus: false,
      content: null,
    }))
  );
  useEffect(() => {
    verificationTokenInputsRef.current = [
      ...wrapElm.current.querySelectorAll(":scope > span > input"),
    ];
  }, []);
  const hanleFocus = (index) => () => {
    const nearest = verificationTokenInputs.find((item) => !item.active);
    if (!nearest || nearest.id > index) {
      const focusElmPrev = verificationTokenInputs.find((item) => item.focus);
      focusElmPrev && (focusElmPrev.focus = false);
      verificationTokenInputs.find((item) => item.id === index).focus = true;
      const IpElm = verificationTokenInputsRef.current[index];
      IpElm && IpElm.focus();
    } else {
      nearest.focus = true;
      const IpElm = verificationTokenInputsRef.current[nearest.id];
      IpElm && IpElm.focus();
    }
    setVerificationTokenInputs(() => [...verificationTokenInputs]);
  };
  const handleOnChange = (e, index) => {
    const parentElm = verificationTokenInputs.find((item) => item.id === index);
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      if (parentElm) {
        parentElm.content = e.key;
        parentElm.active = true;
        const nextIpElm = verificationTokenInputsRef.current[index + 1];
        nextIpElm && nextIpElm.focus();
        const nextElm = verificationTokenInputs.find(
          (item) => item.id === parentElm.id + 1
        );
        nextElm && (nextElm.focus = true);
        parentElm.focus = false;
        if (
          verificationTokenInputs.every(
            (item) => item.content || item.content === 0
          )
        ) {
          onChange(
            verificationTokenInputs.reduce((acc, cur) => acc + cur.content, "")
          );
        } else {
          onChange(null);
        }
        setVerificationTokenInputs(() => [...verificationTokenInputs]);
      }
    }
  };
  return (
    <VerificationTokenInputStyled ref={wrapElm}>
      {verificationTokenInputs.map((item) => (
        <span
          key={item.id}
          className={classnames({
            focus: item.focus,
            active: item.active,
          })}
        >
          <input
            type="text"
            onClick={hanleFocus(item.id)}
            onKeyDown={(e) => handleOnChange(e, item.id)}
          />
          <span
            className={classnames({
              show: item.active,
            })}
          >
            {item.content}
          </span>
        </span>
      ))}
    </VerificationTokenInputStyled>
  );
};
const VerificationTokenTimer = ({ duration, onChange }) => {
  const firstRef = useRef(true);
  const timer = useCountDown({
    miliSec: duration,
    repeat: 1000,
  });
  useEffect(() => {
    if (!firstRef.current) {
      if (timer.sec === 0 && timer.minutes === 0) {
        onChange(true);
      }
    }
    firstRef.current = false;
  }, [timer]);
  return (
    <VerificationTokenTimerStyled>
      <div
        className={`${
          timer.minutes === 0 && timer.sec <= 30 ? "timer-warning" : ""
        }`}
      >
        <CountDownItem value={parseInt(timer.minutes / 10)} />
        <CountDownItem value={timer.minutes % 10} />
        <strong>:</strong>
        <CountDownItem value={parseInt(timer.sec / 10)} />
        <CountDownItem value={timer.sec % 10} />
      </div>
    </VerificationTokenTimerStyled>
  );
};
const CountDownItem = React.memo(({ value = 0 }) => {
  const numberRef = useRef();
  const firstRef = useRef(true);
  useEffect(() => {
    if (!firstRef.current) {
      numberRef.current.classList.add("hide");
      var idTimeout = setTimeout(() => {
        numberRef.current.classList.remove("show");
        numberRef.current.classList.remove("hide");
        clearTimeout(idTimeout);
      }, 800);
    }
  }, [value]);
  useEffect(() => {
    if (!firstRef.current) {
      numberRef.current.classList.add("show");
    }
  });
  useEffect(() => {
    // var idTimeout = setTimeout(() => {
    //   numberRef.current.classList.add("hide");
    //   clearTimeout(idTimeout);
    // }, 800);
    firstRef.current = false;
  }, []);
  return (
    <span>
      <span ref={numberRef}>{value}</span>
    </span>
  );
});
