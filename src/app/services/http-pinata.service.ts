import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IPinataMetadata } from "../core/interfaces/pinata-metadata.interface";
import { LOG } from "../utils/log.utils";

@Injectable({
  providedIn: "root"
})
export class HttpPinataService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File, metadata: IPinataMetadata) {
    const URL = `${environment.API}/upload-file`;

    const fd = new FormData()

    fd.append("file", file);
    fd.append("metadata", JSON.stringify(metadata));

    return this.http.post<any>(URL, fd).pipe(
      tap(res => res && LOG.msg("File uploaded", "success")),
    );
  }

}