import React, { useEffect, useState } from 'react'
import { Accordion, AccordionHeader, AccordionItem, Breadcrumb } from 'react-bootstrap'
import fetchRecord from './API/fetchRecord';
import GuidelineComponentL2 from './GuidelineComponentL2';

const GuidelineComponent = ({ index , record }) => {
    const [recordObject, setRecordObject] = useState({});
    const [btnColor, setBtnColor] = useState("");
   
    useEffect(()=>{
        const fetch = async()=>{
            const bg_color = record.Response === "Complied" ? "bg-green-600" :
             record.Response === "Not Complied" ? "bg-red-600" :
             record.Response === "Do not Know" ? "bg-blue-600" :
             record.Response === "Partially Complied" ? "bg-orange-600":""
             setBtnColor(bg_color);
            const getRecord = await fetchRecord("All_Guidelines",record.Guideline_ID.ID);
            setRecordObject(getRecord);
        }
        fetch();
    },[record.Guideline_ID.ID]);
    
    return (
        <div>
            <Accordion className='shadow-md mb-3'>
                <AccordionItem eventKey={index}>
                    <AccordionHeader>
                        <div className='mb-2'>
                            <Breadcrumb>
                                <Breadcrumb.Item active>{record.CR_Goal.display_value}</Breadcrumb.Item>
                                <Breadcrumb.Item active>{record.CS_Function.display_value}</Breadcrumb.Item>
                                <Breadcrumb.Item active>{record.Objective.display_value}</Breadcrumb.Item>
                                <Breadcrumb.Item active>{record.Standard_Set.display_value}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className='mb-3'>{recordObject.Guideline_Description}</div>
                            <div className='flex'>
                                <div className={`${btnColor} text-white p-2 rounded text-xs`}>{record.Response}</div>
                            </div>
                        </div>
                    </AccordionHeader>
                    <Accordion.Body>
                        <GuidelineComponentL2 record={record}/>
                    </Accordion.Body>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default GuidelineComponent