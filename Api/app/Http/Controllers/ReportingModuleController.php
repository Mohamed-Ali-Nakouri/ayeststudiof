<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ReportingModuleController extends Controller
{

    public function GetSummary(Request $request)
    {
        $Validator = Validator::make($request->all(),[
            'startDate'=>['required','date'],
            'endDate'=>['required','date'],
            //'identifier'=>['string'],
        ]);
       
        if ($Validator->fails())
            return response($Validator->errors());

            $identifier ="";
            if(request('identifier'))
            {
                $identifier = Auth::user()->id."-".request('identifier');
            }
            else
            {
                $identifier = Auth::user()->id; 
            }

        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/reporting/summary',[
            'apiKey'=>Auth::user()->APIKEY,
            'identifier' => $identifier,
            'startDate' => request('startDate'),
            'endDate' => request('endDate')
        ]));
    }

    public function GetSummaryDaily(Request $request)
    {
        $Validator = Validator::make($request->all(),[

            'startDate'=>['required','date'],
            'endDate'=>['required','date'],
            //'identifier'=>['string'],
        ]);
        if ($Validator->fails())
            return response($Validator->errors());

            $identifier ="";
            if(request('identifier'))
            {
                $identifier = Auth::user()->id."-".request('identifier');
            }
            else
            {
                $identifier = Auth::user()->id; 
            }

        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/reporting/summary_daily',[
            'apiKey'=>Auth::user()->APIKEY,
            'identifier' => $identifier,
            'startDate' => request('startDate'),
            'endDate' => request('endDate')
        ]));
    }

    public function GetInstallations(Request $request)
    {
        $Validator = Validator::make($request->all(),[
            'campaignId'=>['required','integer']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());

        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/reporting/installations',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId' => request('campaignId'),
        ]));
    }

    public function GetStats(Request $request)
    {
        $Validator = Validator::make($request->all(),[
            'campaignId'=>['required','integer'],
            'startDate'=>['date'],
            'endDate'=>['date']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());


        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/reporting/stats',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId' => request('campaignId'),
            'startDate' => request('startDate'),
            'endDate' => request('endDate')
        ]));
    }

    public function GetTrafficAnalysis(Request $request)
    {

        $Validator = Validator::make($request->all(),[

            'campaignId'=>['required','integer'],
            'startDate'=>['date'],
            'endDate'=>['date']

        ]);
        if ($Validator->fails())
            return response($Validator->errors());

        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/reporting/traffic_analysis',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId' => request('campaignId'),
            'startDate' => request('startDate'),
            'endDate' => request('endDate')
        ]));
    }







}
