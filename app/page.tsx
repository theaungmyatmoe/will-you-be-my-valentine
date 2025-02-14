'use client'
import React, {useEffect, useRef, useState} from 'react';
import {useSearchParams} from "next/navigation";


// refacotr above code in new component
const Page = () => {
    const searchParams = useSearchParams()
    const name = searchParams.get('name') || 'Su Thit';

    const [yesButtonClicked, setYesButtonClicked] = useState(false);
    const [yesButtonFontSize, setYesButtonFontSize] = useState(0)
    const [noTextIdx, setNoTextIdx] = useState(0)
    const yesButtonRef = useRef<HTMLButtonElement>(null);
    const [isYesButtonHeightOverWindowHeight, setYesButtonHeightOverWindowHeight] = useState(false);

    const noTexts = [
        "No",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Last chance!",
        "Surely not?",
        "You might regret this!",
        "Give it another thought!",
        "Are you absolutely certain?",
        "This could be a mistake!",
        "Have a heart!",
        "Don't be so cold!",
        "Change of heart?",
        "Wouldn't you reconsider?",
        "Is that your final answer?",
        "You're breaking my heart ;(",

    ]
    const onYesButtonClicked = () => {
        setYesButtonClicked(true)
    }

    const onNoButtonClick = () => {
        setYesButtonFontSize(prevWidth => prevWidth + 35)
        if (noTextIdx < noTexts.length) {
            setNoTextIdx(noTextIdx + 1)
            return
        }
    }

    useEffect(() => {
        setYesButtonHeightOverWindowHeight(yesButtonRef!.current!.offsetHeight > window.innerHeight)
    }, [yesButtonFontSize])

    return (
        <>

            {yesButtonClicked && <main className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-4xl font-bold text-red-600 text-wrap">
                    I knew you would say yes! SEE YOU Valentine 💕
                </h1>
                <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt={"Gif"}/>
            </main>}

            {/* She is not accepting */}
            {!yesButtonClicked && (
                <main className="text-center py-24 bg-gray-50 min-h-screen">
                    {isYesButtonHeightOverWindowHeight ? null :
                        <h1 className="text-4xl font-bold text-red-600">Will you be my Valentine {name}? 💐💝</h1>}
                    <div className="mt-8 space-x-8">
                        <button
                            ref={yesButtonRef}
                            className={`bg-green-500 text-white px-4 py-2 rounded`}
                            style={{
                                fontSize: yesButtonFontSize <= 0 ? 'auto' : yesButtonFontSize,
                            }}
                            onClick={onYesButtonClicked}>
                            Yes
                        </button>
                        {isYesButtonHeightOverWindowHeight ? null :
                            <button className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={onNoButtonClick}
                            >
                                {noTexts[noTextIdx]}
                            </button>}
                    </div>
                    {isYesButtonHeightOverWindowHeight ? null :
                        (
                            <div className="flex justify-center mt-8">
                                <img className="h-[200px]"
                                     src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                                     alt={"Gif"}/>
                            </div>
                        )
                    }
                </main>
            )}
        </>
    );
}

export default Page;