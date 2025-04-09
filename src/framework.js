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
      const { pathname } = parsedUrl;

      req.query = parsedUrl.query;
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
          for (const routePath in this.routes) {
            const routeMethodHandlers = this.routes[routePath];

            if (routeMethodHandlers[req.method]) {
              const routeRegex = this.createRouteRegex(routePath);
              const match = pathname.match(routeRegex);

              if (match) {

                const params = this.extractParams(routePath, pathname);
                req.params = params;

                return routeMethodHandlers[req.method](req, res);
              }
            }
          }

          res.statusCode = 404;
          res.end('Страница не найдена');
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

  createRouteRegex(routePath) {
    const regexPattern = routePath.replace(/:[\w]+/g, '([\\w-]+)');
    return new RegExp(`^${regexPattern}$`);
  }

  extractParams(routePath, pathname) {
    const paramNames = routePath.match(/:[\w]+/g)?.map((param) => param.slice(1)) || [];
    const paramValues = pathname.match(this.createRouteRegex(routePath))?.slice(1) || [];

    const params = {};
    paramNames.forEach((name, index) => {
      params[name] = paramValues[index];
    });

    return params;
  }
}

module.exports = Framework;