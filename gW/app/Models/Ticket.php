<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    // Add 'status' to the fillable property
    protected $fillable = ['name', 'ticket_number', 'category', 'location', 'concern', 'approved_by', 'status'];
}
