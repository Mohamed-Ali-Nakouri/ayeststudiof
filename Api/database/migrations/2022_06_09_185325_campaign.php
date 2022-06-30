<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
        $table->id();
        $table->string('campaignId')->nullable();
        $table->foreignId('user_id')->constrained();
        $table->string('platform');
        $table->string('packageName');
        $table->string('appName')->nullable();
        $table->string('campaignType');
        $table->string('appIcon')->nullable();
        $table->string('totalBudget');
        $table->string('remainingBudget');
        $table->string('bidPerConversion');
        $table->string('targetCountries');
        $table->integer('_totalDownloads')->nullable();
        $table->integer('_remainingDownloads')->nullable();
        $table->double('_tokensPerDownload')->nullable();
        $table->integer('downloadRate')->nullable();
        $table->string('limitStrategy')->nullable();
        $table->integer('isRetention')->nullable();
        $table->integer('isManaged')->nullable();
        $table->integer('reservations')->nullable();
        $table->string('tracking')->nullable();
        $table->string('status')->nullable();
        $table->string('identifier')->nullable();
        $table->string('trackingProvider')->nullable();
        $table->string('redirectUrl')->nullable();
        $table->string('eventName')->nullable();
        $table->integer('eventConversionTime')->nullable();
        $table->string('eventDescription')->nullable();
        $table->string('keywordSets')->nullable();
        $table->timestamps();
        });


        //"campaignId": 62287,
			//"identifier": "3365",
			//"platform": "android",
			//"campaignType": "cpi",
			//"packageName": "org.samsonsen.nederlandse.radio.holland.nl",
			//"appName": "Mijn Radio Nederland - Supports Chromecast.",
			//"appIcon": "\/\/lh3.googleusercontent.com\/51pr5y8KQ-jZabNSOgPyOA3Oao_8WGscm2SDzOjqpqtS8T3lWS7c2mOdsbmw0c2dfJnN=w140",
			//"targetCountries": "NL",
			//"totalBudget": 9.3,
			//"remainingBudget": 1,
			//"bidPerConversion": 0.05,
			//"_totalDownloads": 186,
			//"_remainingDownloads": 20,
			//"_tokensPerDownload": 0.5,
			//"downloadRate": 24,
			//"limitStrategy": "burst",
			//"isRetention": 0,
			//"isManaged": 0,
			//"tracking": "standard",
			//"redirectUrl": "",
			//"status": "completed",
			//"created": "2017-10-04 18:27:40",
			//"reservations": 0
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
};
