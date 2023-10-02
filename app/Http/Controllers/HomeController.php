<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the application dashboard.
     */
    public function index()
    {
        $data = [
            "pageName" => "Dashboard",
        ];
        return Inertia::render('Home', $data);
    }
}
