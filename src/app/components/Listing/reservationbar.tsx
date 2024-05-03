import { useState } from 'react';
import { format } from 'date-fns';
import useLoginModal from '@/app/redux/hooks/loginhook';
import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
import {profileApiservive} from '@/app/apiService';
import { useSelector } from 'react-redux';


export type Property = {
    id: string;
    booking_by: number; // Ensure booking_by is of type number (primary key)
}

interface ReservationSidebarProps {
    userId: number | null; // Ensure userId is of type number (primary key)
    property: Property;
}
const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,

}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [cleared, setCleared] = React.useState<boolean>(false);
    const loginModal = useLoginModal();
    const uiid = useSelector((state: any) => state.auth.token.uid);
    const token = useSelector((state: any) => state.auth.token.access);
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    }
    

    const performBooking = async () => {
        if (!selectedDate) {
            alert('Please select a date before booking.');
            return;
        }
    
        if (!uiid) {
            alert('Please provide a user ID before booking.');
            return;
        }
    
        try {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            const formData = new FormData();
            formData.append('Listing', property.id);
            formData.append('which_date', formattedDate);
            formData.append('booked_by', uiid.toString()); // Convert user ID to string
            const response = await profileApiservive.post('/app2/bookings/', formData , token);
            console.log(response.status === 200)
            if (response) {
                alert('Booking successful');
                setSelectedDate(null);

            } else {
                console.error('Booking failed');
            }
        } catch (error) {
            console.error('Error booking:', error);
        }
    }
    
    return (
        <div className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl bg-white">
            <h2 className="mb-5 text-2xl">Which Day You Want To See.</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    marginBottom: '23px',
                }}>
                    <DemoItem label="DatePicker">
                        <DatePicker
                            sx={{ width: 260 }}
                            value={selectedDate}
                            onChange={handleDateChange}
                            slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                            }}
                        />
                    </DemoItem>
                    {cleared && (
                        <Alert
                            sx={{ position: 'absolute', bottom: 0, right: 0 }}
                            severity="success"
                        >
                            Field cleared!
                        </Alert>
                    )}
                </div>
            </LocalizationProvider>
            <div
                onClick={performBooking} // Call performBooking when "Book" button is clicked
                className="w-full mb-6 py-6 text-center text-black bg-airbnb bg-[#0082cc] rounded-xl cursor-pointer"
            >
                Book
            </div>
            <div className="mb-4 flex justify-between align-center">
                <p>Djangobnb fee</p>
            </div>
            <hr />
        </div>
    )
}

export default ReservationSidebar;
