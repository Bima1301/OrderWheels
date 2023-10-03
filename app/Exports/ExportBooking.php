<?php
    namespace App\Exports;
    use App\Models\User;
use App\Models\VehicleBooking;
use Maatwebsite\Excel\Concerns\FromCollection;
 
    class ExportBooking implements FromCollection {
        public function collection()
        {
            return VehicleBooking::join('users', 'users.id', '=', 'vehicle_bookings.approved_by')
            ->select(
                'driver_name',
                'booking_date',
                'return_date',
                'status',
                'users.name',
            )->get();
        }
    }
