<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function createOrder()
    {
        $res = Http::asForm()->withBasicAuth(Constants::PayPalClientID, Constants::PayPalSecret);
        $result = $res->withHeaders([
            'content-type' => 'application/x-www-form-urlencoded',
            'accept-language' => 'en_US'
        ])->post(Constants::PayPalAuthUrl, [
            'grant_type' => 'client_credentials'
        ]);
        return response($this->Pay($result['access_token']));
    }

    public function captureOrder(Request $request)
    {
        // Didn't work unless implemented with CURL
        $curl = curl_init(Constants::PayPalCheckoutOrders.'/'.$request->orderID.'/capture');
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Accept: application/json"));
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curl, CURLOPT_USERPWD, Constants::PayPalClientID . ":" . Constants::PayPalSecret);
        $jsonResponse = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if ($status != 200) {
            $body = json_decode(curl_multi_getcontent($curl), true);
        }
        return response($body);
    }
    public function ShowPayment(){
        return view('payment');
    }
    public function Pay($Token)
    {
        $result = Http::withHeaders([
            'content-type' => "application/json",
            'accept-language' => 'en_US',
            'authorization' => 'Bearer ' .$Token
        ])->post(Constants::PayPalCheckoutOrders, [
            "intent" => "CAPTURE",
            "purchase_units" => [
                [
                    "reference_id" => "PUHF",
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => "100.00"
                    ]
                ]
            ],
            "application_context" => [
                "return_url" => "",
                "cancel_url" => ""
            ]
        ]);
        return $result;

    }
}
