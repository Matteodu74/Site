const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

// The current SSE response object (only one client at a time for this dummy server)
let sseRes = null;

// Helper – push a JSON-RPC object back through the open SSE channel
function pushSSE(obj) {
    if (!sseRes || sseRes.writableEnded) {
        console.warn('[SSE] No active SSE client – response dropped:', JSON.stringify(obj));
        return;
    }
    const payload = `event: message\ndata: ${JSON.stringify(obj)}\n\n`;
    console.log('[SSE→Client]', payload.trim());
    sseRes.write(payload);
    // Force flush – important for SSE in Node / Express
    if (typeof sseRes.flush === 'function') sseRes.flush();
}

// ── SSE endpoint ─────────────────────────────────────────────────────────────
app.get('/sse', (req, res) => {
    console.log('[SSE] Client connected');
    sseRes = res;

    // SSE headers BEFORE any write
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'   // disable nginx buffering if behind proxy
    });

    // Tell mcp-remote where to POST JSON-RPC messages
    res.write('event: endpoint\ndata: /message\n\n');

    const keepalive = setInterval(() => {
        if (!res.writableEnded) res.write(': keepalive\n\n');
    }, 15000);

    req.on('close', () => {
        console.log('[SSE] Client disconnected');
        clearInterval(keepalive);
        if (sseRes === res) sseRes = null;
        res.end();
    });
});

// ── MCP message endpoint ──────────────────────────────────────────────────────
app.post('/message', (req, res) => {
    const body = req.body;
    console.log('[Client→Server]', JSON.stringify(body, null, 2));

    let response = null;

    switch (body.method) {

        case 'initialize':
            response = {
                jsonrpc: '2.0',
                id: body.id,
                result: {
                    protocolVersion: '2025-06-18',
                    serverInfo: { name: 'dummy-mcp-server', version: '1.0.0' },
                    capabilities: {
                        tools: {},
                        resources: {},
                        prompts: {}
                    }
                }
            };
            break;

        case 'notifications/initialized':
            // Notification – no JSON-RPC response, just acknowledge the HTTP POST
            console.log('[MCP] initialized notification received');
            res.status(202).end();
            return;

        case 'tools/list':
            response = {
                jsonrpc: '2.0',
                id: body.id,
                result: {
                    tools: [{
                        name: 'echo',
                        description: 'Echoes back the input message.',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', description: 'Text to echo' }
                            },
                            required: ['message']
                        }
                    }]
                }
            };
            break;

        case 'tools/call': {
            const name = body.params?.name;
            const args = body.params?.arguments ?? {};
            if (name === 'echo') {
                response = {
                    jsonrpc: '2.0',
                    id: body.id,
                    result: { content: [{ type: 'text', text: `Echo: ${args.message}` }] }
                };
            } else {
                response = {
                    jsonrpc: '2.0',
                    id: body.id,
                    error: { code: -32601, message: `Unknown tool: ${name}` }
                };
            }
            break;
        }

        case 'resources/list':
            response = { jsonrpc: '2.0', id: body.id, result: { resources: [] } };
            break;

        case 'prompts/list':
            response = { jsonrpc: '2.0', id: body.id, result: { prompts: [] } };
            break;

        default:
            // Unknown method – only reply if it has an id (not a notification)
            if (body.id !== undefined && body.id !== null) {
                response = {
                    jsonrpc: '2.0',
                    id: body.id,
                    error: { code: -32601, message: `Method not found: ${body.method}` }
                };
            }
    }

    // Always acknowledge the HTTP POST with 202 first,
    // then push the JSON-RPC response over the SSE channel.
    res.status(202).end();

    if (response) {
        // Small tick to let the 202 flush before we write on SSE
        setImmediate(() => pushSSE(response));
    }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = 3845;
http.createServer(app).listen(PORT, '127.0.0.1', () => {
    console.log(`\nDummy MCP SSE Server ready`);
    console.log(`  SSE  : GET  http://127.0.0.1:${PORT}/sse`);
    console.log(`  MCP  : POST http://127.0.0.1:${PORT}/message\n`);
});
