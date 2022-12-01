import React from 'react'
import { TransactionContext } from '../../context/TransactionContext';
import './addFIR.css'

function AddFIR() {
  const { currentAccount, formData, handleChange, createTransaction, connectWallet, sendTransaction } = React.useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, uaid, fullname, fathername, Cno, Age, gender, houseaddrs, distance, doO, toO, offence, section, particulars, witness, complaint } = formData;

    e.preventDefault();
    console.table(formData);
    if(!addressTo || !amount || !uaid || !fullname || !fathername || !Cno || !Age || !gender || !houseaddrs || !distance || !doO || !toO || !offence || !section || !particulars || !witness || !complaint) return alert("Please fill all the fields");  
    sendTransaction(); 
  }

  return (
    <>
      <div className="editWrapper">
        <div className="editForm">
          <div className='headerWrapper'>
            <div className='header'>Your Details</div>
          </div>
          Enter your Aadhar ID:
          <input type="text" placeholder="Enter your Aadhar ID"  onChange={(e)=>handleChange(e, "uaid")} />
          Full Name
          <input type="text" placeholder="Full Name"  onChange={(e)=>handleChange(e, "fullname" )} />
          Father's Name
          <input type="text" placeholder="Father's Name"   onChange={(e)=>handleChange(e, "fathername")} />
          Contact Info
          <input type="text" placeholder="Contact Info"  onChange={(e)=>handleChange(e, "Cno")} />
          Age
          <input type="text" placeholder="Age"  onChange={(e)=>handleChange(e, "Age" )} />
          Gender
          <input type="text" placeholder="Gender"  onChange={(e)=>handleChange(e, "gender" )} />
          Address
          <textarea type="text" placeholder="Address" onChange={(e)=>handleChange(e, "houseaddrs")} />
          <div className='headerWrapper'>
            <div className='header'>Place of Occurence</div>
          </div>
          Distance from the police station
          <input type="text" placeholder="Distance from the police station"  onChange={(e)=>handleChange(e, "distance")} />
          <div className='headerWrapper'>
            <div className='header'>Date and Hour of Occuernce</div>
          </div>
          Date of Occurence
          <input type="text" placeholder="Date of Occurence" onChange={(e)=>handleChange(e, "doO")} />
          Time of occurence
          <input type="text" placeholder="Time of occurence" onChange={(e)=>handleChange(e, "toO" )} />
          <div className='headerWrapper'>
            <div className='header'>Offence</div>
          </div>
          Nature of Offence
          <input type="text" placeholder="Nature of Offence"  onChange={(e)=>handleChange(e, "offence")} />
          Section
          <input type="text" placeholder="Section"  onChange={(e)=>handleChange(e, "section")} />
          Particulars of property
          <input type="text" placeholder="Particulars of property" onChange={(e)=>handleChange(e, "particulars")} />
          Details of Witness
          <textarea type="text" placeholder="Details of Witness" onChange={(e)=>handleChange(e, "witness")} />
          Briefly lay down the facts of the case:
          <input type="text" placeholder="Complaint"  onChange={(e)=>handleChange(e, "complaint")} />
        </div>
        <div className="submitButton" onClick={(e) => {handleSubmit(e)}}>
          Register FIR
        </div>
        <br />
        <div className="submitButton" onClick={connectWallet}>
          CONNECT METAMASK
        </div>
      </div>
    </>
  )
}
export default AddFIR