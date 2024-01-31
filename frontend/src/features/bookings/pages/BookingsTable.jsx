import { useEffect, useState, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faXmark,faDownload,faPlus,faMagnifyingGlass, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'
import NewBookingForm from '../forms/NewBookingForm'
import BookingEditForm from "../forms/BookingEditForm";
import { useReactTable, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, flexRender, } from '@tanstack/react-table'
import PopoverTable from "./PopoverTable";


function BookingsTable({ bookings,confirmBooking, deleteBooking, currUser, setCurrUser, setBookings }) {
    const [data, setData] = useState(null);
    const [activeForm, setActiveForm] = useState(false);
    const [activeEditForm, setActiveEditForm] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtering, setFiltering] = useState("");
    const [autoResetPage, setAutoResetPage] = useState(false)
    

    const handleConfirmBooking = (id) => {
        confirmBooking(id);
      };
    
    const columns = [
        {
            accessorKey: 'name',
            header: "Full Name",
            cell: (props) => <p className="table-column-no-wrap">{props.getValue()}</p>
        },
        {
            accessorKey: 'confirmed',
            header: "Status",
            cell: (props) => <p >{props.getValue() ? <span className="status-confirmed">Confirmed</span> : <span className="status-pending">Pending</span> }</p>
        },
        {
            accessorKey: 'date',
            header: "Date",
            cell: (props) => <p className="table-column-no-wrap">{props.getValue()}</p>
        },
        {
            accessorKey: 'quantity',
            header: "Guests",
            cell: (props) => <p className="td-center">{props.getValue()}</p>
        },
        {
            accessorKey: 'time',
            header: "Time",
            cell: (props) => <p className="td-center">{props.getValue()}</p>
        },
        {
            accessorKey: 'email',
            header: "Contact",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'note',
            header: "Notes",
            cell: (props) => <p className="table-column-notes">{props.getValue()}</p> 
        },
        {
            accessorKey: 'id',
            header: " ",
            cell: (props) => <PopoverTable bookings={bookings} confirmBooking={handleConfirmBooking} deleteBooking={deleteBooking} handleEditClick={handleEditClick} id={props.getValue()}/>
        }
    ]


    const handleEditClick = (bookingId) => {
        setSelectedBookingId(bookingId);
        setActiveEditForm(true);
    };

    const handleEditFormClose = () => {
        setActiveEditForm(false);
        setSelectedBookingId(null);
    };
    const handleNewFormClose = () => {
        setActiveForm(false);
    };

    const addNewBooking = (newBooking) => {
        setData((prevData) => [...prevData, newBooking]);
      };

    useEffect(() => {
        if (bookings) {
            setData(bookings);
        }
        // if (bookings) {
        //     const orderedBookings = bookings.sort((a, b) => new Date(a.date) - new Date(b.date))
        //     setData(orderedBookings);
        // }
    }, [bookings, data]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter: filtering
        },
        onGlobalFilterChanged: setFiltering,
        autoResetPageIndex: false,
    });

    useEffect(() => {
        console.log(filtering)
        if (filtering !== "") {
            table.setPageIndex(0)
            setCurrentPage(1)
        }
    }, [filtering, table])

    const paginationNext = () => {
        table.nextPage();
        if (currentPage< table.getPageCount()) {
            setCurrentPage(currentPage + 1)
        }
    }
    const paginationPrevious = () => {
        table.previousPage();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    if (!data) {
        return <div>Loading ... </div>
      }

    return (
        <section className="table-container">
            {activeForm ? <div className="table-new-booking-form"><NewBookingForm addNewBooking={addNewBooking} setBookings={setBookings} currUser={currUser} setCurrUser={setCurrUser} onNewFormClose={handleNewFormClose}/><FontAwesomeIcon icon={faCircleXmark} style={{color: "black",}} className="form-close" onClick={() => setActiveForm(false)}/></div> : <></>}
            {activeEditForm && (
                <div className="table-new-booking-form">
                <BookingEditForm bookingId={selectedBookingId} onFormClose={handleEditFormClose}
                onUpdateBooking={(updatedBooking) => {
                    setBookings((prevBookings) =>
                    prevBookings.map((prevBooking) =>
                        prevBooking.id === updatedBooking.id
                        ? { ...prevBooking, ...updatedBooking }
                        : prevBooking
                    )
                    );
                }}
                />
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "black" }}
                    className="form-close"
                    onClick={handleEditFormClose}
                />
                </div>
            )}
            <div className="table">
                <div className="table-container-heading">Bookings Dashboard</div>
                <div className="filters-container">
                    <div className="name-search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xs"/>
                        <input
                            type="text"
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
                            placeholder="Search..."
                            className="name-input"
                        />
                    </div>
                    <div className="filters-buttons">
                        <div className="add-booking-button" onClick={() => setActiveForm(true)}>
                            <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /> 
                            Add Booking
                        </div>
                        {/* <div className="add-booking-button">
                            <FontAwesomeIcon icon={faDownload} style={{color: "#ffffff",}} /> 
                            Download
                        </div> */}
                    </div>
                </div>

                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <tr key={index}>
                                {headerGroup.headers.map((header, i) => (
                                    <th key={i} className="th">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext)}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                                <tr key={index} className="tr">
                                    {row.getVisibleCells().map((cell, i) => (
                                        <td key={i} className="td">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="pagination-table">
                    <div onClick={() => paginationPrevious()}>&lt;</div>
                    <span>Page {currentPage} of {table.getPageCount()}</span>
                    <div onClick={() => paginationNext()}>&gt;</div>
                </div>
            </div>
        </section>
    );
}

export default BookingsTable;
