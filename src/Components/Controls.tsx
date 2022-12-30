import { useState } from "react";
import { lightTheme, darkTheme } from '../Theme/Theme';
import styled, { ThemeProvider } from 'styled-components';

const BtnWrap = styled.div`
display: block;
`

const StartBtn = styled.button`
width: auto;
height: auto;
background: ${({ theme }: { theme: any }) => theme.startBgColor};
margin: 20px;
border: 1px solid gray;
color: ${({ theme }: { theme: any }) => theme.btntxtColor};
dislay: block;
border-radius: 5px;
padding: 5px 10px 5px 10px;
&[data-isshow = 'false'] {
    display: none;
}
`

const StopBtn = styled.button`
width: auto;
height: auto;
color: white;
dislay: block;
margin: 20px;
background: #FF866B;
border-radius: 5px;
padding: 5px 10px 5px 10px;
&[data-isshow = 'false'] {
    display: none;
}
`
const ResetBtn = styled.button`
width: auto;
height: auto;
margin: 20px;
background: #6B6B6B;
color: ${({ theme }: { theme: any }) => theme.startTxtColor};
dislay: block;
border-radius: 5px;
padding: 5px 10px 5px 10px;
&[data-ishide = 'false'] {
    display: none;
}
`

const LapBtn = styled.button`
width: auto;
height: auto;
margin: 20px;
background: gray;
color: ${({ theme }: { theme: any }) => theme.textColor};
dislay: block;
border-radius: 5px;
padding: 5px 10px 5px 10px;
&[data-ishide = 'true'] {
    display: none;
}
`

type Props = {
    setTimeinSec: Function
};

export default function Controls(props: Props) {
    const { setTimeinSec } = props;
    const [intervalId, setIntervalId] = useState<number>(0);
    const [show, setShow] = useState<boolean>(true);

    const handlePlayBtn = () => {
        const interval: any = setInterval(() => {
            setTimeinSec((previousState: number) => previousState + 1)
        }, 1000)
        setIntervalId(interval);
        setShow(!show);
    }

    const handleStopBtn = () => {
        clearInterval(intervalId);
        setShow(!show);
    }

    const handleResetBtn = () => {
        clearInterval(intervalId);
        setTimeinSec(0);
        setShow(show);
    }
    return (
        <>
            <ThemeProvider theme={show ? lightTheme : darkTheme}>
                <BtnWrap>
                    <StartBtn onClick={handlePlayBtn} data-isshow={show === true ? true : false}>시작</StartBtn>
                    <StopBtn onClick={handleStopBtn} data-isshow={show === false ? true : false}>중지</StopBtn>
                    <ResetBtn onClick={handleResetBtn} data-ishide={show === true ? true : false}>초기화</ResetBtn>
                    <LapBtn data-ishide={show === true ? show === true : show === false ? false : show === true}>구간 기록</LapBtn>
                </BtnWrap>
            </ThemeProvider>
        </>
    )
}