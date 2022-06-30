<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use App\Models\campaign;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class CampaignModulesController extends Controller
{
    // TODO: Have A Lot Of Data need a way to paginate them
    public function GetCampaignsList(): Response|Application|ResponseFactory
    {
       //$l =  Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/list',['apiKey'=>Auth::user()->APIKEY]);
       // dd($l->json());
        $l = campaign::where('user_id',Auth::id())->get();

       $res= [ 
            "status" => "success",
            "numCampaigns"=> count($l),
            'campaignData' => $l,
        ];

        return response($res);
    }

    public function GetACampaign(Request $request): Response|Application|ResponseFactory
    {
        $Validator = Validator::make($request->all(),[
            'CampaignId'=>['required','integer']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());

        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/get',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId'=>request('CampaignId')
        ]));
    }
    public function PauseACampaign(Request $request): Response|Application|ResponseFactory
    {
        $Validator = Validator::make($request->all(),[
            'CampaignId'=>['required','integer']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());
           $pauseResponse = Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/pause',[
                'apiKey'=>Auth::user()->APIKEY,
                'campaignId'=>request('CampaignId')
            ]);
            $pauseResponseBody = $pauseResponse->json();
            if ($pauseResponseBody['status'] == 'success')
            { 
                $c = campaign::where('campaignId',request('CampaignId'))->first();
 
                $c->status = 'pending';
 
                $c->save();
    
    
                return response($pauseResponseBody);
            }else
            {
                return response($pauseResponseBody);
            }

        
    }

    public function TerminateACampaign(Request $request): Response|Application|ResponseFactory
    {
        $Validator = Validator::make($request->all(),[
            'CampaignId'=>['required','integer']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());

        $terminateResponse = Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/terminate',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId'=>request('CampaignId')
        ]);
        $terminateResponseBody = $terminateResponse->json();
            if ($terminateResponseBody['status'] == 'success')
            { 
                $c = campaign::where('campaignId',request('CampaignId'))->first();
 
                $c->status = 'completed';
 
                $c->save();
    
    
                return response($terminateResponseBody);
            }else
            {
                return response($terminateResponseBody);
            }
    }
    public function ReactivateACampaign(Request $request): Response|Application|ResponseFactory
    {
        $Validator = Validator::make($request->all(),[
            'CampaignId'=>['required','integer'],
            'addBudget'=>['required','integer','min:1']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());

        return response(Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/reactivate',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId'=>request('CampaignId'),
            'addBudget'=>request('addBudget')
        ]));
    }
    public function StartACampaign(Request $request): Response|Application|ResponseFactory
    {
        $Validator = Validator::make($request->all(),[
            'CampaignId'=>['required','integer']
        ]);
        if ($Validator->fails())
            return response($Validator->errors());

    $startResponse = Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/start',[
            'apiKey'=>Auth::user()->APIKEY,
            'campaignId'=>request('CampaignId')
        ]);

        $startResponseBody = $startResponse->json();
            if ($startResponseBody['status'] == 'success')
            { 
                $c = campaign::where('campaignId',request('CampaignId'))->first();
 
                $c->status = 'running';
 
                $c->save();
    
    
                return response($startResponseBody);
            }else
            {
                return response($startResponseBody);
            }
    }
    public function AddCampaign(Request $request): Response|Application|ResponseFactory
    {
        $datas = $request->all();
        $dataToSend = [];
        try
        {   
            
            if(isset($datas['identifier']))
            {
                $datas['identifier'] =  Auth::user()->id."-".$datas['identifier'];
            }else
            {
                $datas['identifier'] = Auth::user()->id; 
            }
            
            foreach($datas as $key => $data)
            {$dataToSend += [$key => $data];}

            if(isset($data['trackingProvider']))
            {$dataToSend += ["trackingProvider" => $data['trackingProvider']];}
    
            if(isset($data['redirectUrl']))
            {$dataToSend += ["redirectUrl" => $data['redirectUrl']];}
    
            if(isset($data['eventName'])){
                $dataToSend += ['eventName' => $data['eventName']];
                $dataToSend += ['eventConversionTime' => $data['eventConversionTime']];
                $dataToSend += ['eventDescription' => $data['eventDescription']];
    
            }
            if(isset($data['keywordSets'])){
                $dataToSend += ['keywordSets' => $data['keywordSets']];
    
            }
            $dataToSend += ['apiKey'=>Auth::user()->APIKEY,];

           $creationResponse = Http::withoutVerifying()->get("https://ayetstudios.com/api2/campaign/add",http_build_query($dataToSend));

            $creationResponseBody = $creationResponse->json();
            if ($creationResponseBody['status'] == 'success')
            { 
                $res=Http::withoutVerifying()->get(Constants::BaseUrl.'/campaign/get',[
                    'apiKey'=>Auth::user()->APIKEY,
                    'campaignId'=>$creationResponseBody["campaignData"]["campaignId"]
                ]);
    
                $toBeInserted = $creationResponseBody["campaignData"] += ['user_id' => Auth::id()];
                
                $finalResult = campaign::create($toBeInserted);
    
                return response($creationResponse);
            }else
            {
                return response($creationResponseBody);
            }
        } catch(\Throwable $th)
        {
            
            return response(["success"=>false,$creationResponseBody],500);
        }
       
    }
}
