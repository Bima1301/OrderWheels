<?php

namespace App\Http\Controllers;

use App\Enums\VehicleTypeEnum;
use App\Models\VehicleBooking;
use App\Http\Requests\StoreVehicleBookingRequest;
use App\Http\Requests\UpdateVehicleBookingRequest;
use App\Models\User;
use App\Models\Vehicle;
use Inertia\Inertia;

class VehicleBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($vehicleID)
    {
        $vehicle = Vehicle::findOrFail($vehicleID);
        $data = [
            "pageName" => "Vehicle",
            'vehicle' => $vehicle,
            'vehicle_type' => VehicleTypeEnum::getValues(),
            'users' => User::all(),
        ];
        return Inertia::render('Booking/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleBookingRequest $request)
    {
        dd($request->all());
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
    public function edit(VehicleBooking $vehicleBooking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleBookingRequest $request, VehicleBooking $vehicleBooking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VehicleBooking $vehicleBooking)
    {
        //
    }
}
