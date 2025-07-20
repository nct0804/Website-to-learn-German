import QuotePanel from "../panels/QuotePanel";
import LeaderboardPanel from "../panels/LeaderboardPanel";

export default function RightBar() {
    return (
      <aside className="w-[30%] w-[400px]  rounded-3xl transition-colors duration-300">
        <QuotePanel />
        <LeaderboardPanel />
      </aside>
    )
}