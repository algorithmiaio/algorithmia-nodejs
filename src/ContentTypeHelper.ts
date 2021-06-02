export interface Json {
  [key: string]: number | string | null | Json | boolean;
}

export type Input = Json | string | Buffer;

export function getContentType(input: Input): string {
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
