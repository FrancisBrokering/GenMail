export async function FetchDavinci(setIsGenerating: (generating: boolean) => void, setResult: (result: [string, string, string]) => void, Gpt3Instruction: string, event: React.FormEvent) {
    setIsGenerating(true);
    event.preventDefault();
    const data = { dataToSendToGPT3: Gpt3Instruction };
    const response = await fetch("http://localhost:8080", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log("result is: ", json);
    setIsGenerating(false);
    setResult(json.result);
}