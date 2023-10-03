<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataToCollection;
use App\Models\Role;
use App\Models\User;
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
