import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsApiService } from '../events-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Event, Participant } from '@systematic/models';

@Component({
  selector: 'events-list',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Event name</th>
          <th scope="col" class="px-6 py-3">Event type</th>
          <th scope="col" class="px-6 py-3">Participants</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let e of events()"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ e.name }}
          </th>
          <td class="px-6 py-4">{{ e.eventType }}</td>
          <td class="px-6 py-4">{{ displayParticipants(e.participants) }}</td>
          <td class="px-6 py-4 text-right">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
  service = inject(EventsApiService);

  events: Signal<Event[]>;

  constructor() {
    this.events = toSignal(this.service.getEvents(), { initialValue: [] });
  }

  displayParticipants(participants: Participant[]) {
    return participants.map((p) => p.email).join();
  }
}
