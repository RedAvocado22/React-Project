export const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
) => {
    const res = await fetch(input, init);
    return res.json();
};

export const api_key = "5dff3c69041fc89761d96386def5dfd3";
