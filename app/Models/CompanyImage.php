<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'image_path',
        'title',
        'description',
        'type',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Relación con la empresa
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Scope para imágenes activas
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope para ordenar por orden
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Obtener la URL completa de la imagen
     */
    public function getImageUrlAttribute(): string
    {
        return asset('storage/' . $this->image_path);
    }

    /**
     * Obtener el tipo de imagen en español
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'product' => 'Producto',
            'service' => 'Servicio',
            'facility' => 'Instalación',
            'team' => 'Equipo',
            'other' => 'Otro',
            default => 'Otro'
        };
    }
}
