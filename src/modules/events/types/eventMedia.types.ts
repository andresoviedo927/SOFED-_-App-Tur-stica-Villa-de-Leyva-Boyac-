export type EventMediaOrigin = 'event-detail';

export interface EventMediaNavigationState {
  origin: EventMediaOrigin;
  eventId: string;
}
