import HeaderPanel from "../panels/HeaderPanel";
import QuotePanel from "../panels/QuotePanel";

export default function RightBar() {
    return (
      <aside className="w-[30%] min-w-[250px] p-6">
        <HeaderPanel />
        <QuotePanel />
      </aside>
    )
}