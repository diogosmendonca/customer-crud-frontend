import React from 'react';


function DeleteConfirmationModal(){
    return(
        <div className="modal fade" id="deleteLocationConfirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Deleting Location</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Confirm the excluison of the location?</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#locationList">Close</button>
                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#locationList">Delete</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default function LocationList(){
    return(
        <>
            <div className="modal fade " id="locationList" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-fullscreen-lg-down">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Locations for customer: First Name Last Name</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#locationForm">New Location</button></p>
                        <table className="table table-striped">
                            <thead className="table-light ">
                                <tr>
                                    <th>Id</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip Code</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>8600 Terry Lodge Apt. 013\nSouth Makennabury, DC 97794-3344</td>
                                <td>East Loyview</td>
                                <td>Minnesota</td>
                                <td>14204</td>
                                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteLocationConfirm">Delete</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>412 Hirthe Street Apt. 415\nTheresiabury, NE 20284-3416</td>
                                <td>Lake Margretbury</td>
                                <td>California</td>
                                <td>18400</td>
                                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteLocationConfirm">Delete</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal />
        </>
    );
}