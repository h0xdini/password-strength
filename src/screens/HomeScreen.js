import React, { useState, useEffect } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

const HomeScreen = () => {
    const [password, setPassword] = useState('')

    const [lowercase, setLowecase] = useState(false)
    const [uppercase, setUppercase] = useState(false)
    const [digit, setDigit] = useState(false)
    const [specialChar, setSpecialChar] = useState(false)
    const [passLength, setPassLength] = useState(false)

    const [crack, setCrack] = useState(0)

    const [notiType, setNotiType] = useState('null')

    useEffect(() => {
        if (password) {
            if (password.match(/(?=.*[a-z])/)) {
                setLowecase(true)
            } else {
                setLowecase(false)
            }

            if (password.match(/(?=.*[A-Z])/)) {
                setUppercase(true)
            } else {
                setUppercase(false)
            }
    
            if (password.match(/(?=.*\d)/)) {
                setDigit(true)
            } else {
                setDigit(false)
            }
    
            if (password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
                setSpecialChar(true)
            } else {
                setSpecialChar(false)
            }
    
            if (password.length >= 8) {
                setPassLength(true)
            } else {
                setPassLength(false)
            }
        } else {
            setLowecase(false)
            setUppercase(false)
            setDigit(false)
            setSpecialChar(false)
            setPassLength(false)
        }
    }, [password])

    useEffect(() => {
        if (password) {
            if (lowercase && uppercase && specialChar && passLength && digit) {
                setNotiType('strong')
            } else if (lowercase && uppercase && passLength) {
                setNotiType('medium')
            } else {
                setNotiType('weak')
            }
        }
    }, [password, lowercase, uppercase, specialChar, digit, passLength])

    useEffect(() => {
        if (password === '') {
            setNotiType('null')
        }
    }, [password])

    // there are 33 special characters in the ASCII encoding
    useEffect(() => {
        if (password) {
            if ((lowercase || uppercase) && !digit && !specialChar) {
                setCrack(28**(password.length) / 2000000000)
            } else if ((lowercase || uppercase) && digit && !specialChar) {
                setCrack(38**(password.length) / 2000000000)
            } else if ((lowercase || uppercase) && digit && specialChar) {
                setCrack(71**(password.length) / 2000000000)
            } else if (!(lowercase || uppercase) && digit && !specialChar) {
                setCrack(10**(password.length) / 2000000000)
            } else if (!(lowercase || uppercase) && digit && specialChar) {
                setCrack(43**(password.length) / 2000000000)
            } else if (!(lowercase || uppercase) && !digit && specialChar) {
                setCrack(33**(password.length) / 2000000000)
            }
        } else {
            setCrack(0)
        }
    }, [password, lowercase, uppercase, digit, specialChar])

  return (
    <section className='main-page'>
        <div className={`main-page-content ${notiType}`}>
            <label htmlFor="pass">Password</label>
            <input type="text" id="pass" placeholder='Type in your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="crack">{crack > 0 && crack}{crack > 0 && ' seconds'}</p>

            <div className="checkers">
                <span className="lower-case">
                    <BsFillCheckCircleFill className={`icon ${lowercase ? 'active' : ''}`}  />
                    <p>At least one lowecase letter</p>
                </span>
                <span className="upper-case">
                    <BsFillCheckCircleFill className={`icon ${uppercase ? 'active' : ''}`}  />
                    <p>At least one uppercase letter</p>
                </span>
                <span className="digit">
                    <BsFillCheckCircleFill className={`icon ${digit ? 'active' : ''}`} />
                    <p>At least one digit</p>
                </span>
                <span className="special-char">
                    <BsFillCheckCircleFill  className={`icon ${specialChar ? 'active' : ''}`} />
                    <p>At least one special character</p>
                </span>
                <span className="length">
                    <BsFillCheckCircleFill  className={`icon ${passLength ? 'active' : ''}`} />
                    <p>Minimum length of 6 characters</p>
                </span>
            </div>
        </div>
    </section>
  )
}

export default HomeScreen