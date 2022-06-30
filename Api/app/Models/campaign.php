<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class campaign extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'campaignId',
        'user_id',
        'platform',
        'packageName',
        'appName',
        'campaignType',
        'appIcon',
        'totalBudget',
        'remainingBudget',
        'bidPerConversion',
        'targetCountries',
        '_totalDownloads',
        '_remainingDownloads',
        '_tokensPerDownload',
        'downloadRate',
        'limitStrategy',
        'isRetention',
        'isManaged',
        'reservations',
        'tracking',
        'status',
        'identifier',
        'trackingProvider',
        'redirectUrl',
        'eventName',
        'eventConversionTime',
        'eventDescription',
        'keywordSets'
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [ 'id','user_id'];
}
