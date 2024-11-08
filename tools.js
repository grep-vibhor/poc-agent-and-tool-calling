import {mock_data} from './mock_weather_data.js'

export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const text = await response.json()
        return JSON.stringify(text)
    } catch (err) {
        console.error(err.message)
    }
}

export async function getCurrentWeather(location) {
    try {
        // const weatherUrl = new URL("http://api.openweathermap.org/data/3.0/onecall")
        // weatherUrl.searchParams.append("lat", location.latitude)
        // weatherUrl.searchParams.append("lon", location.longitude)
        // weatherUrl.searchParams.append("appid", process.env.OPEN_WEATHER_MAP_API_KEY)
        // weatherUrl.searchParams.append("units", "imperial")
        // const res = await fetch(weatherUrl)
        // const data = await res.json()
        // return JSON.stringify(data)
        // return mock data for now, but above can be used with paid subscription
        return JSON.stringify(mock_data)
    } catch(err) {
        console.error(err.message)
    }
}

export const tools =  [
    {
        type: "function",
        function: {
            function: getCurrentWeather,
            parse: JSON.parse,
            description: "Get weather of location",
            parameters: { 
                type: 'object', 
                properties: {
                    location: { type: "string" },
                } 
            },
            required: ["location"],
        },
    },
    {
        type: 'function',
        function: {
            function: getLocation,
            parameters: {
                type:"object", 
                properties: {},
            }
        },
    },
];
