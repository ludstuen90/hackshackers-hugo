/**
 * Events-related constants
 */

export const calendarFeed = ('localhost' === window.location.hostname) ?
  '/test.ics' :
  '/test.ics';

// export const calendarFeed = '//Users/lukasudstuen/codigo/test.ics';

export const defaultOpts = {
  future: 0,
  past: 0,
  compareTime: Date.now(),
  order: 'ASC',
  orderBy: 'start',
  renderStyle: 'basic',
};
