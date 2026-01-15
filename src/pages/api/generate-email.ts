import type { APIRoute } from 'astro';

// Ensure this route is server-rendered, not prerendered
export const prerender = false;

interface GenerateEmailRequest {
  emailType: string;
  tone: string;
  recipientName: string;
  recipientCompany: string;
  context: string;
  senderName: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: GenerateEmailRequest = await request.json();
    const { emailType, tone, recipientName, recipientCompany, context, senderName } = body;

    const apiKey = import.meta.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a professional email writing assistant. Generate polished, effective business emails.

Guidelines:
- Match the requested tone exactly
- Keep emails concise but complete
- Include a clear call-to-action when appropriate
- Use proper business email formatting
- Do NOT include subject line in the body - return it separately`;

    const userPrompt = `Write a ${emailType.replace('-', ' ')} email with a ${tone} tone.

Recipient: ${recipientName || 'the recipient'}
Company: ${recipientCompany || 'their company'}
Sender: ${senderName || 'the sender'}

Context/Key Points to include:
${context || 'General outreach'}

Return your response in this exact JSON format:
{
  "subject": "Email subject line here",
  "body": "Full email body here with proper line breaks"
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://navaigate.dev',
        'X-Title': 'NavAIgate Email Builder',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate email', details: errorText }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data: OpenRouterResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'No content in response' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from the AI
    try {
      // Extract JSON from the response (handle markdown code blocks if present)
      let jsonStr = content;
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }

      const emailData = JSON.parse(jsonStr.trim());
      return new Response(
        JSON.stringify(emailData),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch {
      // If JSON parsing fails, return the raw content as body
      return new Response(
        JSON.stringify({ subject: 'Generated Email', body: content }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
