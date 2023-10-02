<?php

namespace App\Enums;

class VehicleTypeEnum
{
    const TRUCK = 'Truck';
    const ESCAVATOR = 'Escavator';
    const BULLDOZER = 'Bulldozer';
    const GRADER = 'Grader';

    public static function getValues()
    {
        return [
            self::TRUCK,
            self::ESCAVATOR,
            self::BULLDOZER,
            self::GRADER,
        ];
    }
}
