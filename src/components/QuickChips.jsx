import { PlaneTakeoff, Plane, Ship, Zap, AlertTriangle, FileText } from 'lucide-react';

const CHIPS = [
  {
    label: '🇦🇪 Zurich → Dubai',
    prompt: 'How much to ship 100kg from Zurich to Dubai?',
    icon: PlaneTakeoff,
  },
  {
    label: '🇵🇰 🇬🇧 Pakistan → UK',
    prompt: 'Air freight price from Pakistan to UK for 100kg',
    icon: Plane,
  },
  {
    label: '🇨🇳 🇺🇸 China → USA',
    prompt: 'Sea freight cost from China to USA for 100kg',
    icon: Ship,
  },
  {
    label: '⚡ Fastest Way',
    prompt: 'What is the fastest way to ship cargo?',
    icon: Zap,
  },
  {
    label: '⚠️ Check Route Delays',
    prompt: 'Are there any shipping route delays?',
    icon: AlertTriangle,
  },
  {
    label: '📋 Customs Documents',
    prompt: 'What documents do I need for shipping?',
    icon: FileText,
  },
];

export default function QuickChips({ onSelectChip, isBusy }) {
  return (
    <div className="chips-bar">
      {CHIPS.map((chip, idx) => {
        const Icon = chip.icon;
        return (
          <button
            key={idx}
            type="button"
            className="chip"
            disabled={isBusy}
            onClick={() => onSelectChip(chip.prompt)}
          >
            <Icon size={13} />
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
}
