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



function LocationLine(props){
    if(props != null && props.location != null && props.location.id != null){
        let location = props.location;
        return(
            <tr>
                <td>{location.id}</td>
                <td>{location.address}</td>
                <td>{location.city}</td>
                <td>{location.state}</td>
                <td>{location.zip}</td>
                <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteLocationConfirm">Delete</button></td>
            </tr>
        );
    }else{
        return(
            <tr>
                <td colSpan={6}>It was not possible to show the location.</td>
            </tr>
        );
    }
}



function LocationTable(props){
    if(props != null && props.locations != null && props.locations.length > 0){
        return(
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
                    {props.locations.map((location) => <LocationLine key={location.id} location={location} />)}
                </tbody>
            </table>
            );
    }else{
        return(<div>No locations found.</div>)
    }
}

export default function LocationList(props){

    let locationTable = "";
    if(props != null && props.customer != null){
        locationTable = <LocationTable locations={props.customer.locations} />;
    }else{
        locationTable = <LocationTable/>;
    }
  
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
                        {locationTable}
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