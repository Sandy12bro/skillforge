import { Trophy } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Alex Chen", xp: 1250, badge: "Grandmaster" },
  { rank: 2, name: "Sarah J.", xp: 1100, badge: "Master" },
  { rank: 3, name: "Mike T.", xp: 950, badge: "Diamond" },
  { rank: 4, name: "You", xp: 450, badge: "Explorer", isUser: true },
  { rank: 5, name: "Emily R.", xp: 420, badge: "Explorer" },
  { rank: 6, name: "David L.", xp: 380, badge: "Novice" },
  { rank: 7, name: "Jessica W.", xp: 350, badge: "Novice" },
  { rank: 8, name: "Kevin M.", xp: 310, badge: "Beginner" },
  { rank: 9, name: "Sophie B.", xp: 280, badge: "Beginner" },
  { rank: 10, name: "Tom H.", xp: 250, badge: "Beginner" },
];

export default function Leaderboard() {
  const { searchQuery, xp, level: userLevel } = useDashboard();
  
  // Combine user data with dummy data and sort by XP
  const rawData = [
    ...LEADERBOARD_DATA.filter(u => !u.isUser),
    { rank: 0, name: "You", xp: xp, badge: userLevel, isUser: true }
  ];

  // Sort and assign ranks
  const rankedData = rawData
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));

  const filteredData = rankedData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto overflow-x-auto pr-2 custom-scrollbar">
      {filteredData.length > 0 ? (
        filteredData.map((user) => (
          <div 
            key={user.rank} 
            className={`flex items-center justify-between p-4 border-2 border-border rounded-md transition-all hover:scale-[1.02] min-w-[280px] ${
              user.isUser ? "bg-brand-yellow text-black border-black shadow-[4px_4px_0px_#000]" : "bg-background/50"
            }`}
          >
            <div className="flex items-center gap-4 shrink-0">
              <span className={`font-black text-lg w-6 flex justify-center ${user.rank === 1 ? 'text-brand-red text-2xl' : 'opacity-40'}`}>
                {user.rank}
              </span>
              <div className="w-10 h-10 rounded-md border-2 border-border bg-card flex justify-center items-center font-black text-xs">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-black uppercase tracking-tight text-sm whitespace-nowrap">{user.name}</p>
                <p className="text-[9px] font-black opacity-50 uppercase tracking-widest whitespace-nowrap">{user.badge}</p>
              </div>
            </div>
            <div className="font-black text-right shrink-0 ml-4">
              {user.xp} <span className="text-[10px] opacity-60">XP</span>
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 neo-card bg-muted/5 border-dashed flex flex-col items-center justify-center opacity-50">
          <p className="font-black uppercase tracking-widest text-[10px]">No players matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
