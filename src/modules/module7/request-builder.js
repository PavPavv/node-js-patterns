class Request {
  constructor(
    method,
    url,
    query,
    body
  ) {
    this.method = method;
    this.url = url;
    this.query = query || '';
    this.body = body;
  }

  mockRequest() {
    return `${this.method} request to ${this.url}${this.query} with body "${this.body}" should be successfully sent!`;
  }
}

export class RequestBuilder {
  setMethod(method) {
    this.method = method;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setQuery(q) {
    this.query = q;
    return this;
  }

  setBody(data) {
    this.body = data;
    return this;
  }

  build() {
    return new Request(this.method, this.url, this.query, this.body); 
  }
}