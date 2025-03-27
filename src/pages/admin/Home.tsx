import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "../../components/Admin/ui/Card";
import BarCharts from "../../components/Admin/Charts/BarChart";
import Tables from "../../components/Admin/Tables";
import Events from "../../components/Admin/Events/Events";

interface ContextProps {
  activeTab: string;
}

const HomePage: React.FC = () => {
  const { activeTab } = useOutletContext<ContextProps>();

  return (
    <div className="p-6">
      {activeTab === "dashboard" && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold">Welcome to the Admin Dashboard</h2>
            <p className="text-gray-600">Select a tab from the sidebar.</p>
          </CardContent>
        </Card>
      )}
      {activeTab === "events" && <Events />} 

      {activeTab === "charts" && <BarCharts />}
      {activeTab === "tables" && <Tables />}
    </div>
  );
};

export default HomePage;
