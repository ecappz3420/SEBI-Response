import React, { useEffect, useState } from 'react'
import fetchRecords from './API/fetchRecords'
import GuidelineL2 from './GuidelineL2';

const GuidelineComponentL2 = ({ record }) => {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const getRecords = await fetchRecords("Questionnaire_Line_Items_Level_2_Report", `Questionnaire_Line_Items == ${record.ID}`);
            setRecords(getRecords);
        }
        fetch();
    }, [record.ID]);
    return (
        <>
                {
                    records && records.map((rec, index) => (
                        <GuidelineL2 key={index} index={index} record={rec}/>
                    ))
                }
        </>
    )
}

export default GuidelineComponentL2