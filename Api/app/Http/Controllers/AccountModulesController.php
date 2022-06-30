<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use http\Client;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AccountModulesController extends Controller
{
    public function GetAccountDetails(): Response|Application|ResponseFactory
    {
        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/account/details',[
            'apiKey'=>Auth::user()->APIKEY
        ]));
    }

    public function GetRates(): Response|Application|ResponseFactory
    {
        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/account/rates',[
            'apiKey'=>Auth::user()->APIKEY
        ]));
    }

    public function GetTrackingProviders(): Response|Application|ResponseFactory
    {
        return response(Http::get(Constants::BaseUrl.'/account/tracking',[
            'apiKey'=>Auth::user()->APIKEY
        ]));
    }
}
