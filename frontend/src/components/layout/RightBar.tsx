import QuotePanel from "../panels/QuotePanel";
import LeaderboardPanel from "../panels/LeaderboardPanel";

export default function RightBar() {
    return (
      <aside className="w-[30%] min-w-[250px] rounded-3xl">
        <QuotePanel />
        <LeaderboardPanel />
      </aside>
    )
}