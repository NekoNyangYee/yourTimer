import React, { useState, useEffect } from "react";
import styled from "styled-components";
import caculateTimer from "./CaculateTimer";
import Controls from "./Controls";

const ContentsArea = styled.div`
  width: auto;
  height: auto;
  text-align: center;
  margin-left: 120px;
  margin-right: 120px;
  display: flex;
  @media screen and (max-width: 820px) {
    display: block;
    margin-left: 50px;
    margin-right: 50px;
  }
`;
const LeftArea = styled.div`
  width: 50%;
  height: 100vh;
  @media screen and (max-width: 820px) {
    width: 100%;
    height: 50vh;
  }
`;
const RightArea = styled.div`
  width: 50%;
  height: 100vh;
  float: right;
  @media screen and (max-width: 820px) {
    width: 100%;
    height: 50vh;
  }
`;
const TimerWrap = styled.div`
  position: relative;
  width: auto;
  height: auto;
  top: 30%;
  font-size: 50px;
  @media screen and (max-width: 820px) {
    font-size: 40px;
  }
`;
const TimerName = styled.span`
  position: relative;
  font-size: 16px;
  display: block;
  left: 38px;
  letter-spacing: 75px;
  @media screen and (max-width: 820px) {
    font-size: 13px;
    letter-spacing: 60px;
    left: 30px;
  }
`;
const LapWrap = styled.div`
  position: relative;
  width: auto;
  height: 70%;
  top: 10%;
  overflow-y: scroll;
`;

const LapContainer = styled.div`
  position: relative;
  width: auto;
  height: auto;
  background-color: ${({ theme }: { theme: any }) => theme.startTxtColor};
  font-size: 20px;
  margin: 10px;
  @media screen and (max-width: 820px) {
    font-size: 15px;
  }

`;

const StopWatch = () => {
  const [count, setCount] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [lapTimes, setLapTimes] = useState<Array<number | string>>([]);

  useEffect(() => {
    const timeArray: Array<number | string> = caculateTimer(count);
    setTimerArray(timeArray);
  }, [count]);

  const handleSaveLapTime = () => {
    setLapTimes([...lapTimes, count]);
  };

  return (
    <ContentsArea>
      <LeftArea>
        <TimerWrap>
          <TimerName>
            <span>시분초</span>
          </TimerName>
          <span>{timerArray[0]}</span>
          <span> : </span>
          <span>{timerArray[1]}</span>
          <span> : </span>
          <span>{timerArray[2]}</span>
          <Controls setTimeinSec={setCount} saveLapTime={handleSaveLapTime} resetLapTimes={() => setLapTimes([])} />
        </TimerWrap>
      </LeftArea>
      <RightArea>
        <LapWrap>
          {lapTimes.map((lapTime, index) => (
            <LapContainer key={index}>
              <h2>{index + 1}번째 기록</h2>
              <p>{caculateTimer(Number(lapTime)).join(":")}</p>
            </LapContainer>
          ))}
        </LapWrap>
      </RightArea>
    </ContentsArea>
  );
};

export default StopWatch;

