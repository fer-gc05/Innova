<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nit',
        'responsible_name',
        'responsible_email',
        'responsible_phone',
        'responsible_position',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function challenges(): BelongsToMany
    {
        return $this->belongsToMany(
            Challenge::class,
            'challenge_company',
            'company_id',
            'challenge_id');
    }
}
