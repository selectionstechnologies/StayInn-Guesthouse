import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`card overflow-hidden transition-shadow ${open ? 'shadow-lift' : ''}`}>
      <h3 className="font-sans">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
        >
          {question}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${open ? 'rotate-45 bg-primary text-white' : 'bg-primary-50 text-primary'}`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 leading-relaxed text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem key={item.q} question={item.q} answer={item.a} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
