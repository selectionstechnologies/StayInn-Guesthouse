import { useEffect } from 'react';

const SITE = 'StayInn Guesthouse';

/** Sets the document title and meta description for the current page. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Your Cozy Stay Awaits`;
    if (!description) return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }, [title, description]);
}
