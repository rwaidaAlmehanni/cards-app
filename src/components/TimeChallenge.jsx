import { useState, useRef } from 'react'
import ResultModal from './ResultModal'

// Cases for useing ref:
// 1. if we need to use an element value or any proberitie or any function "access the dom element attributes or methods" and don't need to rerender the component
// 2. if we need use a variable as a copy "each tome we call the component create unique variable for component" ex: each card will have a unique timerRefbut if we use a general vaibale outside the component will override and will have the lase value

const TimeChallenge = ({ title, targetTime }) => { 
    const timerRef = useRef()
    const dialogRef = useRef()
    const [timeLeft, setTimeLeft] = useState(targetTime * 1000)
    const timerIsActive = timeLeft > 0 && timeLeft < targetTime * 1000
    
    if (timeLeft <= 0) { 
        dialogRef.current.open()
        clearInterval(timerRef.current)
     }
    
    const clickHandler = () => { 
        timerRef.current = setInterval(() => { 
            setTimeLeft((prevTime) => prevTime - 10) 
        }, 10)
    }
    const shopHandler = () => { 
        clearInterval(timerRef.current)
        dialogRef.current.open()
    }

    const resetHandler = () => { 
        setTimeLeft(targetTime * 1000)
    }

    return (
        <>
            <ResultModal ref={dialogRef} targetTime={targetTime} onReset={resetHandler} timeLeft={ timeLeft } />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{ targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={ timerIsActive ? shopHandler : clickHandler }>
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={ timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is Running ...' : 'Time inactive'} 
            </p>

            </section>
                 </>
    )
}
export default TimeChallenge