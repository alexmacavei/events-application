import { CreateEventRequest } from '../requests/create-event.request';

export type CreateEventEvent = CreateEventRequest & { id: string };
