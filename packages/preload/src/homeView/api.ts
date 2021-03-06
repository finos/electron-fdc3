import { ipcRenderer } from 'electron';
import { TOPICS } from '../../../main/src/constants';

/**
 * home api
 *  - getApps
 *  - get directory listings of apps for the directory for this agent
 */

let id: string | null = null;

/**
 * listen for start event - assigning id for the instance
 */

ipcRenderer.on(TOPICS.FDC3_START, async (event, args) => {
  console.log('fdc3 start', args);
  if (args.id) {
    id = args.id;
  }
});

export const getApps = () => {
  return new Promise((resolve, reject) => {
    try {
      ipcRenderer.on(`${TOPICS.FETCH_FROM_DIRECTORY}-/apps`, (event, args) => {
        console.log('ipcRenderer event', event.type);
        const results = args.data;
        resolve(results);
      });
      // Fetch External Data Source
      ipcRenderer.send(TOPICS.FETCH_FROM_DIRECTORY, {
        source: id,
        sourceType: 'view',
        query: `/apps`,
      });
    } catch (err) {
      reject(err);
    }
  });
};
