<?php

namespace App\Http\Controllers;

use App\Constants\Constants;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Token\Parser;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\OTP as MAILOTP;
use App\Models\OTP;

class AuthController extends Controller
{
    public function AuthTokens()
    {

        $http = Http::asForm()->withOptions(['verify'=>false]);
        $response =[];
        $user = User::where('email', request('username'))->get();
        try {
        if($user->isEmpty())
        {
            return response(['message' => "Account with this Email doesn't exist, Sign up first", 'success' => false], 422);
        }
        else
        {
            if (request('grant_type') === 'refresh_token') {
                $params = [
                    'grant_type' => request('grant_type'),
                    'client_id' => request('client_id'),
                    'client_secret' => request('client_secret'),
                    'refresh_token' => request('refresh_token'),
                    'scope' => '',
                ];

                $tokens_response = $http->post(env("APP_URL").'/oauth/token', $params);
                $response = $tokens_response->json();

            } elseif(request('grant_type') === 'password') {
                $params = [
                    'grant_type' => request('grant_type'),
                    'client_id' => request('client_id'),
                    'client_secret' => request('client_secret'),
                    'username' => request('username'),
                    'password' => request('password'),
                    'scope' => '',
                ];

                $tokens_response = $http->post(env("APP_URL").'/oauth/token', $params);
                $response = $tokens_response->json();

            }

            return $response;
        }


        } catch (RequestException $e) {
            return response($e, 422);
        }

    }
    public function SendResetCode(Request $request){
        try
        {


        $user = User::where('email', $request->email)->get();
        if ($user->isEmpty())
            return response(['message' => "No Account Registered with this Email", 'success' => false], 422);

        $user = $user->first();
        $OTP = $this->generateOTP(5);
        Mail::to($user->email)->send(new MAILOTP($OTP));
        return response(['message' => "Email sent inbox, check your email to finish the process", 'success' => true]);
        } catch(\Exception $e)
        {
            return response(['success'=>false,'message'=>'Error occured'],422);
        }
    }
    public function VerifyCode(Request $request){
        try
        {

            $code = OTP::where('code', $request->code)->first();

            if (empty($code) )
                return response(['message' => "Code is used or incorrect", 'success' => false], 422);
            else if($code->used !== 0 )
            {
                return response(['message' => "Code is used or incorrect", 'success' => false], 422);
            }
            else
            {
                $code->update(['used' => 1]);
                return response(['message' => "Valid", 'success' => true],200);
            }

        } catch(\Exception $e)
        {
            return response(['success'=>false,'message'=>'Error occured'.$code.$e],422);
        }
    }
    public function ChangePassword(Request $request){

        try
        {

            $user = User::where('email', $request->email)->first();
            $user->update(['password' => bcrypt($request->password)]);

            return response(['message' => "Password Changed Successfully, You can login with your new password", 'success' => true]);
        } catch(\Exception $e)
        {
            return response(['success'=>false,'message'=>'Error occured'],422);
        }
    }
    public function generateOTP($n)
    {
        $generator = "1357902468";

        $result = "";

        for ($i = 1; $i <= $n; $i++) {
            $result .= substr($generator, (rand()%(strlen($generator))), 1);
        }
        OTP::create(['code'=>$result]);
        return $result;
    }

    public function CreateUser(Request $request): Response
    {
        $Validator = Validator::make($request->all(),[
            'name'=>['required','string'],
            'email'=>['required','email'],
            'password'=>['required','string']

        ]);
        if ($Validator->fails())
            return response($Validator->errors(),422);
        try {
            User::create([
                'name'=> $request->name,
                'email'=> $request->email,
                'password'=> bcrypt($request->password),
                'APIKEY' => Constants::AyetStudios_APIKEY
            ]);
        }catch (\Exception $e)
        {
            return response(['success'=>false,'message'=>'Email Already in Use'],422);
        }
        return response(['success'=>true,'message'=>'user created'],201);
    }
    public function ModifyApiKey(Request $request)
    {
        $Validator = Validator::make($request->all(),[
            'apikey'=>['required','string']
        ]);
        if ($Validator->fails())
            return response($Validator->errors(),422);
        User::where('id',Auth::id())->update([
            'APIKEY' => $request->apikey
        ]);
        return response(['success'=>true,'message'=>'Api Key updated'],200);
    }
    public function RevokeTokens(Request $request)
    {
        $tokenRepository = app('Laravel\Passport\TokenRepository');
        $refreshTokenRepository = app('Laravel\Passport\RefreshTokenRepository');
        $token = $request->bearerToken();

        $tokenId = (new Parser(new JoseEncoder()))->parse($token)->claims()->all()['jti'];

        // Revoke an access token...
        $tokenRepository->revokeAccessToken($tokenId);
        // Revoke all of the token's refresh tokens...
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($tokenId);

    }
}
