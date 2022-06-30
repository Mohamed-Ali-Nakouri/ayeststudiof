<?php

use App\Http\Controllers\AccountModulesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignModulesController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReportingModuleController;
use App\Http\Middleware\AUTHKEY;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware([AUTHKEY::class])->group(function () {
    Route::post('AuthTokens', [AuthController::class, 'AuthTokens']);
    Route::post('CreateUser',[AuthController::class,'CreateUser']);
    Route::middleware('auth:api')->group(function(){
        Route::get('UserDetails',fn() => Auth::user());
        Route::patch('ModifyApiKey',[AuthController::class,'ModifyApiKey']);
        Route::prefix('Account')->group(function (){
            Route::get('GetAccountDetails', [AccountModulesController::class, 'GetAccountDetails']);
            Route::get('GetRates', [AccountModulesController::class, 'GetRates']);
            Route::get('GetTrackingProviders', [AccountModulesController::class, 'GetTrackingProviders']);

        });

        Route::prefix('Campaign')->group(function (){
            Route::get('GetCampaignsList', [CampaignModulesController::class, 'GetCampaignsList']);
            Route::get('GetACampaign', [CampaignModulesController::class, 'GetACampaign']);
            Route::get('StartACampaign', [CampaignModulesController::class, 'StartACampaign']);
            Route::get('PauseACampaign', [CampaignModulesController::class, 'PauseACampaign']);
            Route::get('TerminateACampaign', [CampaignModulesController::class, 'TerminateACampaign']);
            Route::post('ReactivateACampaign', [CampaignModulesController::class, 'ReactivateACampaign']);
            Route::post('AddCampaign',[CampaignModulesController::class,'AddCampaign']);
        });

        Route::prefix('Reporting')->group(function (){
            Route::get('GetSummary',[ReportingModuleController::class,'GetSummary']);
            Route::get('GetSummaryDaily',[ReportingModuleController::class,'GetSummaryDaily']);
            Route::get('GetInstallations',[ReportingModuleController::class,'GetInstallations']);
            Route::get('GetStats',[ReportingModuleController::class,'GetStats']);
            Route::get('GetTrafficAnalysis',[ReportingModuleController::class,'GetTrafficAnalysis']);
        });
    });
});
Route::get('createOrder',[PaymentController::class,'createOrder']);
Route::post('captureOrder',[PaymentController::class,'captureOrder']);
Route::post('SendResetCode', [AuthController::class, 'SendResetCode']);
Route::post('VerifyCode', [AuthController::class, 'VerifyCode']);
Route::post('ChangePassword',[AuthController::class, 'ChangePassword'])->name('ChangePassword');
