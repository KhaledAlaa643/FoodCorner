import { Observable } from "rxjs";
import { User } from "../../auth/models/User";
export interface DataInterface {
  fetchData<T>(endpoint?: string): Observable<T[]>;
}

// validation.interface.ts
export interface ValidationInterface {
  checkFieldExists(field: string, value: string): Observable<any>;
}

// auth.interface.ts
export interface AuthInterface {
  signup(body: User): Observable<User>;
}