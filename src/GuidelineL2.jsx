import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import fetchRecord from './API/fetchRecord';
import GuidelineL3Component from './GuidelineL3Component';

const GuidelineL2 = ({ record , index}) => {
    const [guidelineRecord, setGuidelineRecord] = useState({});
    useEffect(()=>{
        const fetch = async()=>{
            const getRecord = await fetchRecord("Guideline_Level_2_Report",record.Guideline.ID);
            setGuidelineRecord(getRecord);
        }
        fetch();
    },[record.Guideline.ID]);
    return (
        <>
            <Accordion className='mb-2'>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>{guidelineRecord.Guideline_Description}</Accordion.Header>
                    <Accordion.Body>
                        <GuidelineL3Component record_id={record.ID}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default GuidelineL2