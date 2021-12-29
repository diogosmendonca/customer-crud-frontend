import React from 'react';

export default function LocationForm(){
    return(
        <>
            <div className="modal fade" id="locationForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Location</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" name="address"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" name="city"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" name="state"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zip" className="form-label">Zip Code</label>
                                <input type="text" className="form-control" id="zip" name="zip"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#locationList">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#locationList">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
