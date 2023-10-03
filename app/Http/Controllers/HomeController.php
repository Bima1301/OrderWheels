<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataToCollection;
use App\Models\Role;
use App\Models\User;
use App\Models\VehicleBooking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the application dashboard.
     */
    public function index()
    {
        $monthNames = [
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        ];

        $vehicleBooking = VehicleBooking::whereIn('status', ['approved', 'returned'])->get();

        $monthlyUsage = [];
        foreach ($vehicleBooking as $booking) {
            $bookingDate = \Carbon\Carbon::parse($booking->booking_date);
            $returnDate = \Carbon\Carbon::parse($booking->return_date);

            while ($bookingDate->lte($returnDate)) {
                $month = $bookingDate->month;

                $monthName = $monthNames[$month];

                if (!isset($monthlyUsage[$monthName])) {
                    $monthlyUsage[$monthName] = 0;
                }

                $monthlyUsage[$monthName]++;
                $bookingDate->addMonth();
            }
        }

        $data = [
            "pageName" => "Dashboard",
            "monthlyUsage" => $monthlyUsage,
        ];
        return Inertia::render('Home', $data);
    }

    public function users()
    {
        $keyword = request()->query('keyword');
        $role = request()->query('role');
        $data = [
            "pageName" => "Pengguna",
            'users' => new DataToCollection(User::where(
                function ($query) use ($keyword, $role) {
                    if ($keyword) {
                        $query->where('name', 'LIKE', "%{$keyword}%");
                    }
                    if ($role) {
                        $query->where('role_id', $role);
                    }
                }
            )->with('role')->where('id', '!=', auth()->user()->id)->latest()->paginate(10)),
            'roles' => Role::all(),
            'keyword' => $keyword ?? '',
            'role' => $role ?? '',
        ];
        return Inertia::render('Users/Index', $data);
    }

    public function updateRole(Request $request, $user)
    {
        //validate
        $request->validate([
            'role' => 'required|exists:roles,id',
        ]);
        User::findOrFail($user)->update([
            'role_id' => $request->role,
        ]);
        return redirect()->back()->with('success', 'Berhasil mengubah role pengguna');
    }
}
