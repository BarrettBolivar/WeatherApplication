export default async function weatherCall(city: string) {
    try {
        var builturl = "http://api.openweathermap.org/data/2.5/weather?q=";
        builturl += city;
        builturl += "&APPID=fe9dbf41e77f7f993487181ce566b213&units=imperial";
        const res = await fetch(builturl);
        return res.json();
    }
    catch (error) {
        throw new Error;
        
    }
};