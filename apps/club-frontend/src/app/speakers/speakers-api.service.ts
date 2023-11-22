import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Speaker } from '@systematic/models';

@Injectable({
  providedIn: 'root',
})
export class SpeakersApiService {
  private readonly httpClient = inject(HttpClient);

  getSpeakers() {
    return this.httpClient.get<Speaker[]>(`/api`);
  }

  createSpeaker(speaker: Speaker) {
    this.httpClient.post(`/api`, speaker);
  }
}
