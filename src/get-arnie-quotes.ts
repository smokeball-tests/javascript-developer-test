import {httpGet} from './mock-http-interface';

interface HttpResponse {
    status: number;
    body: string;
}

export interface ArnieQuote {
    'Arnie Quote': string;
}

export interface Failure {
    FAILURE: string;
}

export type ArnieResult = ArnieQuote | Failure;

const getArnieQuotes = async (urls: Array<string>): Promise<ArnieResult[]> => {
    const result: HttpResponse[] = await Promise.all(urls.map((url: string) => httpGet(url)));

    return result.map((res: HttpResponse): ArnieResult => {
        const { message } = JSON.parse(res.body) as {message: string};

        return res.status === 200
            ? { 'Arnie Quote': message }
            : { FAILURE: message };
    });
};

module.exports = {
  getArnieQuotes,
};
