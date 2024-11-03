import React, { useState } from 'react'
import fetchRecord from './API/fetchRecord';
import { Accordion } from 'react-bootstrap';

const GuidelineL3 = ({ index, record }) => {
    const [guidelineL3, setGuidelineL3] = useState({});
    useEffect(() => {
        const fetch = async () => {
            const getRecord = await fetchRecord("Guideline_Level_3_Report",record.ID);
            setGuidelineL3(getRecord);
        }
        fetch();
    }, [record])

    return (
        <>
      <Accordion>
        <Accordion.Item eventKey={index}>
            <Accordion.Header>{guidelineL3.Guideline_Description}</Accordion.Header>
            <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>
        </>
    )
}

export default GuidelineL3