import { Trophy, Medal, Star } from 'lucide-react';

function QuoteCard({ delay = "0ms" }) {
  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-br from-amber-600 to-orange-700 p-6 rounded-xl border border-amber-500/30 starting:opacity-0 starting:scale-95 opacity-100 scale-100 transition-all duration-700 ease-out shadow-[0_0_30px_rgba(245,158,11,0.15)]"
      style={{ transitionDelay: delay }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="relative z-10">
        <Star className="w-5 h-5 text-amber-200 mb-3 opacity-80" />
        <p className="text-lg font-medium text-white leading-snug tracking-tight">
          "Small progress every day creates remarkable results."
        </p>
        <p className="text-amber-200/80 text-xs mt-4 font-medium uppercase tracking-widest">Daily Motivation</p>
      </div>
    </div>
  );
}
export default QuoteCard;

