import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@systematic/models';

@Injectable({
  providedIn: 'root',
})
export class EventsApiService {
  private readonly httpClient = inject(HttpClient);

  getEvents() {
    return this.httpClient.get<Event[]>(`/api`);
  }

  getEventById(id: string) {
    return this.httpClient.get<Event>(`/api?id=${id}`);
  }
}
