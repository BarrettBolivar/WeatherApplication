export default async function newsCall(country: string) {
    try {
		var builturl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=`;
        builturl += "c3a21ae3b5104f1496f9738f6226d8d3";
        const res = await fetch(builturl);
        return res.json();
    }
    catch (error) {
        throw new Error;
        
    }
};