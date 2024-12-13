import React, { useEffect, useRef, useState } from 'react'

const Otp = ({ otpLenght = 6 }) => {

    const [otp, setOtp] = useState(new Array(otpLenght).fill(""));
    const inputRef = useRef([]);

    const setInputValue = (value, i) => {
        setOtp((prev) => {
            const updatedOtp = [...prev];
            updatedOtp[i] = value;
            return updatedOtp;
        })
    }

    const setFocus = (i) => {
        if (i < 0 || i >= otpLenght) return;
        inputRef.current[i].focus();
    }

    const setOtpValue = (value, i) => {
        if (isNaN(value)) return;

        setInputValue(value, i);
        setFocus(i + 1);
    }

    const removeOtpValue = (i) => {
        setInputValue("", i);
        setFocus(i - 1);
        return;
    }

    const onKeyDownHandler = (e, i) => {
        const value = e.key;

        switch (value) {
            case "ArrowLeft":
                setFocus(i - 1);
                break;

            case "ArrowRight":
                setFocus(i + 1);
                break;

            case "Backspace":
                removeOtpValue(i);
                break;

            default:
                setOtpValue(value, i);
        }
    }

    useEffect(() => {
        setFocus(0);
    }, [])

    return (
        <div className='p-4 space-x-2'>
            {
                otp.map((value, i) => {
                    return (
                        <input
                            key={i}
                            className='border-2 w-14 h-14 text-center text-2xl'
                            type="text"
                            ref={(currentInput) => inputRef.current[i] = currentInput}
                            value={value}
                            onChange={() => { }}
                            onKeyDown={(e) => onKeyDownHandler(e, i)}
                        />
                    )
                })
            }
        </div>
    )
}

export default Otp