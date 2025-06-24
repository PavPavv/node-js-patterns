'use strict';

export const jsonMiddleware = () => {
  return {
    inbound(message) {
      return JSON.parse(message.toString());
    },
    outbound(message) {
      return Buffer.from(JSON.stringify(message));
    }
  };
};