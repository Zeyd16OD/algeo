import { API } from "$env/static/private";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let { name, value } = await request.json();

    const raw = JSON.stringify({
        contents: [
            {
                parts: [
                    {
                        text: `Generate a JSON object as string for the Algerian wilaya of ${name} in around ${value},
                        if (year === current year) then give the news of that wilaya...
                        if (year < current year) then give historical events (3 or 5 at minimum) about that year, if you have a lack of events (of information), then give the events around it.
                        if (year > current Year) then give future predictions about that year at that wilaya ONLY THAT YEAR OR NEWER...

                        response [SHOULD BE A JSON ONLY]...

                        json structure:

                        {
                            name: 'wilaya's name',
                            events: [
                                {
                                    name: 'name of the event',
                                    date: 'the human understandable date, could be the year only but try to give a precise date',
                                    description: 'the description of that event'
                                }
                            ],
                            description: 'Description of the wilaya, geographical positioning, wilayas around it, and if possible year of creation.'
                        }`
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API}`,
            requestOptions
        );

        const result = await response.json();
        const jsonString = result.candidates[0].content.parts[0].text;
        const parsedJSON = JSON.parse(jsonString.match(/```json\n([\s\S]*?)\n```/)[1]);

        return json(parsedJSON, { status: 200 });

    } catch (error) {
        console.log(error);
        return json({
            error: true,
            message: error,
        }, { status: 500 });
    }
}
