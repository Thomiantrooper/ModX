import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../features/tasks/tasksSlice";
import { useDispatch } from 'react-redux';
import './AddTask.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  const dispatch = useDispatch();

  const [Model, setModel] = useState('');
  const [MaterialsInspection, setMaterialsInspection] = useState('');
  const [LinerMaterial, setLinerMaterial] = useState('');
  const [VisorMaterial, setVisorMaterial] = useState('');
  const [date, setdate] = useState('');
  const [Testing, setTesting] = useState('');
  const [QualityControlChecks, setQualityControlChecks] = useState('');
  const [Visorattachment, setVisorattachment] = useState('');
  const [Strapstrength, setStrapstrength] = useState('');
  const [Shellintegrity, setShellintegrity] = useState('');
  const [DocumentationandTraceability, setDocumentationandTraceability] = useState('');
  const [EmployeeTraining, setEmployeeTraining] = useState('');
  const [ImpactResistance, setImpactResistance] = useState(false);
  const [ImpactStandard, setImpactStandard] = useState('');
  const [ImpactResult, setImpactResult] = useState('');
  const [PenetrationResistance, setPenetrationResistance] = useState(false);
  const [PenetrationStandard, setPenetrationStandard] = useState('');
  const [PenetrationResult, setPenetrationResult] = useState('');
  const [RetentionSystem, setRetentionSystem] = useState(false);
  const [RetentionStandard, setRetentionStandard] = useState('');
  const [RetentionResult, setRetentionResult] = useState('');
  const [FieldOfVision, setFieldOfVision] = useState(false);
  const [FieldOfVisionStandard, setFieldOfVisionStandard] = useState('');
  const [FieldOfVisionResult, setFieldOfVisionResult] = useState('');

  // Validation functions
  const isFormValid = () => {
    // Perform validation for each field
    return (
      Model &&
      MaterialsInspection &&
      LinerMaterial &&
      VisorMaterial &&
      date &&
      Visorattachment &&
      Strapstrength &&
      Shellintegrity &&
      QualityControlChecks &&
      DocumentationandTraceability &&
      EmployeeTraining &&
      ((ImpactResistance && ImpactStandard && ImpactResult) || !ImpactResistance) &&
      ((PenetrationResistance && PenetrationStandard && PenetrationResult) || !PenetrationResistance) &&
      ((RetentionSystem && RetentionStandard && RetentionResult) || !RetentionSystem) &&
      ((FieldOfVision && FieldOfVisionStandard && FieldOfVisionResult) || !FieldOfVision)
    );
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill out all required fields before submitting.');
      return;
    }

    // Determine if all test results are "Pass"
    const allTestsPass =
      ImpactResult === "Pass" &&
      PenetrationResult === "Pass" &&
      RetentionResult === "Pass" &&
      FieldOfVisionResult === "Pass" &&
      Visorattachment === "Pass" &&
      Strapstrength === "Pass" &&
      Shellintegrity === "Pass";

    // Set Finalstatus based on test results
    const finalStatus = allTestsPass ? "pass" : "Fail";

    // Dispatch action with task data including Finalstatus
    dispatch(
      addTaskToServer({
        Model,
        MaterialsInspection,
        Testing,
        QualityControlChecks,
        DocumentationandTraceability,
        EmployeeTraining,
        date,
        ImpactResistance,
        ImpactStandard,
        ImpactResult,
        PenetrationResistance,
        PenetrationStandard,
        PenetrationResult,
        RetentionSystem,
        RetentionStandard,
        RetentionResult,
        FieldOfVision,
        FieldOfVisionStandard,
        FieldOfVisionResult,
        LinerMaterial,
        VisorMaterial,
        Visorattachment,
        Strapstrength,
        Shellintegrity,
        Finalstatus: finalStatus,
      })
    ).then(() => {
      // Reset form fields after dispatching the action
      setModel("");
      setMaterialsInspection("");
      setLinerMaterial("");
      setVisorMaterial("");
      setTesting("");
      setQualityControlChecks("");
      setVisorattachment("");
      setStrapstrength("");
      setShellintegrity("");
      setDocumentationandTraceability("");
      setEmployeeTraining("");
      setdate("");

      setImpactResistance(false);
      setImpactStandard("");
      setImpactResult("");

      setPenetrationResistance(false);
      setPenetrationStandard("");
      setPenetrationResult("");

      setRetentionSystem(false);
      setRetentionStandard("");
      setRetentionResult("");

      setFieldOfVision(false);
      setFieldOfVisionStandard("");
      setFieldOfVisionResult("");

      // Show toast notification
      toast.success('Report added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: false
      });
    });
  };



  return (

    <section className="alli" >
      <Form>


        <Form.Group className="small" controlId="formBasicModel">
          <Form.Label>Date :</Form.Label>
          <Form.Control type="date" placeholder="Enter Date " value={date}
            onChange={(e) => setdate(e.target.value)} />
        </Form.Group>
        <br></br>


        <label for=""> Model :</label>

        <select name=" Model :" id="Model " value={Model}
          onChange={(e) => setModel(e.target.value)}>
          <option value="">Select the helmet Model</option>
          <option value="xor">xor</option>
          <option value="vega">vega</option>
          <option value="Beon ">Beon </option>
          <option value="AVG">AVG</option>
        </select>

        <br></br>
        <br></br>


        <Form.Group className="a2" controlId="formBasicMaterialsInspection">
          <Form.Label> Enter the Tester Name :</Form.Label>
          <Form.Control type="text" placeholder="Enter the name " value={EmployeeTraining}
            onChange={(e) => setEmployeeTraining(e.target.value)} />
        </Form.Group>
        <Form.Group className="a2" controlId="formBasicMaterialsInspection">
          <Form.Label> Enter the Helmet Serial NO:</Form.Label>
          <Form.Control type="text" placeholder="Enter the Serial no " value={QualityControlChecks}
            onChange={(e) => setQualityControlChecks(e.target.value)} />
        </Form.Group>

        <Form.Group className="a2" controlId="formBasicMaterialsInspection">
          <Form.Label>Weight:</Form.Label>
          <Form.Control type="text" placeholder="Enter Helmet Weight" value={DocumentationandTraceability}
            onChange={(e) => setDocumentationandTraceability(e.target.value)} />
        </Form.Group>


        <Form.Label>Materials Inspection:</Form.Label><br></br>

        <label for="">Shell Material :</label>

        <select name="Shell Material :" id="MaterialsInspection" value={MaterialsInspection}
          onChange={(e) => setMaterialsInspection(e.target.value)}>
          <option value="">Select Result</option>
          <option value="Polycarbonate">Polycarbonate:</option>
          <option value="Fiberglass">Fiberglass</option>
          <option value="Carbon Fiber ">Carbon Fiber </option>
          <option value="Kevlar">Kevlar</option>
        </select>


        <label for="">Liner Material :</label>

        <select name="Liner Material :" id="MaterialsInspection" value={LinerMaterial}
          onChange={(e) => setLinerMaterial(e.target.value)}>
          <option value="">Select Result</option>
          <option value="Expanded Polystyrene (EPS)">Expanded Polystyrene (EPS)</option>
          <option value="Expanded Polypropylene (EPP)">Expanded Polypropylene (EPP)</option>
          <option value="Dual-density Foam  ">Dual-density Foam </option>
          <option value="Comfort Liners">Comfort Liners</option>
          <option value="MIPS (Multi-directional Impact Protection System)">MIPS (Multi-directional Impact Protection System)</option>
        </select>

        <label for="">Visor Material:</label>
        <select name="VisorMaterial :" id="VisorMaterial" value={VisorMaterial}
          onChange={(e) => setVisorMaterial(e.target.value)}>
          <option value="">Select Result</option>
          <option value="Polycarbonate">Polycarbonate</option>
          <option value="Acrylic">Acrylic</option>
          <option value="Injection-Molded Plastic  ">Injection-Molded Plastic</option>
          <option value="Anti-Scratch Coatings">Anti-Scratch Coatings</option>
          <option value="Anti-Fog Coatings">Anti-Fog Coatings</option>
        </select>








        {/* Impact Resistance Test */}
        <Form.Group className="mb-3" controlId="formBasicImpactResistance">
          <Form.Label>Testing and Result:</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="Impact Resistance Test"
              checked={ImpactResistance}
              onChange={(e) => setImpactResistance(e.target.checked)}
            />
            <p>{ImpactResistance ? 'Tested' : 'Not Tested'}</p>
          </div>


          {ImpactResistance && (
            <>


              <label for="">ImpactStandard :</label>
              <select name="ImpactStandard :" id="ImpactStandard" value={ImpactStandard}
                onChange={(e) => setImpactStandard(e.target.value)}>
                <option value="">Select Result</option>
                <option value="(DOT)">DOT</option>
                <option value="(CPSC)">(CPSC)</option>
                <option value=" (NOCSAE) "> (NOCSAE)</option>
                <option value="(ANSI)">(ANSI)</option>
              </select>



              <label for=""> Result: :</label>
              <select name="ImpactStandard :" id="ImpactStandard" value={ImpactResult}
                onChange={(e) => setImpactResult(e.target.value)}>
                <option value="">Select Result</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>

            </>
          )}
        </Form.Group>

        {/* Penetration Resistance Test */}
        <Form.Group className="mb-3" controlId="formBasicPenetrationResistance">
          <div>
            <Form.Check
              type="checkbox"
              label="Penetration Resistance Test"
              checked={PenetrationResistance}
              onChange={(e) => setPenetrationResistance(e.target.checked)}
            />
            <p>{PenetrationResistance ? 'Tested' : 'Not Tested'}</p>
          </div>
          {PenetrationResistance && (
            <>
              <label for="">ImpactStandard :</label>
              <select name="PenetrationStandard :" id="PenetrationStandard" value={PenetrationStandard}
                onChange={(e) => setPenetrationStandard(e.target.value)}>
                <option value="">Select Result</option>
                <option value="(DOT)">DOT</option>
                <option value="(CPSC)">(CPSC)</option>
                <option value=" (NOCSAE) "> (NOCSAE)</option>
                <option value="(ANSI)">(ANSI)</option>
              </select>



              <label for=""> Result: :</label>
              <select name="PenetrationResult :" id="PenetrationResult" value={PenetrationResult}
                onChange={(e) => setPenetrationResult(e.target.value)}>
                <option value="">Select Result</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>

            </>
          )}
        </Form.Group>
        {/* Retention System Effectiveness Test */}
        <Form.Group className="mb-3" controlId="formBasicRetentionSystem">
          <div>
            <Form.Check
              type="checkbox"
              label="Retention System Effectiveness Test"
              checked={RetentionSystem}
              onChange={(e) => setRetentionSystem(e.target.checked)}
            />
            <p>{RetentionSystem ? 'Tested' : 'Not Tested'}</p>
          </div>
          {RetentionSystem && (
            <>

              <label for="">RetentionStandard :</label>
              <select name="RetentionStandard :" id="RetentionStandard" value={RetentionStandard}
                onChange={(e) => setRetentionStandard(e.target.value)}>
                <option value="">Select Result</option>
                <option value="(DOT)">DOT</option>
                <option value="(CPSC)">(CPSC)</option>
                <option value=" (NOCSAE) "> (NOCSAE)</option>
                <option value="(ANSI)">(ANSI)</option>
              </select>



              <label for=""> Result: :</label>
              <select name="RetentionResult :" id="RetentionResult" value={RetentionResult}
                onChange={(e) => setRetentionResult(e.target.value)}>
                <option value="">Select Result</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>

            </>
          )}
        </Form.Group>

        {/*  Field of Vision Test: System Effectiveness Test */}
        <Form.Group className="mb-3" controlId="formBasicPenetrationResistance">
          <div>
            <Form.Check
              type="checkbox"
              label="Field of Vision Test:"
              checked={FieldOfVision}
              onChange={(e) => setFieldOfVision(e.target.checked)}
            />
            <p>{FieldOfVision ? 'Tested' : 'Not Tested'}</p>
          </div>
          {FieldOfVision && (
            <>

              <label for="">FieldOfVisionStandard :</label>
              <select name="FieldOfVisionStandard :" id="FieldOfVisionStandard" value={FieldOfVisionStandard}
                onChange={(e) => setFieldOfVisionStandard(e.target.value)}>
                <option value="">Select Result</option>
                <option value="(DOT)">DOT</option>
                <option value="(CPSC)">(CPSC)</option>
                <option value=" (NOCSAE) "> (NOCSAE)</option>
                <option value="(ANSI)">(ANSI)</option>
              </select>



              <label for=""> Result: :</label>
              <select name="FieldOfVisionResult :" id="FieldOfVisionResult" value={FieldOfVisionResult}
                onChange={(e) => setFieldOfVisionResult(e.target.value)}>
                <option value="">Select Result</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </>
          )}
        </Form.Group>





        <Form.Label>QualityControlCheck:</Form.Label><br></br>
        <Form.Label>Shell integrity :</Form.Label>

        <select name="Shellintegrity :" id="Shellintegrity" value={Shellintegrity}
          onChange={(e) => setShellintegrity(e.target.value)}>
          <option value="">Select Result</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <Form.Label>Strapstrength :</Form.Label>
        <select name="Strapstrength :" id="Strapstrength" value={Strapstrength}
          onChange={(e) => setStrapstrength(e.target.value)}>
          <option value="">Select Result</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>


        <Form.Label>Visorattachment :</Form.Label>
        <select name="Visorattachment :" id="Visorattachment" value={Visorattachment}
          onChange={(e) => setVisorattachment(e.target.value)}>
          <option value="">Select Result</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>


        {/* <Form.Group className="a3" controlId="formBasicMaterialsInspection">
          <Form.Label>DocumentationandTraceability:</Form.Label>
          <Form.Control type="text" placeholder="Enter Report Details" value={DocumentationandTraceability}
            onChange={(e) => setDocumentationandTraceability(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMaterialsInspection">
          <Form.Label> Employee Training:</Form.Label>
          <Form.Control type="text" placeholder="Enter Report Details" value={EmployeeTraining}
            onChange={(e) => setEmployeeTraining(e.target.value)} />
        </Form.Group>*/}

        <div className="text-end">
          <Button variant="primary" type="submit" onClick={(e) => addTask(e)}>
            Add Report
          </Button>
        </div>
      </Form>

      <ToastContainer />

    </section>
  );
};

export default AddTask;