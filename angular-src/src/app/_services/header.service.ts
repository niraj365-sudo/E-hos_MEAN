import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  private patientItemsSubject = new BehaviorSubject<string[]>([]);
  patientItems$ = this.patientItemsSubject.asObservable();

  updatePatientItems(items: string[]) {
    this.patientItemsSubject.next(items);
  }
}
