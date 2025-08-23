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
        'requirements',
        'publication_status',
        'activity_status',
        'start_date',
        'end_date',
        'link_video',
        'video_id',
        'acquisition_type',
        'acquisition_details',
        'acquisition_terms',
        'reward_amount',
        'reward_currency',
        'reward_description',
        'reward_delivery_type',
        'reward_delivery_details',
        'category_id',
        'company_id',
    ];

    protected $casts = [
        'requirements' => 'array',
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

    public function formAnswers(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Answer::class, 'challenge_id', 'id');
    }
}
