<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'address',
        'logo',
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

    /**
     * Relación con las imágenes de la empresa
     */
    public function images(): HasMany
    {
        return $this->hasMany(CompanyImage::class);
    }

    /**
     * Obtener solo las imágenes activas
     */
    public function activeImages(): HasMany
    {
        return $this->hasMany(CompanyImage::class)->active()->ordered();
    }

    /**
     * Obtener la URL del logo
     */
    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo ? asset('storage/' . $this->logo) : null;
    }
}
