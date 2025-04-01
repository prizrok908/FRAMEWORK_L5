const http = require('http');
const url = require('url');

class Framework {
  constructor() {
    this.routes = {};
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRoute(method, path, handler) {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }
    this.routes[path][method] = handler;
  }

  get(path, handler) {
    this.addRoute('GET', path, handler);
  }

  post(path, handler) {
    this.addRoute('POST', path, handler);
  }

  put(path, handler) {
    this.addRoute('PUT', path, handler);
  }

  patch(path, handler) {
    this.addRoute('PATCH', path, handler);
  }

  delete(path, handler) {
    this.addRoute('DELETE', path, handler);
  }

  listen(port, callback) {
    const server = http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const { pathname, query } = parsedUrl;

      req.query = query;
      req.body = await this.parseBody(req);

      res.send = (data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      };

      res.json = (data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      };

      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      let i = 0;
      const next = () => {
        if (i < this.middlewares.length) {
          this.middlewares[i++](req, res, next);
        } else {
          const routeHandler = this.routes[pathname]?.[req.method];
          if (routeHandler) {
            routeHandler(req, res);
          } else {
            res.statusCode = 404;
            res.end('Страница не найдена');
          }
        }
      };

      next();
    });

    server.listen(port, callback);
  }

  parseBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({});
        }
      });
    });
  }
}

module.exports = Framework;