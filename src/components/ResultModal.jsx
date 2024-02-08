import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom'

//forwardRef => we use it to forward ref changes from child component "current" to parent component so all changes on this component will be updated to parent
// useImperativeHandle => use in case we need this child component be isulated so we create like a custom object could be access from parent so parent throw the ref will access the custom object instead of default ref object
// createPortal => it is from react-dom "methods to deal with dom but react methods in general" we use it od take any jsx or element and inject it to another place 
// we used portal here coz dialog was in side content but it should be in the same level of content so we injeckt it to modal div

const ResultModal = forwardRef(({ onReset, targetTime, timeLeft }, ref) => { 
    const dialogRef = useRef()
    const isUserLost = timeLeft <= 0
    const formattedTime = (timeLeft / 1000).toFixed(2)
    const score = Math.round((1 - timeLeft / (targetTime * 1000)) * 100 ) 

    useImperativeHandle(ref, () => { 
        return {
            open() { 
               dialogRef.current.showModal()
            }

        }
    })

    return createPortal(
        <dialog ref={dialogRef} className="result-modal" onClose={ onReset }>
            {isUserLost && <h2>You Lost</h2>}
            {!isUserLost && <h2>Your Score: { score }</h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{ formattedTime } seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
               <button>Close</button>
            </form>
        </dialog>, document.getElementById('modal')
    )
})
export default ResultModal