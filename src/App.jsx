import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuidelineComponent from './GuidelineComponent';
import fetchRecords from './API/fetchRecords';
import { Button, Form, FormLabel } from 'react-bootstrap';

const App = () => {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [goals, setGoals] = useState([]);
  const [allFunctions, setAllFunctions] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [standards, setStandards] = useState([]);
  const [goal, setGoal] = useState("");
  const [functionValue, setFunctionValue] = useState("");
  const [objective, setObjective] = useState("");
  const [standardSet, setStandardSet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await ZOHO.CREATOR.init();
      const queryParams = await ZOHO.CREATOR.UTIL.getQueryParams();
      const getRecords = await fetchRecords("All_Questionnaire_Line_Items", `Questionnaire_Form == ${queryParams.QID}`);
      const getGoals = [...new Set(getRecords.map(rec => rec.CR_Goal.display_value))];
      const getFunctions = [...new Set(getRecords.map(func => func.CS_Function.display_value))];
      const getObjectives = [...new Set(getRecords.map(rec => rec.Objective.display_value))];
      const getStandards = [...new Set(getRecords.map(rec => rec.Standard_Set.display_value))];


      setObjectives(getObjectives);
      setAllFunctions(getFunctions);
      setGoals(getGoals);
      setAllRecords(getRecords);
      setRecords(getRecords);
      setStandards(getStandards);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const getRecords = filterRecords();
    setRecords(getRecords);
  }, [goal, functionValue, objective, standardSet])
  const filterRecords = () => {
    return allRecords.filter(record => {
      const matchesGoal = goal === "" || record.CR_Goal.display_value === goal;
      const matchesFunction = functionValue === "" || record.CS_Function.display_value === functionValue;
      const matchesObjective = objective === "" || record.Objective.display_value === objective;
      const matchesStandard = standardSet === "" || record.Standard_Set.display_value === standardSet;

      return matchesGoal && matchesFunction && matchesObjective && matchesStandard;
    });
  };

  // Update state and filter records when dropdowns change
  const handleGoalSelect = (event) => {
    const selectedGoal = event.target.value;
    setGoal(selectedGoal);
  };

  const handleFunctionsChange = (event) => {
    const selectedFunction = event.target.value;
    setFunctionValue(selectedFunction);
  };

  const handleObjectiveChange = (event) => {
    const selectedObjective = event.target.value;
    setObjective(selectedObjective);
  };

  const handleStandardSetChange = (event) => {
    const selectedStandardSet = event.target.value;
    setStandardSet(selectedStandardSet);
  };

  const handleClear = () => {
    setGoal("");
    setFunctionValue("");
    setObjective("");
    setStandardSet("");
    setRecords(allRecords); // Reset to original records
  };

  return (
    <div className='p-2 bg-gray-100 min-h-[100vh]'>
      {
        loading === true ?
          (
            <>
              <div className='text-center'>Loading...</div>
            </>
          )
          :
          (
            <>
              <div className='bg-blue-600 text-white shadow-md rounded flex justify-between p-3'>
                <div className='flex justify-around w-full'>
                  <Form.Group>
                    <FormLabel>Goals</FormLabel>
                    <Form.Select className='w-[200px]' onChange={handleGoalSelect} value={goal}>
                      <option value="">Select</option>
                      {goals.map((rec, index) => (
                        <option value={rec} key={index}>{rec}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <FormLabel>Functions</FormLabel>
                    <Form.Select className='w-[200px]' onChange={handleFunctionsChange} value={functionValue}>
                      <option value="">Select</option>
                      {allFunctions.map((rec, index) => (
                        <option value={rec} key={index}>{rec}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <FormLabel>Objectives</FormLabel>
                    <Form.Select className='w-[200px]' onChange={handleObjectiveChange} value={objective}>
                      <option value="">Select</option>
                      {objectives.map((rec, index) => (
                        <option value={rec} key={index}>{rec}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <FormLabel>Standard</FormLabel>
                    <Form.Select className='w-[200px]' onChange={handleStandardSetChange} value={standardSet}>
                      <option value="">Select</option>
                      {standards.map((rec, index) => (
                        <option value={rec} key={index}>{rec}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className='flex justify-center items-end'>
                    <Button variant='danger' size='sm' onClick={handleClear}>Clear</Button>
                  </div>
                </div>
              </div>
              <div className='mt-3'>
                {records.map((record, index) => (
                  <GuidelineComponent key={record.ID} index={index} record={record} />
                ))}
              </div>
            </>
          )
      }


    </div>
  );
};

export default App;
