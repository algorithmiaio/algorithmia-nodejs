class ContentTypeHelper {
  contentTypeHelper(input: Object): string {
    let contentType: string;

    if (Buffer.isBuffer(input)) {
      contentType = 'application/octet-stream';
    } else if (typeof input == 'string') {
      contentType = 'text/plain';
    } else {
      contentType = 'application/json';
    }
    return contentType;
  }
}

export { ContentTypeHelper };
