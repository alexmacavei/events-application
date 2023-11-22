import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakersApiService } from './speakers-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Speaker } from '@systematic/models';

@Component({
  selector: 'speakers-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">E-mail</th>
            <th scope="col" class="px-6 py-3">First name</th>
            <th scope="col" class="px-6 py-3">Last name</th>
            <th scope="col" class="px-6 py-3">Date joined</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let s of speakers()"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ s.email }}
            </th>
            <td class="px-6 py-4">{{ s.firstName }}</td>
            <td class="px-6 py-4">{{ s.lastName }}</td>
            <td class="px-6 py-4">{{ s.joinedSystematic }}</td>
            <td class="px-6 py-4 text-right">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeakersPageComponent {
  service = inject(SpeakersApiService);

  speakers: Signal<Speaker[]>;

  constructor() {
    this.speakers = toSignal(this.service.getSpeakers(), { initialValue: [] });
  }
}
