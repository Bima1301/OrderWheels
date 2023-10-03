<?php

namespace App\Http\Controllers;

use App\Enums\VehicleTypeEnum;
use App\Models\VehicleBooking;
use App\Http\Requests\StoreVehicleBookingRequest;
use App\Http\Requests\UpdateVehicleBookingRequest;
use App\Http\Resources\DataToCollection;
use App\Models\FuelConsumption;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $keyword = request()->query('keyword');
        $status = request()->query('status');
        $user = auth()->user();
        $data = [
            "pageName" => "Data Booking",
            'booking_vehicle' => new DataToCollection(VehicleBooking::where(
                function ($query) use ($user) {
                    if ($user->role->name === 'approver') {
                        $query->where('approved_by', $user->id);
                    }
                }
            )->with(['vehicle', 'fuel_consumption'])->where(
                function ($query) use ($keyword, $status) {
                    if ($keyword) {
                        $query->where('driver_name', 'LIKE', "%{$keyword}%");
                    }
                    if ($status) {
                        $query->where('status', $status);
                    }
                }
            )->latest()->paginate(10)),
            'keyword' => $keyword ?? '',
            'status' => $status ?? '',
        ];
        return Inertia::render('Booking/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($vehicleID)
    {
        $vehicle = Vehicle::findOrFail($vehicleID);
        if ($vehicle->amount <= 0) {
            return redirect()->back()->with('error', 'Kendaraan tidak tersedia');
        }
        $data = [
            "pageName" => "Daftar Kendaraan",
            'vehicle' => $vehicle,
            'vehicle_type' => VehicleTypeEnum::getValues(),
            'users' => User::all(),
        ];
        return Inertia::render('Booking/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleBookingRequest $request, $vehicleID)
    {
        //check if vehicle is available
        $vehicle = Vehicle::findOrFail($vehicleID);
        if ($vehicle->amount <= 0) {
            return redirect()->back()->with('error', 'Kendaraan tidak tersedia');
        }

        $bookingData = $request->all();
        $bookingData['user_id'] = auth()->user()->id;

        VehicleBooking::create($bookingData);

        $vehicle->update([
            'amount' => $vehicle->amount - 1,
        ]);

        return redirect()->route('index-booking')->with('success', 'Booking berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(VehicleBooking $vehicleBooking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($vehicleBookingId)
    {

        $vehicleBooking = VehicleBooking::findOrFail($vehicleBookingId)->with('vehicle')->first();

        $data = [
            "pageName" => "Data Booking",
            'vehicle_booking' => $vehicleBooking,
        ];
        return Inertia::render('Booking/Update', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleBookingRequest $request, $vehicleBookingId)
    {
        $vehicleBooking = VehicleBooking::findOrFail($vehicleBookingId);
        $vehicleBooking->update([
            'status' => 'returned',
        ]);

        $vehicleBookingData = $request->all();
        $vehicleBookingData['vehicle_id'] = $vehicleBooking->vehicle_id;
        $vehicleBookingData['vehicle_booking_id'] = $vehicleBooking->id;
        FuelConsumption::create($vehicleBookingData);

        return redirect()->back()->with('success', 'Booking berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VehicleBooking $vehicleBooking)
    {
        //
    }

    public function approvalBooking(Request $request, $idBooking)
    {
        //validate request
        $request->validate([
            'status' => 'required',
        ]);

        VehicleBooking::where('id', $idBooking)->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Booking berhasil diupdate');
    }
}
