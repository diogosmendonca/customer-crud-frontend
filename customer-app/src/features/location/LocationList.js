import React, {useState} from 'react';
import LocationForm from '../location/LocationForm';
import {useSelector, useDispatch} from 'react-redux';
import {deleteLocationServer, selectAllLocations} from './LocationsSlice';
import {fetchCustomers} from '../customer/CustomersSlice';

/**
 * Modal of Delete Confirmation component
 * 
 * @param {location} props 
 * @returns 
 */
function DeleteConfirmationModal(props){
    return(
        <div className="modal fade" id="deleteLocationConfirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Deleting Location</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Confirm the excluison of the location {props?.location?.address}?</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#locationList">Close</button>
                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#locationList" onClick={() => props.handleClickDeleteLocation()}>Delete</button>
            </div>
            </div>
        </div>
        </div>
    )
}


/**
 * Location Line component
 * 
 * @param {location} props 
 * @returns 
 */
function LocationLine(props){

    
    //handle click event on any button of the row
    function handleOnClick(location){
        props.setLocationSelected(location);
    }

    if(props != null && props.location != null && props.location.id != null){
        let location = props.location;
        return(
            <tr>
                <td>{location.id}</td>
                <td>{location.address}</td>
                <td>{location.city}</td>
                <td>{location.state}</td>
                <td>{location.zip}</td>
                <td><button type="button" onClick={()=>handleOnClick(props.location)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteLocationConfirm">Delete</button></td>
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
                    {props.locations.map((location) => <LocationLine key={location.id} location={location} setLocationSelected={props.setLocationSelected}/>)}
                </tbody>
            </table>
            );
    }else{
        return(<div>No locations found.</div>)
    }
}

export default function LocationList(props){

    //state for selected location
    const [locationSelected, setLocationSelected] = useState();
    const dispatch = useDispatch();
    
    const locations = useSelector(selectAllLocations)
    
    //rendes the location table
    let locationTable = "";
    if(locations != null){
        locationTable = <LocationTable locations={locations} setLocationSelected={setLocationSelected} />;
    }else{
        locationTable = <LocationTable/>;
    }

    //handle delete event
    async function handleClickDeleteLocation(){
        await dispatch(deleteLocationServer(locationSelected.id)).unwrap();
        dispatch(fetchCustomers());
    }
    
    //render the feature
    return(
        <>
            <div className="modal fade " id="locationList" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-fullscreen-lg-down">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Locations for customer: {props?.customer?.first_name + " " + props?.customer?.last_name}</h5>
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
            <DeleteConfirmationModal location={locationSelected} handleClickDeleteLocation={handleClickDeleteLocation} />
            <LocationForm customer={props.customer} />
        </>
    );
}