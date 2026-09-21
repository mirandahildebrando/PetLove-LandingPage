import http.server
import socketserver
import os

PORT = 8000

os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), handler) as httpd:
    print(f"🚀 Servidor rodando em http://localhost:{PORT}")
    print(f"📁 Pasta: {os.getcwd()}")
    print("Pressione Ctrl+C para parar")
    httpd.serve_forever()