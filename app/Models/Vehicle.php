<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function vehicle_bookings()
    {
        return $this->hasMany(VehicleBooking::class);
    }

    public function fuel_consumptions()
    {
        return $this->hasMany(FuelConsumption::class);
    }
}
