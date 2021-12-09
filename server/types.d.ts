import HTTP_STATUS_CODES from "http-status-enum";

export interface Payload<T> {
  message?: T;
  status: HTTP_STATUS_CODES;
}
