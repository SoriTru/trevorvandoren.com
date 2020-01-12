from http.server import BaseHTTPRequestHandler, HTTPServer
import os
import cgi

PORT_NUMBER = 8080


class PostHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/submit":
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST',
                         'CONTENT_TYPE': self.headers['CONTENT-TYPE']
                         })

            print(form)

            name = form["name"].value
            phone = form["phone"].value
            email = form["email"].value
            message = form["message"].value

            os.system(f"sh send_form.sh {name} {phone} {email} {message}")

            self.send_response(302)
            self.send_header("Location", "https://trevorvandoren.com/#form")
            self.end_headers()
            return


try:
    server = HTTPServer(('', PORT_NUMBER), PostHandler)
    print('Started httpsserver on port ', PORT_NUMBER)
    server.serve_forever()

except KeyboardInterrupt:
    print('Shutting down web server')
    server.socket.close()
