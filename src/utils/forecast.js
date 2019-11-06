const request= require('request');

const forecast=(latitude, longitude,callback)=>{
    const url= 'https://api.darksky.net/forecast/1db46d785c3b8db005e564b44df54061/'+latitude+','+longitude+'?lang=ja&units=si';
    
        request({url, json:true}, (error, {body} = {})=>{
            if(error)
            {
                callback('Unable to connect to weather service',undefined);
            } else if(body.error){
                callback('unable to find location',undefined);
            } else{
                
            console.log("body",body);
            // summary: response.body.daily.data[0].summary+' It\'s currently '+response.body.currently.temperature+'. There is a '+response.body.currently.precipProbability+' chance'        
            const data={
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProb: body.currently.precipProbability,
                humidity: body.currently.humidity,
                currently: body.currently.time
            }
            callback(undefined,data);
            // console.log(response.body);
            }
        });
    };

    module.exports= forecast;