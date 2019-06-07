export default async function weatherMapCall(layer: string, lat: number, long: number) {
    try {
		var builturl = `https://tile.openweathermap.org/map/${layer}/100/${lat}/${long}.png?appid=`;
        builturl += "fe9dbf41e77f7f993487181ce566b213";
        const res = await fetch(builturl);
        return res.json();
    }
    catch (error) {
        throw new Error;
        
    }
};