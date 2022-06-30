import  React from "react";

function Step1(){
    return (
        <div className="main active">
              <div className="form-group">
                  <div className="text">
                      <h2>Application Information</h2>
                      <p></p>
                  </div>
                  <div className="input-text">
                      <div className="input-div">
                          <select name='platform' value={platform} onChange={handleChange}>
                              <option value="" defaultValue disabled>
                                  Select Platform
                              </option>
                              <option value="Android">Android</option>
                              <option value="iOS">iOS</option>
                          </select>
                      </div>
                      <div className="input-div">
                          <input type="number" name='downloadRate' value={downloadRate} onChange={handleChange} required />
                          <span>Download Rate</span>
                      </div>
                  </div>
                  <div className="input-text">
                      <div className="input-div">
                          <input type="text" name='applicationUrl' value={applicationUrl} onChange={handleChange} required />
                          <span>Application Url</span>
                      </div>
                      <div className="input-div">
                          <input type="text" name='identifier' value={identifier} onChange={handleChange}  required />
                          <span>Identifier</span>
                      </div>
                  </div>
              </div>
          </div>

    );
}

export default Step1;