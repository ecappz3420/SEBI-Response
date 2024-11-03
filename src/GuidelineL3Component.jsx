import React, { useEffect, useState } from 'react'
import fetchRecord from './API/fetchRecord'
import GuidelineL3 from './GuidelineL3';

const GuidelineL3Component = ({ record_id }) => {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const getRecords = await fetchRecord("Questionnaire_Line_Items_Level_3_Report",record_id);
            setRecords(getRecords);
        }
        fetch();
    }, [record_id])
    return (
        <>
        {
            records && records.map((record, index) => (
                <GuidelineL3 key={index} index={index} record={record}/>
            ))
        }
        </>
    )
}

export default GuidelineL3Component