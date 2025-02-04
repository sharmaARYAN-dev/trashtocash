'use client';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { createCollector } from "../actions/collectorActions";
import { redirect } from "next/navigation";

export default function NewPostItem() {

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await createCollector(formData);
    redirect("/");
  }

  function handleSaveAsDraft() {
    alert("Item saved as draft! Draft functionality coming soon.");
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {/* Header */}
      <div className="form-header">
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>Become a Collector</h1>
      </div>

      {/* Item Details Section */}
      <div className="form-section">
        <label htmlFor="businessName">Business Name *</label>
        <input type="text" name="businessName" id="businessName" placeholder="Enter business name" required />
        <br /><br />
        
        <label htmlFor="ownerName">Owner&apos;s Name *</label>
        <input type="text" name="ownerName" id="ownerName" placeholder="Enter owner's name" required />
        <br /><br />
        
        <label htmlFor="email">Email *</label>
        <input type="text" name="email" id="email" placeholder="Enter email" required />
        <br /><br />
        
        <label htmlFor="contactNo">Contact Number *</label>
        <input type="number" name="contactNo" id="contactNo" placeholder="Enter contact number" required />
        <br /><br />
        
        <label htmlFor="officeAddress">Office Address *</label>
        <textarea name="officeAddress" id="officeAddress" placeholder="Enter office address" required></textarea>
        <br /><br />
        
        <label htmlFor="homeAddress">Home Address *</label>
        <textarea name="homeAddress" id="homeAddress" placeholder="Enter home address" required></textarea>
        <br /><br />
        
        <label htmlFor="gstin">GSTIN *</label>
        <input type="text" name="gstin" id="gstin" placeholder="Enter GSTIN"  />
        <br /><br />
        
        <label htmlFor="aadharNumber">Aadhar Number *</label>
        <input type="text" name="aadharNumber" id="aadharNumber" placeholder="Enter Aadhar number"  />
        <br /><br />
        
        <label htmlFor="pan">PAN *</label>
        <input type="text" name="pan" id="pan" placeholder="Enter PAN"  />
        <br /><br />

        
        <label htmlFor="yearOfStarting">Year of Starting *</label>
        <input type="number" name="yearOfStarting" id="yearOfStarting" placeholder="Enter year of starting"  />
        <br /><br />

        <input type="hidden" name="userRole" value="collector" />
        
     
      </div>

      {/* Submit & Save Buttons */}
      <div className="button-group">
        <button type="button" className="save-draft-button" onClick={handleSaveAsDraft}>
          Save as Draft
        </button>
        <SubmitButton>Publish</SubmitButton>
      </div>
    </form>
  );
}
