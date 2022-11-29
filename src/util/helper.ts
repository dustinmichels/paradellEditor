import LZString from "lz-string";

// import { compressToEncodedURIComponent } from "lz-string";

// -------------------
// Encoding & Decoding
// Using LZString: https://pieroxy.net/blog/pages/lz-string/index.html
// -------------------

export function compressToEncodedURI(str: string) {
  return LZString.compressToEncodedURIComponent(str);
}

export function decompressFromEncodedURI(encodedString: string) {
  return LZString.decompressFromEncodedURIComponent(encodedString);
}
