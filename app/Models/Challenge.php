<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'objective',
        'difficulty',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(
            Student::class,
            'challenge_student',
            'challenge_id',
            'student_id');
    }

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(
            Company::class,
            'challenge_company',
            'challenge_id',
            'company_id');
    }
}
