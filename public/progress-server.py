from http.server import HTTPServer, BaseHTTPRequestHandler
import html
import threading
from urllib.parse import parse_qs
import json
import socket

class ConsoleStorageInfo:
    """
    This class stores the last 10 messages and the progress of each operation. Note that the progress of this class is tied to the current FFmpeg process, and not of the entire operation.
    """
    messages = []
    progress = 0

class ConversionStorageInfo:
    """
    Information about all the files that are being (or have been) converted.
    """
    current_positions = []
    """
    A list (element 0 = operation 0; element 1 = operation 1; and so on) of the number of the file that is being currently converted
    """
    maxmimum_positions = []
    """
    A list (element 0 = operation 0; element 1 = operation 1; and so on) that contains the number of files to convert
    """
    file_names = []
    """
    A list (element 0 = operation 0; element 1 = operation 1; and so on) of the names of the files that are currently being converted.
    """

console_events: dict[str, ConsoleStorageInfo] = {}
"""
A dictionary that ties each `{session-id}-{operation_id}` to its console events
"""
conversion_storage: dict[str, ConversionStorageInfo] = {}
"""
A dictionary that ties each `session_id` to information about all the operations that are running.
"""


class ServerRequestHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args): # Disable any kind of logging of server requests
        pass
    def do_GET(self):
        self.send_response(200)
        # CORS Setup
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        if (self.path.startswith("/api/console")): # ffmpeg-web has shared a console update
            params = parse_qs(self.path[(self.path.rfind("?") + 1):])
            [console, operation, progress, id] = [params.get("text", [None])[0], params.get("operation", [None])[0], params.get("progress", [None])[0], params.get("id", [None])[0]]
            if console != None and operation != None and progress != None and id != None:
                storage_id = f"{id}-{operation}"
                if not storage_id in console_events: console_events[storage_id] = ConsoleStorageInfo()
                if len(console_events[storage_id].messages) > 10: console_events[storage_id].messages.pop() # Store only the last 10 messages
                console_events[storage_id].messages.insert(0, console)
                console_events[storage_id].progress = progress
            self.end_headers()
        elif self.path.startswith("/api/conversion"): # ffmpeg-web has shared new information about the progress of all the operations
            params = parse_qs(self.path[(self.path.rfind("?") + 1):])
            [current_position, max_position, file_names, id] = [params.get("currentPosition", [None])[0], params.get("maxPosition", [None])[0], params.get("fileNames", [None])[0], params.get("id", [None])[0]]
            if current_position != None and max_position != None and file_names != None and id != None:
                if not id in conversion_storage: conversion_storage[id] = ConversionStorageInfo()
                conversion_storage[id].current_positions = json.loads(current_position)
                conversion_storage[id].maxmimum_positions = json.loads(max_position)
                conversion_storage[id].file_names = json.loads(file_names)
            self.end_headers()
        else: # Return the HTML webpage
            self.send_header("Content-Type", "text/html")
            self.send_header("Refresh", "1")
            self.end_headers()
            self.wfile.write(bytes(f"""<!DOCTYPE html>
            <head>
                <title>Remote ffmpeg-web operation</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>
                body {{ 
                    padding: 10px;
                    background-color: #151515;
                    font-family: sans-serif;
                    color: #fafafa;
                 }}
                 .card {{
                    padding: 10px;
                    border-radius: 12px;
                    background-color: #313131;
                 }}
                 progress::-webkit-progress-bar {{
                    border-radius: 12px;
                }}
                progress {{
                    color: #277CB6;
                    background-color: #616161;
                    border-radius: 12px;
                    border: 1px solid #fafafa;
                    width: 100%;
                }}
                progress::-moz-progress-bar {{
                    background: #277CB6;
                    border-radius: 12px
                }}
                progress::-webkit-progress-value {{
                    background: #277CB6;
                    border-radius: 12px
                }}
                </style>
            </head>
            <body>
                <h1>ffmpeg-web progress</h1>
                {"<br>\n".join(map(lambda x: f"""
<div class="card">
<h2>Session {html.escape(x)}</h2>
{"<br>\n".join(map(lambda y: f"""
<div class="card" style="background-color: #515151">
    <h3>Operation {y + 1}</h3>
    <progress max={conversion_storage[x].maxmimum_positions[y]} value={conversion_storage[x].maxmimum_positions[y] if conversion_storage[x].current_positions[y] < 0 else conversion_storage[x].current_positions[y] - 1}></progress><br><br>
    <p>{"Converted all files" if int(conversion_storage[x].current_positions[y]) < 0 else f"Converting file {html.escape(conversion_storage[x].file_names[y])} ({conversion_storage[x].current_positions[y]} of {conversion_storage[x].maxmimum_positions[y]})"}</p>
    <div class="card">
        <p><strong>Current conversion progress:</strong></p>
        <progress max="1" value="{console_events[f"{x}-{y}"].progress if  f"{x}-{y}" in console_events else 0}"></progress><br><br>
        <div style="max-height: 100px; overflow: auto;">
            {"\n".join(map(lambda z: f"<code>{html.escape(z)}</code><br>", console_events[f"{x}-{y}"].messages if f"{x}-{y}" in console_events else []))}
        </div>
    </div>
</div>
""", range(0, len(conversion_storage[x].current_positions))))}
</div>
""", conversion_storage.keys()))}
            </body>
            """, "utf-8"))


class FfmpegServer(threading.Thread):
    def run(self):
        self.server = HTTPServer(("", 8427), ServerRequestHandler)
        self.server.serve_forever()
    def stop(self):
        self.server.shutdown()

def get_local_ip():
    """
    Get the local IP address of this machine
    """
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))  # Doesn't send data, just determines route
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

print(f"""The server is running!
Write http://{get_local_ip()}:8427 in ffmpeg-web's Remote Control settings, and then open http://{get_local_ip()}:8427/ to see information about the ongoing conversions.
Press Ctrl + C to stop the server.""")


server = FfmpegServer()
server.start()