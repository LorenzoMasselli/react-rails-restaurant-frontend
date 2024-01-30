import * as React from 'react';
import Popover from '@mui/material/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faDeleteLeft, faFilePen, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "./PopoverTable.css"

function PopoverTable({id, handleEditClick, confirmBooking, deleteBooking, bookings}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const findBookingAndTestConfirmed = (id) => {
    const findBooking = bookings.find(booking => booking.id === id);
    return findBooking ? findBooking.confirmed : false;
  };

  const open = Boolean(anchorEl);
  const openId = open ? 'simple-popover' : undefined;

  return (
    <div className='ellipsis-container'>
      <FontAwesomeIcon aria-describedby={id} variant="contained" onClick={handleClick} className="vertical-ellipsis" icon={faEllipsisVertical} />
      <Popover
        id={openId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className='popover'
      >
          <div className='popover-container'>
            <div style={{display: findBookingAndTestConfirmed(id) ? "none": ""}} onClick={() => confirmBooking(id)} ><FontAwesomeIcon icon={faCircleCheck} style={{color: "#6b7180c4"}} /><span className='pop-edit'>Confirm</span></div>
            <div onClick={() => handleEditClick(id)}><FontAwesomeIcon icon={faFilePen} style={{color: "#6b7180c4"}}/><span className='pop-edit'>Edit</span></div>
            <div onClick={() => deleteBooking(id)}><FontAwesomeIcon icon={faDeleteLeft} style={{color: "#6b7180c4"}}/><span className='pop-edit'>Delete</span></div>
          </div>
      </Popover>
    </div>
  );
}

export default PopoverTable